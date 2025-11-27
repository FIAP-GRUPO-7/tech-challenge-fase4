import { FirebaseReceiptRepository } from "../../../infra/adapters/FirebaseReceiptRepository";
import { UploadReceiptUseCase } from "../../../domain/usecases/UploadReceipt";

export function makeUploadReceiptUseCase() {
  const repository = new FirebaseReceiptRepository();
  return new UploadReceiptUseCase(repository);
}
