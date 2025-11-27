export class ListTransactionsUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(userId) {
    if (!userId) {
      throw new Error("O userId é obrigatório para listar transações.");
    }

    try {
      const transactions = await this.repository.listTransactions(userId);

      return Array.isArray(transactions) ? transactions : [];
    } catch (error) {
      console.error("[ListTransactionsUseCase] Erro:", error);
      throw new Error("Falha ao listar as transações.");
    }
  }
}