export class CreateTransferUseCase {
  constructor(transactionRepository, contactsRepository, updateBalanceUseCase) {
    this.transactionRepository = transactionRepository;
    this.contactsRepository = contactsRepository;
    this.updateBalanceUseCase = updateBalanceUseCase;
  }

  async execute({ userId, recipient, value, attachmentUrl }) {
    if (!userId) return { success: false, error: "UserId é obrigatório." };
    if (!recipient) return { success: false, error: "Destinatário inválido." };
    if (!value || value <= 0)
      return { success: false, error: "Valor inválido." };

    const transactionResult = await this.transactionRepository.createTransaction({
      userId,
      recipient,
      value: -value,
      type: "Transferência",
      attachmentUrl: attachmentUrl ?? null,
    });

    if (!transactionResult.success) return transactionResult;

    await this.updateBalanceUseCase.execute(userId, -value);
    
    const contactExists = await this.contactsRepository.findContact(userId, recipient);

    if (!contactExists.success) return contactExists;

    if (!contactExists.data.exists) {
      await this.contactsRepository.createContact({
        userId,
        name: recipient,
      });
    }

    return {
      success: true,
      transactionId: transactionResult.data.id,
    };
  }
}
