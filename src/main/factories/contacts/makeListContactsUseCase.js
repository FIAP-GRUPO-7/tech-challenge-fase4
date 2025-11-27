import { FirebaseContactsRepository } from "../../../infra/adapters/FirebaseContactsRepository";
import { ListContactsUseCase } from "../../../domain/usecases/ListContactsUseCase";

export function makeListContactsUseCase() {
  const repo = new FirebaseContactsRepository();
  return new ListContactsUseCase(repo);
}
