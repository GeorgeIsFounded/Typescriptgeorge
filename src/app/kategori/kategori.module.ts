import { Module } from '@nestjs/common';
import { KategoriController } from './kategori.controller';

@Module({
  controllers: [KategoriController]
})
export class KategoriModule {}
