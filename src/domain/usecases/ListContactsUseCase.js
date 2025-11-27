export class ListContactsUseCase {
  constructor(contactsRepository) {
    this.contactsRepository = contactsRepository;
  }

  async execute(userId) {
    if (!userId) return { success: false, error: "UserId é obrigatório." };
    
    return await this.contactsRepository.listContacts(userId);
  }
}