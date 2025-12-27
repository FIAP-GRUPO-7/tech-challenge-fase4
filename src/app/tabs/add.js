import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { useAuth } from "../../presentation/hooks/useAuth";
import useContacts from "../../presentation/hooks/useContacts";

import { Header, ContactsList } from "../../presentation/components/organisms";
import { RecipientInput } from "../../presentation/components/molecules";
import { styles as homeStyles } from "../../presentation/styles/HomeStyles";
import { colors, fontSize, radius, spacing } from "../../presentation/styles/theme";


export default function Transfer() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [menuVisible, setMenuVisible] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  const { contacts, loadingContacts } = useContacts(user);

  const handleNextStep = () => {
    const finalRecipient = selectedContact || recipient;

    if (!finalRecipient) {
      Alert.alert("Erro", "Por favor, insira ou selecione um destinatário.");
      return;
    }

    router.push({
      pathname: "/AddTransactions",
      params: { recipient: finalRecipient },
    });
  };

  

  return (
    <View style={homeStyles.container}>
      <Header user={user} menuVisible={menuVisible} setMenuVisible={setMenuVisible} logout={logout} />

      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => router.replace("/tabs/Home")}
          style={styles.closeButton}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Para quem você quer transferir?</Text>

        <RecipientInput
          value={selectedContact || recipient}
          onChange={(t) => {
            setRecipient(t);
            setSelectedContact(null);
          }}
          contacts={contacts}
          style={styles.input}
        />

        <Text style={styles.subtitle}>Transferências recentes</Text>

        <ContactsList contacts={contacts} loading={loadingContacts} onSelect={(name) => setSelectedContact(name)} />

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleNextStep}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 90,
  },
  closeButton: { alignSelf: 'flex-start', marginBottom: spacing.md, },
  closeButtonText: { fontSize: 24, color: colors.text.primary, },
  title: { fontSize: fontSize.xl, fontWeight: 'bold', marginBottom: spacing.lg, },
  subtitle: { fontSize: fontSize.md, color: colors.text.secondary, marginTop: spacing.xl, marginBottom: spacing.md, },
  input: { borderBottomWidth: 1, borderColor: colors.text.muted, paddingVertical: spacing.md, fontSize: fontSize.md, },
  contactRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, },
  contactInitialCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E0E7FF', justifyContent: 'center', alignItems: 'center', marginRight: spacing.md, },
  contactInitialText: { color: colors.secondary, fontWeight: 'bold', },
  contactName: { fontSize: fontSize.md, },
  footer: {
    paddingTop: spacing.lg,
    marginTop: 'auto',
  },
  button: {
    backgroundColor: colors.secondary,
    padding: spacing.lg,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.text.white,
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  emptyListText: {
    textAlign: 'center',
    color: colors.text.muted,
    marginTop: 20,
  }
});


