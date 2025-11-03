import http from "http";
import { Redis } from "ioredis";
import pg from "pg";
import app from "./app/server";

async function init() {
  try {
    console.log(`Connecting Redis...`);
    const redis = new Redis("redis://redis:6379", { lazyConnect: true });
    await redis.connect();
    console.log(`Redis Connection Success...`);

    console.log(`Connecting Postgres...`);
    const { Client } = pg;
    const client = new Client({
      host: "db", // internal Docker Compose service name
      port: 5432, // internal Postgres port
      database: "postgres",
      user: "postgres",
      password: "postgres",
    });

    await client.connect();
    console.log(`Postgres Connection Success...`);

    // Http Server Stuff
    const PORT = process.env.PORT ? +process.env.PORT : 8000;
    const server = http.createServer(app);
    server.listen(PORT, () =>
      console.log(`Http server is listening on PORT ${PORT}`)
    );
  } catch (err) {
    console.log(`Error Starting Server`, err);
  }
}

init();
