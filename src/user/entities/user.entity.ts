import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BeforeInsert } from 'typeorm/decorator/listeners/BeforeInsert';
import { Comment } from 'src/comment/entities/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
