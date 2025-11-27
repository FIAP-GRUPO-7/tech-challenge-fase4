import { FirebaseTransactionRepository } from "@infra/adapters/FirebaseTransactionRepository";
import { CreateInitialDepositUseCase } from "@domain/usecases/CreateInitialDepositUseCase";
import { UpdateBalanceUseCase } from "@domain/usecases/UpdateBalanceUseCase";

export function makeCreateInitialDepositUseCase() {
  const repo = new FirebaseTransactionRepository();
  const updateBalance = new UpdateBalanceUseCase(repo);
  return new CreateInitialDepositUseCase(repo, updateBalance);
}
