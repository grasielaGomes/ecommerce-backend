import HttpServer from "../http/HttpServer";
import Preview from "../useCases/Preview";
import Checkout from "../useCases/Checkout";
import GetOrdersByCPF from "../useCases/GetOrdersByCPF";

export default class OrderController {
  constructor(
    readonly httpServer: HttpServer,
    readonly preview: Preview,
    readonly checkout: Checkout,
    readonly getOrderByCpf: GetOrdersByCPF
  ) {
    httpServer.on("post", "/preview", async function (params: any, body: any) {
      const total = await preview.execute(body);
      return { total };
    });

    httpServer.on("post", "/checkout", async function (params: any, body: any) {
      await checkout.execute(body);
    });

    httpServer.on(
      "get",
      "/orders/:cpf",
      async function (params: any, body: any) {
        const orders = await getOrderByCpf.execute(params.cpf);
        return orders;
      }
    );
  }
}
