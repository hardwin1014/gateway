import {Entity, Column, ObjectIdColumn, ObjectID} from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column('cang')
  name: string;

  @Column('nan')
  email: string;

  @Column('苍南')
  username: string;
}
