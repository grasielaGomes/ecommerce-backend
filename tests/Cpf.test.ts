import { CadastroPessoaFisica } from "../src/entities/Cpf";

describe("CPF tests", () => {
  it("should return true if it receives a valid CPF", () => {
    const cpf = "259.556.978-37";
    const document = new CadastroPessoaFisica(cpf);
    expect(document.isValid()).toBeTruthy();
  });

  it("should return false if it receives a sequence", () => {
    const invalidCPF = "111.111.111-11";
    expect(() => new CadastroPessoaFisica(invalidCPF).isValid()).toThrow(
      new Error("invalid CPF")
    );
  });

  it("should return false if it receives an input with less than 11 digits", () => {
    const invalidCPF = "111";
    expect(() => new CadastroPessoaFisica(invalidCPF).isValid()).toThrow(
      new Error("invalid CPF")
    );
  });
});
