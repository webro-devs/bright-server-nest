// import { Injectable } from '@nestjs/common';
// import { ElasticsearchService } from '@nestjs/elasticsearch';
// import { News } from './news.entity';
// import {
//   INewsCountResult,
//   INewsSearchBody,
//   INewsSearchResult,
// } from '../../infra/shared/interface';
// import { HttpException } from '../../infra/validation';

// @Injectable()
// export class SearchService {
//   index = 'news';

//   constructor(private readonly elasticsearchService: ElasticsearchService) {}

//   async indexArticle(news: News) {
//     try {
//       return await this.elasticsearchService.index<
//         INewsSearchResult | INewsSearchBody
//       >({
//         index: this.index,
//         body: news,
//       });
//     } catch (err) {
//       throw new HttpException(true, 500, err.message);
//     }
//   }

//   async count(query: string, fields: string[]) {
//     const body: INewsCountResult = await this.elasticsearchService.count({
//       index: this.index,
//       body: {
//         query: {
//           multi_match: {
//             query,
//             fields,
//           },
//         },
//       },
//     });
//     return body.count;
//   }

//   async search(text: string, offset?: number, limit?: number, startId = 0) {
//     let separateCount = 0;
//     if (startId) {
//       separateCount = await this.count(text, [
//         'state',
//         'ru.title',
//         'ru.description',
//         'ru.shortDescription',
//         'uz.tags',
//       ]);
//     }

//     const body = await this.elasticsearchService.search<INewsSearchResult>({
//       index: this.index,
//       from: offset,
//       size: limit,
//       body: {
//         query: {
//           bool: {
//             must: [
//               {
//                 multi_match: {
//                   query: text,
//                   fields: [
//                     'state',
//                     'ru.title',
//                     'ru.description',
//                     'ru.shortDescription',
//                     'uz.tags',
//                   ],
//                 },
//               },
//               {
//                 match: {
//                   state: 'general access',
//                 },
//               },
//             ],
//           },
//         },
//         sort: {
//           _score: {
//             order: 'desc',
//           },
//         },
//       },
//     });

//     const count = body.hits.total;
//     const hits = body.hits.hits;
//     const results = hits.map((item) => item._source);
//     return {
//       count: startId ? separateCount : count['value'],
//       results,
//     };
//   }

//   async remove(newsId: string) {
//     this.elasticsearchService.deleteByQuery({
//       index: this.index,
//       body: {
//         query: {
//           match: {
//             id: newsId,
//           },
//         },
//       },
//     });
//   }

//   async update(news: News) {
//     const newBody: INewsSearchBody = news;

//     const script = Object.entries(newBody).reduce((result, [key, value]) => {
//       return `${result} ctx._source.${key}='${value}';`;
//     }, '');

//     return this.elasticsearchService.updateByQuery({
//       index: this.index,
//       body: {
//         query: {
//           match: {
//             id: news.id,
//           },
//         },
//         // script: {
//         //   inline: script,
//         // },
//       },
//     });
//   }
// }
