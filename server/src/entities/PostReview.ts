import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class PostReview extends BaseEntity {
  @PrimaryColumn({ type: "bigint" })
  userId: number;

  @PrimaryColumn({ type: "bigint" })
  postId: number;

  @Column({ type: "float" })
  rating: number;

  @Column({ type: "text" })
  message: string;

  @ManyToOne(() => User, (u) => u.postReviews, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Post, (p) => p.reviews, { onDelete: "CASCADE" })
  @JoinColumn()
  post: Post;
}
