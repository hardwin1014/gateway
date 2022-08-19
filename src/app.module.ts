import { CacheModule, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';
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
    // 全局注册configService
    ConfigModule.forRoot({
      ignoreEnvFile: true, // 禁用读取.env
      isGlobal: true, // 这里开启的是全局注册configService ,如果没有开启，如果使用。需要在单独模块的。module中注册
      load: [getConfig], // 读取utils里面的项目配置，注册到全局
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
