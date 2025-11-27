import { UpdateBalanceUseCase } from "@domain/usecases/UpdateBalanceUseCase";
import { FirebaseTransactionRepository } from "@infra/adapters/FirebaseTransactionRepository";

export function makeUpdateBalanceUseCase() {
  const repository = new FirebaseTransactionRepository();
  return new UpdateBalanceUseCase(repository);
}
