import HttpServer from "../http/HttpServer";
import Preview from "../useCases/Preview";
import Checkout from "../useCases/Checkout";

export default class OrderController {
  constructor(
    readonly httpServer: HttpServer,
    readonly preview: Preview,
    readonly checkout: Checkout
  ) {
    httpServer.on("post", "/preview", async (params: any, body: any) => {
      const total = await preview.execute(body);
      return { total };
    });
    httpServer.on("post", "/checkout", async (params: any, body: any) => {
      const total = await checkout.execute(body);
      return { total };
    });
  }
}
