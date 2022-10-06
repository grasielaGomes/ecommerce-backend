import axios from "axios";

describe("OrderController tests", () => {
  it("should return preview total by API", async () => {
    const input = {
      cpf: "259.556.978-37",
      orderItems: [
        { idItem: "1", quantity: 1 },
        { idItem: "2", quantity: 1 },
        { idItem: "3", quantity: 3 }
      ]
    };
    const response = await axios.post("http://localhost:3000/preview", input);
    const { total } = response.data;
    expect(total).toBe(6090);
  });
});
