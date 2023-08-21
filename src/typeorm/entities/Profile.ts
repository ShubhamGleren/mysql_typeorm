import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user_profiles' })
export class Profile {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  dob: string;
}
