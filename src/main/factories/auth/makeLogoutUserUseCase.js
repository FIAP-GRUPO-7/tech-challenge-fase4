import { FirebaseAuthRepository } from "@infra/adapters/FirebaseAuthRepository";
import { LogoutUserUseCase } from "@domain/usecases/LogoutUser";

export function makeLogoutUserUseCase() {
  const repository = new FirebaseAuthRepository();
  return new LogoutUserUseCase(repository);
}
