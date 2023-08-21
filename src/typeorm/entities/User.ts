import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Profile } from './Profile';
import { Post } from './Post';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
