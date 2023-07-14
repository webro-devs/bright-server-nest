import { Repository } from 'typeorm';

import { NewsEditor } from './editors.entity';

export class NewsEditorRepository extends Repository<NewsEditor> {}
