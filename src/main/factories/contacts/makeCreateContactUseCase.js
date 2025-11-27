import { FirebaseContactRepository } from "../../../infra/adapters/FirebaseContactRepository";
import { CreateContactUseCase } from "../../../domain/usecases/CreateContact";

export function makeCreateContactUseCase() {
  const repository = new FirebaseContactRepository();
  return new CreateContactUseCase(repository);
}
