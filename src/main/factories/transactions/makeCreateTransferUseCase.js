import { FirebaseTransactionRepository } from "../../../infra/adapters/FirebaseTransactionRepository";
import { FirebaseContactsRepository } from "../../../infra/adapters/FirebaseContactsRepository";

import { CreateTransferUseCase } from "../../../domain/usecases/CreateTransferUseCase";
import { UpdateBalanceUseCase } from "../../../domain/usecases/UpdateBalanceUseCase";

export function makeCreateTransferUseCase() {
  const transactionRepo = new FirebaseTransactionRepository();
  const contactsRepo = new FirebaseContactsRepository();

  const updateBalanceUseCase = new UpdateBalanceUseCase(transactionRepo);

  return new CreateTransferUseCase(
    transactionRepo,
    contactsRepo,
    updateBalanceUseCase
  );
}
