import { FirebaseTransactionRepository } from "@infra/adapters/FirebaseTransactionRepository";
import { CreateTransactionUseCase } from "@domain/usecases/CreateTransaction";

export function makeCreateTransactionUseCase() {
  const repository = new FirebaseTransactionRepository();
  return new CreateTransactionUseCase(repository);
}
