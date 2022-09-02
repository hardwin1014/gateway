import { Module } from '@nestjs/common';
import { DatabaseProviders } from './database.providers';

@Module({
  providers: [...DatabaseProviders],
  exports: [...DatabaseProviders],
})
export class DatabaseModule {}

// Nest IoC 容器中注册提供程序
