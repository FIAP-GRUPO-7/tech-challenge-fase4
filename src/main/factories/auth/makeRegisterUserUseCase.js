import { FirebaseAuthRepository } from "@infra/adapters/FirebaseAuthRepository";
import { RegisterUserUseCase } from "@domain/usecases/RegisterUser";
import { makeCreateInitialDepositUseCase } from "../transactions/makeCreateInitialDepositUseCase";

export function makeRegisterUserUseCase() {
  const authRepo = new FirebaseAuthRepository();
  const createInitialDeposit = makeCreateInitialDepositUseCase();

  return new RegisterUserUseCase(authRepo, createInitialDeposit);
}
