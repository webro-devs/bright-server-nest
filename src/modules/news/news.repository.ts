import { Repository } from 'typeorm';

import { News } from './news.entity';

export class NewsRepository extends Repository<News> {}
