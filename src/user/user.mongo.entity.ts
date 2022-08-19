import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn() // 自增的主键，保证数据的唯一性
  id?: number;

  @Column({ default: null })
  name: string;
}
