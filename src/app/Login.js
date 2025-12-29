import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState, useMemo } from "react";
import { useRouter } from "expo-router";
import { styles } from "@presentation/styles/LoginStyles";
import { makeLoginUseCase } from "main/factories/auth/makeLoginUseCase";
import { makeRegisterUserUseCase } from "main/factories/auth/makeRegisterUserUseCase";

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

  function validateFields() {
    if (isSigningUp && !fullName.trim()) {
      setError("Por favor, preencha o nome completo.");
      return false;
    }

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return false;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }

    setError("");
    return true;
  }

  async function submit(action) {
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
  }

  function handleSubmit() {
    if (isSigningUp) {
      submit("signup");
    } else {
      submit("login");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isSigningUp ? "Criar conta" : "Entrar"}
      </Text>

      <Text style={styles.subtitle}>
        {isSigningUp ? "Crie uma nova conta" : "Acesse sua conta bancária"}
      </Text>

      {isSigningUp && (
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Nome completo"
          style={styles.input}
        />
      )}

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <>
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>
              {isSigningUp ? "Confirmar cadastro" : "Entrar"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.signupButton]}
            onPress={() => setIsSigningUp((prev) => !prev)}
          >
            <Text style={styles.buttonText}>
              {isSigningUp ? "Voltar para login" : "Criar conta"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
