import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('注册')
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @ApiOperation({
    summary: '新增用户',
  })
  @Post()
  create(@Body() createRegisterDto: CreateRegisterDto) {
    return this.registerService.create(createRegisterDto);
  }

  @ApiOperation({
    summary: '获取所有用户',
  })
  @Get()
  findAll() {
    return this.registerService.findAll();
  }

  @ApiOperation({
    summary: '查找某个用户',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registerService.findOne(+id);
  }

  @ApiOperation({
    summary: '更新用户',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegisterDto: UpdateRegisterDto,
  ) {
    return this.registerService.update(+id, updateRegisterDto);
  }

  @ApiOperation({
    summary: '删除用户',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registerService.remove(+id);
  }
}
