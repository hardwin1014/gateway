import { CacheModule, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';
import { RegisterModule } from './register/register.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true, // 开启全局缓存，如果想局部使用，那就局部注册
      store: redisStore,
      host: getConfig('REDIS_CONFIG').host,
      port: getConfig('REDIS_CONFIG').port,
      auth_pass: getConfig('REDIS_CONFIG').auth,
      db: getConfig('REDIS_CONFIG').db,
    }),
    // 全局注册configService，NestJS 本身也自带了多环境配置方法
    ConfigModule.forRoot({
      ignoreEnvFile: true, // 禁用默认读取 .env 的规则，去读取yaml中的
      isGlobal: true, // 这里开启的是全局注册configService ,如果没有开启，如果使用。需要在单独模块的。module中注册
      load: [getConfig], // 读取utils里面的项目配置，注册到全局。通过自定义配置项即可正常使用环境变量，getConfig是函数
    }),
    UserModule,
    RegisterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

/**
 * 1. yarn add  @nestjs/config
 * 2. 安装完毕之后，在 app.module.ts 中添加 ConfigModule 模块
 * 3. @nestjs/config 默认会从项目根目录载入并解析一个 .env 文件，从 .env 文件和 process.env 合并环境变量键值对，并将结果存储到一个可以通过 ConfigService 访问的私有结构。
 * 4. forRoot() 方法注册了 ConfigService 提供者，后者提供了一个 get() 方法来读取这些解析/合并的配置变量。
 * */
