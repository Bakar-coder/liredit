import { getConnection } from "typeorm";
import { ctx } from "context";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { Event } from "../entities/Event";
import { EventInputType, EventResponseType } from "typeDefs/event";

@Resolver()
export class EventResolver {
  @Query()
  async events() {}

  @Mutation(() => EventResponseType)
  async createEvent(
    @Ctx() { req }: ctx,
    @Arg("opts") opts: EventInputType
  ): Promise<EventResponseType> {
    const { title, file, date, description, featured, published, venue } = opts;
    const user = await getConnection().manager.findOne(
      User,
      req.session.userId
    );
    if (!user?.admin || !user?.seller)
      return { errors: [{ message: "Unauthozised request" }] };
    let event = await getConnection().manager.findOne(Event, {
      where: { title },
    });
    event = Event.create({
      title,
      file: JSON.stringify(file),
      date,
      description,
      featured,
      published,
      venue,
    });
    event = await event.save();
    return { event };
  }

  @Mutation(() => Boolean)
  async deleteEvent(
    @Ctx() { req }: ctx,
    @Arg("id") id: number
  ): Promise<Boolean> {
    const event = await getConnection().manager.findOne(Event, id);
    const user = await getConnection().manager.findOne(
      User,
      req.session.userId
    );
    if (!user) return false;
    if (!(user.id === event?.user.id) || !user.admin) return false;

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Event)
      .where("id = :id", { id })
      .execute();

    return true;
  }
}
