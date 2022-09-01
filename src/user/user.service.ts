import { MongoRepository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.mongo.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: MongoRepository<User>,
  ) {}

  createOrSave(user) {
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    console.log(this.userRepository);
    return await this.userRepository.find();
  }
}
