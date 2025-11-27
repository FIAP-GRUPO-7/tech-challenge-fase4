export class WatchTransactionsUseCase {
  constructor(transactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  execute(userId, onData, onError) {
    return this.transactionRepository.watchTransactions(userId, onData, onError);
  }
}
