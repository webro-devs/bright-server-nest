import { Module } from '@nestjs/common';
import { CategoryController } from './currency.controller';
import { CurrencyService } from './currency.service';

@Module({
  controllers: [CategoryController],
  providers: [CurrencyService],
  exports: [CurrencyService],
})
export class CategoryModule {}
