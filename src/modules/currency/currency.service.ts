import { Injectable } from '@nestjs/common';
import * as request from 'request';

@Injectable()
export class CurrencyService {
  constructor() {
    // here code
  }

  async getCurrency() {
    await request(
      'http://cbu.uz/uzc/arkhiv-kursov-valyut/json/',
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          const data = JSON.parse(body).filter(
            (e) => e.Ccy == 'USD' || e.Ccy == 'EUR' || e.Ccy == 'RUB',
          );

          return data;
        }
      },
    );
  }
}
