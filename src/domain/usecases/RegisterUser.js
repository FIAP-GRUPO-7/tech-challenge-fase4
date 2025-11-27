export class RegisterUserUseCase {
  constructor(authRepository, createInitialDepositUseCase) {
    this.authRepository = authRepository;
    this.createInitialDepositUseCase = createInitialDepositUseCase;
  }

  async execute(email, password) {
    if (!email || !password) {
      throw new Error("Email e senha são obrigatórios para registrar.");
    }

    if (password.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres.");
    }
    const result = await this.authRepository.register(email, password);

    const userId = result?.user?.uid;
    if (!userId) throw new Error("Usuário criado, mas ID não retornado.");

    await this.createInitialDepositUseCase.execute(userId);

    return {
      success: true,
      userId,
      message: "Conta criada com saldo inicial de R$ 2.500"
    };
  }
}
