import { FirebaseTransactionRepository } from "@infra/adapters/FirebaseTransactionRepository";
import { GetBalanceUseCase } from "@domain/usecases/GetBalanceUseCase";

export function makeGetBalanceUseCase() {
  const repository = new FirebaseTransactionRepository();
  return new GetBalanceUseCase(repository);
}
