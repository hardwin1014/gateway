import { Entity, Column, ObjectID, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: ObjectID;

  @Column({ default: null })
  name: string;

  @Column()
  email: string;

  @Column()
  username: string;
}
