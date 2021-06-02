import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import {
  PostInputType,
  PostResponseType,
  UpdatePostInputType,
} from "../typeDefs/post";
import { Post } from "../entities/Post";
import { isAdmin } from "../middleware/auth";
import { updatePostValidation, validatePost } from "../validation/post";
import { uploadedFiles } from "../utils/getUploadedFiles";
import { deleteFile } from "../utils/deleteFile";
import { resolve } from "path";
import { ctx } from "../context";
import { getConnection } from "typeorm";
import { User } from "../entities/User";

@Resolver()
export class PostResolver {
  @Query(() => String)
  async post(): Promise<string> {
    return "Hallo world!";
  }

  @Mutation(() => PostResponseType)
  @UseMiddleware(isAdmin)
  async createPost(
    @Arg("opts") opts: PostInputType,
    @Ctx() { req }: ctx
  ): Promise<PostResponseType> {
    const { title, description, image, tags, featured, published } = opts;
    const { error } = validatePost(opts);
    const user = await getConnection().manager.findOne(User, {
      where: { id: req.session.userOd },
    });
    if (!user) return { errors: [{ message: "unthenticated" }] };
    const errorField = error?.details[0].message
      .split(" ")[0]
      .split("")
      .slice(1, -1)
      .join("");
    if (error)
      return {
        errors: [{ field: errorField, message: error.details[0].message }],
      };

    const file = image && (await uploadedFiles([image]));
    const post = await Post.create({
      title,
      description,
      tags,
      featured,
      published,
      image: JSON.stringify(file),
    }).save();
    return { post };
  }

  @Mutation(() => PostResponseType)
  @UseMiddleware(isAdmin)
  async updateProduct(
    @Arg("opts") opts: UpdatePostInputType,
    @Ctx() { req }: ctx
  ): Promise<PostResponseType> {
    const user = await getConnection().manager.findOne(User, {
      where: { id: req.session.userOd },
    });
    if (!user) return { errors: [{ message: "unthenticated" }] };
    let { id, title, description, image, tags, featured, published } = opts;
    const { error } = updatePostValidation(opts);
    const errorField = error?.details[0].message
      .split(" ")[0]
      .split("")
      .slice(1, -1)
      .join("");
    if (error)
      return {
        errors: [{ field: errorField, message: error.details[0].message }],
      };

    const post = await Post.findOne(id);
    if (!post)
      return {
        errors: [{ message: `failed to find post with id ${id}` }],
      };

    if (image) {
      deleteFile(resolve(post.image));
      const imgs = await uploadedFiles([image]);
      post.image = JSON.stringify(imgs);
    }

    post.title = title;
    post.description = description;
    if (tags) post.tags = tags;
    post.featured = !!featured;
    post.published = !!published;
    await post.save();
    return { post };
  }

  @Mutation(() => PostResponseType)
  @UseMiddleware(isAdmin)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { res }: ctx
  ): Promise<PostResponseType> {
    const post = await getConnection().manager.findOne(Post, id, {
      relations: ["user"],
    });
    if (post?.user.id !== res.locals.user.id)
      return { errors: [{ message: "unauthorized action." }] };
    deleteFile(resolve(post!.image));
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Post)
      .where("id = :id", { id })
      .execute();

    return { post };
  }
}
