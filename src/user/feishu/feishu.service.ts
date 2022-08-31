import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { getAppToken } from 'src/helper/feishu/auth';
import { Cache } from 'cache-manager';
import { BusinessException } from '@/common/exceptions/business.exception';
// 全局使用utils中的项目配置,已经在
import { ConfigService } from '@nestjs/config';
import { messages } from '@/helper/feishu/message';

@Injectable()
export class FeishuService {
  private APP_TOKEN_CACHE_KEY;
  constructor(
    // 为了和缓存管理器实例进行交互，需要使用 CACHE_MANAGER 标记将其注入 cacheManager 实例。
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {
    this.APP_TOKEN_CACHE_KEY = this.configService.get('APP_TOKEN_CACHE_KEY');
  }

  // 获取飞书的token和缓存token
  async getAppToken() {
    let appToken: string;
    appToken = await this.cacheManager.get(this.APP_TOKEN_CACHE_KEY);
    console.log(appToken);
    // 如果缓存中没有appToken那么就请求新的token
    if (!appToken) {
      const response = await getAppToken();
      if (response.code === 0) {
        // token 有效期为 2 小时，在此期间调用该接口 token 不会改变。当 token 有效期小于 30 分的时候,再次请求获取 token 的时候，会生成一个新的 token，与此同时老的 token 依然有效。
        appToken = response.app_access_token;
        // 缓存新token
        await this.cacheManager.set(
          this.APP_TOKEN_CACHE_KEY,
          JSON.stringify(appToken),
          {
            ttl: response.expire - 60, // 存储过期时间的配置，位于key与value的第三个传入参数
          },
        );
      } else {
        throw new BusinessException('飞书调用异常');
      }
    }
    return appToken;
  }

  // 发送信息的services
  async sendMessage(receive_id_type, params) {
    const app_token = await this.getAppToken();
    console.log(app_token);
    return messages(receive_id_type, params, app_token as string);
  }
}
