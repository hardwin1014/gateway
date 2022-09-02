import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column({ default: null })
  name: string;

  @Column()
  email: string;

  @Column()
  username: string;
}
