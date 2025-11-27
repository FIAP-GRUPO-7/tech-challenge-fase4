export class CreateInitialDepositUseCase {
  constructor(transactionRepository, updateBalanceUseCase) {
    this.transactionRepository = transactionRepository;
    this.updateBalanceUseCase = updateBalanceUseCase;
  }

  async execute(userId, initialValue = 2500) {
    if (!userId) return { success: false, error: "UserId é obrigatório." };

    const txResult = await this.transactionRepository.createTransaction({
      userId,
      value: initialValue,
      type: "Depósito Inicial",
    });

    if (!txResult.success) return txResult;

    const updateResult = await this.updateBalanceUseCase.execute(userId, initialValue);
    if (!updateResult?.success) {
      return { success: false, error: "Falha ao atualizar saldo inicial." };
    }

    return { success: true, data: { transactionId: txResult.data.id } };
  }
}
