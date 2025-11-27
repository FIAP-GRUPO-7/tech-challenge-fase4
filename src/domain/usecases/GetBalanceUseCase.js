export class GetBalanceUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(userId) {
    if (!userId) {
      return { success: false, error: "O userId é obrigatório para consultar o saldo." };
    }

    try {
      const contaResult = await this.repository.getBalance(userId);
      if (!contaResult.success) {
        return { success: false, error: contaResult.error || "Erro ao obter conta." };
      }

      return { success: true, data: { saldo: contaResult.data?.saldo ?? 0 } };
    } catch (error) {
      console.error("[GetBalanceUseCase] Erro:", error);
      return { success: false, error: "Falha ao consultar o saldo." };
    }
  }
}
