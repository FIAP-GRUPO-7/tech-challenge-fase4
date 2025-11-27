export class UploadReceiptUseCase {
  constructor(receiptRepository) {
    this.receiptRepository = receiptRepository;
  }

  async execute({ userId, transactionId, pdfUri }) {
    if (!userId || !transactionId || !pdfUri) {
      return { success: false, error: "Parâmetros inválidos" };
    }

    return await this.receiptRepository.uploadReceipt(
      userId,
      transactionId,
      pdfUri
    );
  }
}
