import { FirebaseAuthRepository } from "@infra/adapters/FirebaseAuthRepository";
import { LoginUseCase } from "@domain/usecases/LoginUseCase";

export function makeLoginUseCase() {
  const repository = new FirebaseAuthRepository();
  return new LoginUseCase(repository);
}
