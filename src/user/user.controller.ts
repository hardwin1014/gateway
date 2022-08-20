import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { AddUserDto } from './user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '新增用户',
  })
  @Post('/add')
  // dto数据传输对象
  create(@Body() user: AddUserDto) {
    console.log(user);
    return this.userService.createOrSave(user);
  }
}
