export class UpdateBalanceUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(userId, value) {
    if (!userId) {
      throw new Error("O userId é obrigatório para atualizar o saldo.");
    }

    if (typeof value !== "number") {
      throw new Error("O valor deve ser um número.");
    }

    if (value === 0) {
      throw new Error("O valor de atualização não pode ser zero.");
    }

    try {
      const result = await this.repository.updateBalance(userId, value);

      return {
        success: true,
        updated: result,
        valueApplied: value,
      };
    } catch (error) {
      console.error("[UpdateBalanceUseCase] Erro:", error);
      throw new Error("Falha ao atualizar o saldo do usuário.");
    }
  }
}