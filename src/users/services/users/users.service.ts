import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import {
  CreatePostParams,
  CreateUserParams,
  CreateUserProfileParams,
  UpdateUserParams,
} from 'src/utils/types';
import { Profile } from 'src/typeorm/entities/Profile';
import { Post } from 'src/typeorm/entities/Post';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async findUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return await this.userRepository.save(newUser); // returns promise
  }

  async updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return await this.userRepository.update({ id }, { ...updateUserDetails });
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete({ id });
  }

  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('UserNotFound', HttpStatus.BAD_REQUEST);
    }

    const newProfile = this.profileRepository.create(createUserProfileDetails);

    const savedProfile = await this.profileRepository.save(newProfile);

    user.profile = savedProfile;

    return this.userRepository.save(user);
  }

  async createUserPost(id: number, createUserPostDetails: CreatePostParams) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('UserNotFound', HttpStatus.BAD_REQUEST);
    }

    const newPost = await this.postRepository.create({
      ...createUserPostDetails,
      user,
    });

    // user.posts.push(newPost);
    // this.userRepository.save(user);
    return this.postRepository.save(newPost);
  }
}
