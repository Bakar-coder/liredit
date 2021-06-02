import { resolve } from "path";
import { deleteFile } from "../utils/deleteFile";
import { uploadedFiles } from "../utils/getUploadedFiles";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { ctx } from "../context";
import { isAuth, isMerchant } from "../middleware/auth";
import { Category } from "../entities/Category";
import { User } from "../entities/User";
import { updateMediaValidation, validateMedia } from "../validation/media";
import {
  MediaInputType,
  MediaResponseType,
  UpdateMediaInputType,
} from "../typeDefs/media";
import { Media } from "../entities/Media";

@Resolver()
export class MediaResolver {
  @Query(() => [Media])
  async allMedia(): Promise<Media[]> {
    return await getConnection().manager.find(Media, {
      relations: ["user"],
    });
  }

  @Mutation(() => MediaResponseType)
  @UseMiddleware(isAuth)
  @UseMiddleware(isMerchant)
  async createMedia(
    @Arg("opts") opts: MediaInputType,
    @Ctx() { req }: ctx
  ): Promise<MediaResponseType> {
    let {
      title,
      artist,
      category,
      cover,
      description,
      file,
      genre,
      releaseDate,
      type,
      featured,
      published,
    } = opts;
    const { error } = validateMedia(opts);

    const errorField = error?.details[0].message
      .split(" ")[0]
      .split("")
      .slice(1, -1)
      .join("");
    if (error)
      return {
        errors: [{ field: errorField, message: error.details[0].message }],
      };

    let media = await getConnection().manager.findOne(Media, {
      where: { title },
    });
    if (media)
      return {
        errors: [
          {
            field: "title",
            message: `media with title ${title} already exists.`,
          },
        ],
      };

    const owner = await getConnection().manager.findOne(
      User,
      req.session.userId
    );
    if (!owner)
      return {
        errors: [
          {
            field: "unthenticated request.",
            message: `login to create media.`,
          },
        ],
      };

    let cat = await Category.findOne({ where: { name: category } });
    if (!cat) {
      cat = Category.create({ name: category });
      cat = await cat.save();
    }

    const uploadFile = await uploadedFiles(file);
    const uploadCover = await uploadedFiles(cover);
    media = await Media.create({
      title,
      artist,
      category: cat,
      cover: JSON.stringify(uploadCover),
      description,
      file: JSON.stringify(uploadFile),
      genre,
      releaseDate,
      type,
      featured,
      published,
    }).save();
    media.user = owner;
    return { media };
  }

  @Mutation(() => MediaResponseType)
  @UseMiddleware(isMerchant)
  async updateMedia(
    @Arg("opts") opts: UpdateMediaInputType,
    @Ctx() { res }: ctx
  ): Promise<MediaResponseType> {
    let {
      id,
      title,
      artist,
      category,
      cover,
      description,
      file,
      genre,
      releaseDate,
      type,
      featured,
      published,
    } = opts;

    const { error } = updateMediaValidation(opts);

    const errorField = error?.details[0].message
      .split(" ")[0]
      .split("")
      .slice(1, -1)
      .join("");
    if (error)
      return {
        errors: [{ field: errorField, message: error.details[0].message }],
      };

    const media = await Media.findOne(id);
    if (!media)
      return {
        errors: [
          {
            message: `failed to find media item with id ${id}`,
          },
        ],
      };
    if (res.locals.user.seller && media.user.id !== res.locals.user.id)
      return {
        errors: [
          {
            message:
              "Unauthorized, trying to update a product which doesn't belong to you.",
          },
        ],
      };

    if (file) {
      JSON.parse(media.file).map((file: string) => deleteFile(resolve(file)));
      const upload = await uploadedFiles(file);
      media.file = JSON.stringify(upload);
    }

    if (cover) {
      JSON.parse(media.cover).map((cover: string) =>
        deleteFile(resolve(cover))
      );
      const upload = await uploadedFiles(cover);
      media.file = JSON.stringify(upload);
    }

    if (category) {
      let cat = await Category.findOne({ where: { name: category } });
      if (!cat) cat = Category.create({ name: category });
      media.category = cat;
    }

    media.title = title;
    media.artist = artist;
    media.genre = genre;
    media.releaseDate = new Date(releaseDate);
    media.description = description;
    media.type = type;
    media.featured = featured;
    media.published = published;
    await media.save();

    return { media };
  }

  @Mutation(() => MediaResponseType)
  //   @UseMiddleware(isMerchant)
  async deleteMedia(
    @Arg("id", () => Int) id: number,
    @Ctx() { res }: ctx
  ): Promise<MediaResponseType> {
    const media = await getConnection().manager.findOne(Media, id, {
      relations: ["user"],
    });
    if (media?.user.id !== res.locals.user.id)
      return { errors: [{ message: "unauthorized action." }] };
    JSON.parse(media!.file).map((file: string) => deleteFile(resolve(file)));
    JSON.parse(media!.cover).map((file: string) => deleteFile(resolve(file)));

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Media)
      .where("id = :id", { id })
      .execute();

    return { media };
  }
}
