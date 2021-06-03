import Joi from "joi";
import { MediaInputType, UpdateMediaInputType } from "typeDefs/media";

export const validateMedia = (opts: MediaInputType) => {
  const {
    title,
    category,
    artist,
    cover,
    description,
    file,
    genre,
    releaseDate,
    type,
    published,
    featured,
  } = opts;
  return Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    artist: Joi.string().required(),
    genre: Joi.string().required(),
    type: Joi.string().required(),
    releaseDate: Joi.date().required(),
    file: Joi.array().required(),
    cover: Joi.array().required(),
    featured: Joi.boolean(),
    published: Joi.boolean(),
  }).validate({
    title,
    category,
    artist,
    cover,
    description,
    file,
    genre,
    releaseDate,
    type,
    published,
    featured,
  });
};

export const updateMediaValidation = (opts: UpdateMediaInputType) => {
  const {
    title,
    category,
    artist,
    cover,
    description,
    file,
    genre,
    id,
    releaseDate,
    type,
    published,
    featured,
  } = opts;
  return Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    artist: Joi.string().required(),
    description: Joi.string().required(),
    genre: Joi.string().required(),
    type: Joi.string().required(),
    id: Joi.number().required(),
    file: Joi.array(),
    cover: Joi.array(),
    featured: Joi.boolean(),
    published: Joi.boolean(),
  }).validate({
    title,
    category,
    artist,
    cover,
    description,
    file,
    genre,
    id,
    releaseDate,
    type,
    published,
    featured,
  });
};
