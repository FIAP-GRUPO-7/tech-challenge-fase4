export class CreateTransactionUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute({ userId, type, value, recipient }) {
    if (!userId) throw new Error("userId é obrigatório.");
    if (!type) throw new Error("type é obrigatório.");
    if (!value || typeof value !== "number") throw new Error("value inválido.");

    const { saldo = 0 } = await this.repository.getBalance(userId);

    const isExpense = value < 0;
    if (isExpense && saldo + value < 0) {
      throw new Error("Saldo insuficiente para realizar esta transação.");
    }

    const transactionData = {
      userId,
      type,
      value,
      recipient: recipient ?? null,
    };

    const newTransaction = await this.repository.createTransaction(transactionData);

    await this.repository.updateBalance(userId, value);

    return newTransaction;
  }
}