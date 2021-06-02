import Joi from "joi";
import { PostInputType, UpdatePostInputType } from "../typeDefs/post";

export const validatePost = (opts: PostInputType) => {
  const { title, description, image, tags, published, featured } = opts;
  return Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.any(),
    tags: Joi.any(),
    featured: Joi.boolean(),
    published: Joi.boolean(),
  }).validate({
    title,
    description,
    image,
    tags,
    published,
    featured,
  });
};

export const updatePostValidation = (opts: UpdatePostInputType) => {
  const { id, title, description, image, tags, published, featured } = opts;
  return Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.array(),
    tags: Joi.any(),
    featured: Joi.boolean(),
    published: Joi.boolean(),
  }).validate({
    id,
    title,
    description,
    image,
    tags,
    published,
    featured,
  });
};
