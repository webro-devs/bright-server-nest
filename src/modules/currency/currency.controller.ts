import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CurrencyService } from './currency.service';

@ApiTags('Currency')
@Controller('currency')
export class CategoryController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('/')
  @ApiOperation({
    summary: 'Method: returns all currency',
  })
  @ApiOkResponse({
    description: 'The currency were returned successfully',
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized Request',
  })
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.currencyService.getCurrency();
  }
}
