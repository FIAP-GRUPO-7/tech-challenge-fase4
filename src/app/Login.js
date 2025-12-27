import { useState, useMemo } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@presentation/styles/LoginStyles";
import { makeLoginUseCase } from "main/factories/auth/makeLoginUseCase";
import { makeRegisterUserUseCase } from "main/factories/auth/makeRegisterUserUseCase";
import Input from "@presentation/components/atoms/Input";
import Button from "@presentation/components/atoms/Button";
import { PasswordInput } from "@presentation/components/molecules";


export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginUseCase = useMemo(() => makeLoginUseCase(), []);
  const registerUseCase = useMemo(() => makeRegisterUserUseCase(), []);

  const validateFields = () => {
    if (isSigningUp && !fullName.trim()) {
      setError("Por favor, preencha o nome completo.");
      return false;
    }
    if (!email.trim() || !password.trim()) {
      setError("Por favor, preencha email e senha.");
      return false;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }

    setError("");
    return true;
  };

  const submit = async (action) => {
    if (!validateFields()) return;

    setLoading(true);

    try {
      if (action === "login") {
        await loginUseCase.execute(email, password);
      } else {
        await registerUseCase.execute(email, password, fullName);
      }

      router.replace("/tabs/Home");
    } catch (err) {
      setError(err.message || "Erro inesperado.");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSigningUp ? "Criar Conta" : "Login"}</Text>
      <Text style={styles.subtitle}>
        {isSigningUp ? "Crie uma nova conta" : "Acesse sua conta bancária"}
      </Text>

      {isSigningUp && (
        <Input label="Nome Completo" placeholder="Nome Completo" value={fullName} onChangeText={setFullName} accessibilityLabel="Nome completo" />
      )}

      <Input label="Email" placeholder="Email" value={email} onChangeText={setEmail} accessibilityLabel="Endereço de email" autoCapitalize="none" keyboardType="email-address" />

      <PasswordInput value={password} onChangeText={setPassword} accessibilityLabel="Senha" />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {loading ? (
        <Text style={styles.loader}>Carregando...</Text>
      ) : (
        <>
          {isSigningUp ? (
            <>
              <Button title="Confirmar Cadastro" onPress={() => submit("signup")} accessibilityLabel="Confirmar cadastro" />
              <Button title="Voltar para o login" onPress={() => setIsSigningUp(false)} className="mt-3 bg-gray-200" accessibilityLabel="Voltar para o login" />
            </>
          ) : (
            <>
              <Button title="Entrar" onPress={() => submit("login")} accessibilityLabel="Entrar" />
              <Button title="Criar Conta" onPress={() => setIsSigningUp(true)} className="mt-3 bg-gray-200" accessibilityLabel="Criar conta" />
            </>
          )}
        </>
      )}
    </View>
  );
}
