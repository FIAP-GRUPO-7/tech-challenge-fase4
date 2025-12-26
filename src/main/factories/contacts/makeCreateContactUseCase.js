import { FirebaseContactsRepository } from "../../../infra/adapters/FirebaseContactsRepository";

export function makeCreateContactUseCase() {
  const repository = new FirebaseContactsRepository();

  return {
    async execute(userId, name) {
      return repository.createContact({ userId, name });
    },
  };
}
