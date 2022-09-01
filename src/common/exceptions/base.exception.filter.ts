// 处理统一异常
import { FastifyReply, FastifyRequest } from 'fastify';

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  ServiceUnavailableException,
} from '@nestjs/common';

// base.exception.filter => Catch 的参数为空时，默认捕获所有异常
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    request.log.error(exception);

    // 非 HTTP 标准异常的处理。  SERVICE_UNAVAILABLE是503
    response.status(HttpStatus.SERVICE_UNAVAILABLE).send({
      statusCode: HttpStatus.SERVICE_UNAVAILABLE, // 状态码
      timestamp: new Date().toISOString(), // 时间
      path: request.url, // 报错的接口路径
      message: new ServiceUnavailableException().getResponse(), // 报错的信息
    });
  }
}

// 由于异常拦截的返回函数使用的是 Fastify 提供的，所以我们使用的返回方法是 .send（），
// 如果你没有使用 Fastify 作为 HTTP 底层服务的话，拦截返回的方法要保持跟官网一致（官网默认的是 Express 的框架，所以返回方法不一样）。
