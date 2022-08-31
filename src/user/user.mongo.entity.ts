import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn() // 自增的主键，保证数据的唯一性,并不是跟普通自增主键一样会递增，把它看成 uuid 类似即可
  id?: number;

  @Column({ default: null })
  name: string;
}
