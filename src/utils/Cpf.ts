export class CadastroPessoaFisica {
  private cpf: string;

  constructor(input: string) {
    this.cpf = input.replace(/[^\d]+/g, "");
  }

  isValid() {
    if (!this.validate()) throw new Error("invalid CPF");
    return true;
  }

  private validate() {
    if (this.cpf.length !== 11) return false;
    if (this.isSequency()) return false;
    const partialCPF = this.cpf.substring(0, 9);
    const firstDigit = this.getDigit(partialCPF);
    const secondDigit = this.getDigit(partialCPF + firstDigit);
    return this.cpf === partialCPF + firstDigit + secondDigit;
  }

  private getDigit(partialCPF: string) {
    const arrayCPF = partialCPF.split("");
    let regressiveIndex = arrayCPF.length + 1;
    const sum = arrayCPF.reduce((acc, curr) => {
      acc += parseInt(curr) * regressiveIndex;
      regressiveIndex--;
      return acc;
    }, 0);
    const rest = 11 - (sum % 11);
    return rest > 9 ? 0 : rest;
  }
  
  private isSequency() {
    return this.cpf[0].repeat(this.cpf.length) === this.cpf;
  }
}
