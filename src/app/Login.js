import { useState, useMemo } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
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
        <TextInput
          placeholder="Nome Completo"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
      )}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" color="#2563EB" style={styles.loader} />
      ) : (
        <>
          {isSigningUp ? (
            <>
              <TouchableOpacity
                onPress={() => submit("signup")}
                style={[styles.button, styles.signupButton]}
              >
                <Text style={styles.buttonText}>Confirmar Cadastro</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsSigningUp(false)}>
                <Text style={styles.linkText}>Voltar para o login</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => submit("login")}
                style={[styles.button, styles.loginButton]}
              >
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsSigningUp(true)}
                style={[styles.button, styles.signupButton]}
              >
                <Text style={styles.buttonText}>Criar Conta</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
}
