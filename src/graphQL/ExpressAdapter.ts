import express from "express";
import GraphQLServer from "./GraphQLServer";
import { graphqlHTTP } from "express-graphql";

export default class ExpressAdapter implements GraphQLServer {
  app: any;

  constructor(schema: any) {
    this.app = express();
    this.app.use("/graphql", graphqlHTTP({ schema }));
  }

  listen(port: number): void {
    this.app.listen(port);
  }
}
