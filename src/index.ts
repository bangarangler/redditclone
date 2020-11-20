import * as dotenv from "dotenv";
dotenv.config();
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init({
    entities: [Post],
    dbName: "redditclone",
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PW,
    type: "postgresql",
    debug: !__prod__,
  });

  const post = orm.em.create(Post, { title: "my first post" });
  await orm.em.persistAndFlush(post);
  console.log("---------SQL 2 ---------");
  await orm.em.nativeInsert(Post, { title: "my first post 2" });
};

main().catch((err) => {
  console.error(err);
});
