import { MongoClient } from "mongodb";
import { Connector } from "@modules/connector";
import { Creator } from "@modules/creator";
import { Router } from "@modules/router";

import { Express } from "express";
import { Server } from "@modules/server";


process.env.APP_PATH = "C:/Users/Administrator/Desktop/"
process.env.path = "C:/Users/Administrator/Desktop/"

const connector = new Connector();
connector.connect((db: MongoClient | undefined) => {
  if (db !== undefined) {
    const dbo = db.db("unilocked");
    Creator.create(dbo);

    const server = new Server(dbo);
    server.listen(80, (app: Express) => {
      const router = new Router(app, dbo);
      router.listen();
      
    });
  }
});

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
  });