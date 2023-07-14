import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Patch,
  Param,
  Get,
  Query,
  Res,
  Put,
  Req,
} from '@nestjs/common';
import slugify from 'slugify';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { Response } from 'express';
import { CreateNewsDto, UpdateNewsDto, UpdateNewsPublishDto } from './dto';
import { NewsService } from './news.service';
import { HttpException } from '../../infra/validation';
import { fileService, ZipMaker } from '../../infra/helpers';
import { PermissionEnum, State } from '../../infra/shared/enums';
import { Public } from '../auth/decorators/public.decorator';
import { PermissionsGuard } from '../auth/decorators/roles.decorator';
import { NewsQueryDto } from '../../infra/shared/dto/news-query.dto';
import { SearchService } from './elastic-search.service';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly searchService: SearchService,
  ) {}

  @PermissionsGuard(PermissionEnum['Добавить новости'])
  @Get('/')
  @ApiOperation({ summary: 'Method: returns all news' })
  @ApiOkResponse({
    description: 'The news were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getAll(@Req() request) {
    try {
      const news = await this.newsService.getAll(
        request.where,
        request['relations'],
      );
      return news;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Get('/search')
  @ApiOperation({ summary: 'Method: returns all news' })
  @ApiOkResponse({
    description: 'The news were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getSearch(@Query('text') text: string) {
    try {
      const news = await this.searchService.search(text);
      return news;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Get('/my-news')
  @ApiOperation({ summary: 'Method: returns my news' })
  @ApiOkResponse({
    description: 'The my news was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMyNews(@Req() request, @Query() data: NewsQueryDto) {
    try {
      console.log(data);

      const where = request?.['where'];
      where.creator = { id: request['user'].id };
      const news = await this.newsService.getByCreatorId(
        where,
        request['relations'],
      );
      return news;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Get('/general-access')
  @ApiOperation({ summary: 'Method: returns general accessed news' })
  @ApiOkResponse({
    description: 'The general accessed news was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getByStateGeneral(@Req() request) {
    try {
      const data = await this.newsService.getByState(
        State.general_access,
        request['relations'],
      );
      return data;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Public()
  @Get('/published')
  @ApiOperation({ summary: 'Method: returns published news' })
  @ApiOkResponse({
    description: 'The published news was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getByStatePublished(@Req() request) {
    try {
      let where = request['where'];
      where.state = State.published;
      const data = await this.newsService.getByStatePublished(
        where,
        request['relations'],
      );
      return data;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Get('/archives')
  @ApiOperation({ summary: 'Method: returns archived news' })
  @ApiOkResponse({
    description: 'The archived news was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getByStateArchive(@Req() request) {
    try {
      const data = await this.newsService.getByState(
        State.archive,
        request['relations'],
      );
      return data;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Get('/checking')
  @ApiOperation({ summary: 'Method: returns checking news' })
  @ApiOkResponse({
    description: 'The checking news was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getByStateChecking(@Req() request) {
    try {
      const data = await this.newsService.getByState(
        State.checking,
        request['relations'],
      );
      return data;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Get('/favorites')
  @ApiOperation({ summary: 'Method: returns admin favorite news' })
  @ApiOkResponse({
    description: 'The admin favorite news was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getBySavedCreator(@Req() request) {
    try {
      const data = await this.newsService.getBySavedCreator(
        request['user'].id,
        State.favorites,
        request['relations'],
      );
      return data;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single news by id' })
  @ApiOkResponse({
    description: 'The news was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string, @Req() request) {
    try {
      const news = await this.newsService.getOne(id, request['relations']);
      return news;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Post('/')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Method: creates new news' })
  @ApiCreatedResponse({
    description: 'The news was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() newsData: CreateNewsDto, @Req() request) {
    try {
      const imgData = ['uz', 'ru', 'en', 'уз'];

      for (let i = 0; imgData.length > i; i++) {
        if (!newsData[imgData[i]]) {
          newsData[imgData[i]] = {};
        }
        const img = request?.files?.[imgData[i] + '_img'];
        if (img) {
          const avatar = await fileService.uploadImage(img);
          if (avatar.error) {
            return new HttpException(true, 500, 'Image upload error');
          }
          newsData[imgData[i]].file = avatar.url;
        }

        newsData[imgData[i]].shortLink = slugify(
          newsData[imgData[i]].shortLink || '',
          {
            replacement: '-',
            remove: /[*+~.()'"!:@]/g,
            lower: false,
            strict: false,
            locale: 'vi',
            trim: true,
          },
        );
      }

      const news = await this.newsService.create(newsData, request.user.id);
      await this.searchService.indexArticle(news);
      return news;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Put('/:id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Method: updating news' })
  @ApiOkResponse({
    description: 'News was changed',
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() newsData: UpdateNewsDto,
    @Param('id') id: string,
    @Req() request,
  ) {
    try {
      const updateNews = await this.newsService.update(
        newsData,
        id,
        request?.files,
      );

      return updateNews;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Patch('/archive/:id')
  @ApiOperation({ summary: 'Method: updating news state to archive' })
  @ApiOkResponse({
    description: 'News state was changed to archive',
  })
  @HttpCode(HttpStatus.OK)
  async updateStateArchive(@Param('id') id: string) {
    try {
      const updateState = await this.newsService.updateState(id, State.archive);

      return updateState;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Patch('/general-access/:id')
  @ApiOperation({ summary: 'Method: updating news state to general access' })
  @ApiOkResponse({
    description: 'News state was changed to general access',
  })
  @HttpCode(HttpStatus.OK)
  async updateStateGeneral(@Param('id') id: string) {
    try {
      const updateState = await this.newsService.updateState(
        id,
        'general access',
      );

      return updateState;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Patch('/checking/:id')
  @ApiOperation({ summary: 'Method: updating news state to checking' })
  @ApiOkResponse({
    description: 'News state was changed to checking',
  })
  @HttpCode(HttpStatus.OK)
  async updateStateChecking(@Param('id') id: string) {
    try {
      const updateState = await this.newsService.updateState(
        id,
        State.checking,
      );
      return updateState;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Patch('/favorite/:id')
  @ApiOperation({ summary: 'Method: updating news state to favorite' })
  @ApiOkResponse({
    description: 'News state was changed to favorite',
  })
  @HttpCode(HttpStatus.OK)
  async updateStateFavorite(@Param('id') id: string, @Req() request) {
    try {
      const updateState = await this.newsService.updateFavorite(
        id,
        State.favorites,
        request.user.id,
      );
      return updateState;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Patch('/publish-date/:id')
  @ApiOperation({ summary: 'Method: updating news publish date' })
  @ApiOkResponse({
    description: 'News publish date was changed',
  })
  @HttpCode(HttpStatus.OK)
  async updateDate(@Param('id') id: string, @Body('date') date) {
    try {
      const updateDate = await this.newsService.updateDate(id, date);

      return updateDate;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Delete('/')
  @ApiOperation({ summary: 'Method: deleting news' })
  @ApiOkResponse({
    description: 'News was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Body('ids') ids: string[]) {
    try {
      await Promise.all(
        ids.map(async (id) => {
          await this.newsService.remove(id);
        }),
      );

      return { Data: 'ok', error: false };
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Patch('/published')
  @ApiOperation({ summary: 'Method: updating news state to published' })
  @ApiOkResponse({
    description: 'News state was changed to published',
  })
  @HttpCode(HttpStatus.OK)
  async updateStatePublished(
    @Body() data: UpdateNewsPublishDto,
    @Res() res: Response,
  ) {
    try {
      await this.newsService.updateStatePublished(
        data.newsIds,
        State.published,
        data.tg,
        data.inst,
      );
      if (data.inst) {
        const { data, isNaN } = await ZipMaker();
        console.log(data);
        console.log(isNaN);

        if (isNaN) {
          return res.send('');
        } else {
          const fileName = 'instagram.zip';
          const fileType = 'application/zip';

          res.writeHead(200, {
            'Content-Disposition': `attachment; filename="${fileName}`,
            'Content-Type': fileType,
          });

          return res.end(data);
        }
      } else {
        return res.end('');
      }
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }
}
