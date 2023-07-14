import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { NewsQueryDto } from '../shared/dto/news-query.dto';

@Injectable()
export class NewsQueryParserMiddleware implements NestMiddleware {
  use(req, res: Response, next: NextFunction) {
    let where: any = {};
    let relations: any = {};
    const {
      startDate,
      endDate,
      creatorId,
      categoryId,
      mainCategoryId,
      state,
      lang,
    }: NewsQueryDto = req.query;

    if (startDate && endDate) {
      where = {
        created_at: Between(new Date(startDate), new Date(endDate)),
      };
    } else if (startDate) {
      where = {
        created_at: MoreThanOrEqual(new Date(startDate)),
      };
    } else if (endDate) {
      where = {
        created_at: LessThanOrEqual(new Date(endDate)),
      };
    }
    if (creatorId) {
      where.creator = {
        id: creatorId,
      };
    }
    if (categoryId) {
      where.categories = {
        id: categoryId,
      };
    }
    if (mainCategoryId) {
      where.mainCategory = {
        id: mainCategoryId,
      };
    }
    if (state) {
      where.state = state;
    }
    if (lang) {
      relations = {
        categories: true,
        creator: true,
        mainCategory: true,
      };
      relations[lang] = true;
    } else {
      relations = {
        uz: true,
        ru: true,
        en: true,
        уз: true,
        categories: true,
        creator: true,
        mainCategory: true,
      };
    }

    req.where = where;
    req.relations = relations;
    next();
  }
}

export default NewsQueryParserMiddleware;
