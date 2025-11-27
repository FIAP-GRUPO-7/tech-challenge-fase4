import { FirebaseTransactionRepository } from "@infra/adapters/FirebaseTransactionRepository";
import { WatchTransactionsUseCase } from "@domain/usecases/WatchTransactions";

export function makeWatchTransactionsUseCase() {
  const repository = new FirebaseTransactionRepository();
  return new WatchTransactionsUseCase(repository);
}
