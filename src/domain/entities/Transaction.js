export class Transaction {
  constructor({
    id = null,
    userId,
    type,
    value,
    contaOrigemId,
    contaDestinoId,
    comprovanteUrl = null,
    createdAt = null,
    status = "Concluída",
  }) {
    this.id = id;
    this.userId = userId;
    this.type = type; 
    this.value = value;
    this.contaOrigemId = contaOrigemId;
    this.contaDestinoId = contaDestinoId;
    this.comprovanteUrl = comprovanteUrl;
    this.createdAt = createdAt;
    this.status = status;
  }
}
