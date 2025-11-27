import { FirebaseTransactionRepository } from "@infra/adapters/FirebaseTransactionRepository";
import { ListTransactionsUseCase } from "@domain/usecases/ListTransactions";

export function makeListTransactionsUseCase() {
  const repository = new FirebaseTransactionRepository();
  return new ListTransactionsUseCase(repository);
}
