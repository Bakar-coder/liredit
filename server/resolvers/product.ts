import { resolve } from "path";
import { Product } from "../entities/Product";
import { deleteFile } from "../utils/deleteFile";
import { uploadedFiles } from "../utils/getUploadedFiles";
import {
  validateProduct,
  updateProductValidation,
} from "../validation/product";
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
import {
  CreateProductInputType,
  ProductResponseType,
  UpdateProductInputType,
} from "../typeDefs/product";
import { ctx } from "../context";
import { isAuth, isMerchant } from "../middleware/auth";
import { Category } from "../entities/Category";
import { User } from "../entities/User";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return await getConnection().manager.find(Product, {
      relations: ["user", "category"],
    });
  }

  @Mutation(() => ProductResponseType)
  @UseMiddleware(isAuth)
  @UseMiddleware(isMerchant)
  async createProduct(
    @Arg("opts") opts: CreateProductInputType,
    @Ctx() { req }: ctx
  ): Promise<ProductResponseType> {
    let {
      title,
      stock,
      category,
      price,
      description,
      images,
      tags,
      discount,
      discountExpiration,
      featured,
      published,
    } = opts;
    const { error } = validateProduct(opts);

    const errorField = error?.details[0].message
      .split(" ")[0]
      .split("")
      .slice(1, -1)
      .join("");
    if (error)
      return {
        errors: [{ field: errorField, message: error.details[0].message }],
      };

    let product = await getConnection().manager.findOne(Product, {
      where: { title },
    });
    if (product)
      return {
        errors: [
          {
            field: "title",
            message: `product with title ${title} already exists.`,
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
            message: `login to create product.`,
          },
        ],
      };

    let cat = await Category.findOne({ where: { name: category } });
    if (!cat) {
      cat = Category.create({ name: category });
      cat = await cat.save();
    }

    const file = await uploadedFiles(images);
    product = await Product.create({
      images: JSON.stringify(file),
      title,
      stock,
      category: cat,
      price,
      description,
      tags,
      discount,
      userId: owner.id,
      discountExpiration,
      featured,
      published,
    }).save();
    product.user = owner;
    return { product };
  }

  @Mutation(() => ProductResponseType)
  @UseMiddleware(isMerchant)
  async updateProduct(
    @Arg("opts") opts: UpdateProductInputType,
    @Ctx() { res }: ctx
  ): Promise<ProductResponseType> {
    let {
      id,
      title,
      stock,
      category,
      price,
      description,
      images,
      tags,
      discount,
      discountExpiration,
      featured,
      published,
    } = opts;

    const { error } = updateProductValidation(opts);

    const errorField = error?.details[0].message
      .split(" ")[0]
      .split("")
      .slice(1, -1)
      .join("");
    if (error)
      return {
        errors: [{ field: errorField, message: error.details[0].message }],
      };

    const product = await Product.findOne(id);
    if (!product)
      return {
        errors: [
          {
            message: `failed to find product with id ${id}`,
          },
        ],
      };
    if (res.locals.user.seller && product.user.id !== res.locals.user.id)
      return {
        errors: [
          {
            message:
              "Unauthorized, trying to update a product which doesn't belong to you.",
          },
        ],
      };

    if (images) {
      deleteFile(resolve(product.images));
      const imgs = await uploadedFiles(images);
      product.images = `${imgs}`;
    }

    if (category) {
      let cat = await Category.findOne({ where: { name: category } });
      if (!cat) cat = Category.create({ name: category });
      product.category = cat;
    }

    product.title = title;
    product.stock = stock;
    product.price = price;
    product.description = description;
    if (tags) product.tags = tags;
    if (discount) {
      product.discount = discount;
      product.discountExpiration = discountExpiration;
    }
    product.featured = featured;
    product.published = published;
    await product.save();

    return { product };
  }

  @Mutation(() => ProductResponseType)
  //   @UseMiddleware(isMerchant)
  async deleteProduct(
    @Arg("id", () => Int) id: number,
    @Ctx() { res }: ctx
  ): Promise<ProductResponseType> {
    const product = await getConnection().manager.findOne(Product, id, {
      relations: ["user"],
    });
    if (product?.user.id !== res.locals.user.id)
      return { errors: [{ message: "unauthorized action." }] };
    deleteFile(resolve(product!.images));
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where("id = :id", { id })
      .execute();

    return { product };
  }
}
