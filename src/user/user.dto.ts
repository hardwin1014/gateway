import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class AddUserDto {
  @ApiProperty({ example: 123 })
  id?: string;

  @ApiProperty({ example: '苍南' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '914067438@qq.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '苍山负雪' })
  @IsNotEmpty()
  username: string;
}
