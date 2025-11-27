<div align="center">

# **Tech Challenge – Fase 4 (Grupo 7 - FIAP)**
### **Clean Architecture & Mobile Refactoring**

!Status
!Licen%C3%A7a

</div>

---

## 📖 Tabela de Conteúdos

1. **Sobre o Projeto**
2. **Funcionalidades Principais**
3. **Arquitetura Implementada**
   - Estrutura de Diretórios
   - Explicação das Camadas
4. **Como Executar**
5. **Integrantes**
6. **Entregáveis**
7. **Licença**

---

## 🎯 Sobre o Projeto

A Fase 4 do Tech Challenge tem como objetivo evoluir o aplicativo mobile criado na Fase 3, aplicando boas práticas de **arquitetura moderna**, **modularização**, **separação de camadas**, **otimização de performance** e, principalmente, a **implementação completa da Clean Architecture**.

Este repositório contém a versão totalmente refatorada do projeto, estruturada em camadas independentes, desacopladas e prontas para escalar, atendendo a todos os requisitos obrigatórios da fase.

---

## 🔥 Funcionalidades Principais

- **Autenticação:** Login e Cadastro de usuários com Firebase Auth.
- **Depósito Inicial:** Criação automática de um depósito inicial para novos usuários.
- **Gestão de Transações:** Criação e listagem de transações financeiras.
- **Transferências:** Realização de transferências entre usuários com geração de comprovante.
- **Upload de Comprovantes:** Anexo de imagens em transações, salvas no Firebase Storage.
- **Dashboard:** Gráficos e resumo de atividades recentes.
- **Dados em Tempo Real:** Sincronização instantânea de saldo e transações com o Firestore.

---

## 🏛️ Arquitetura Implementada (Clean Architecture)

A estrutura do projeto segue rigorosamente os princípios da Clean Architecture para garantir um código limpo, modular e de fácil manutenção.

### Estrutura de Diretórios

```
src
├── app/          # Telas, navegação e fluxo de usuário (Expo Router)
├── core/         # Configurações globais, utils e inicialização do Firebase
├── domain/       # Regras de negócio, entidades e casos de uso (código puro)
├── infra/        # Implementação de repositórios (Firebase) e serviços externos
├── main/         # Injeção de dependências (factories)
├── presentation/ # Componentes de UI, hooks visuais e estilos
└── App.js        # Ponto de entrada principal da aplicação
```

### 🧠 Explicação das Camadas

| Camada         | Responsabilidade                                                              | Tecnologias/Padrões                               |
| :--------------- | :---------------------------------------------------------------------------- | :------------------------------------------------ |
| 🔸 **Domain**    | Contém a lógica de negócio pura. É o coração da aplicação, totalmente agnóstico a frameworks. | Entidades, Casos de Uso, Interfaces de Repositório |
| 🔸 **Infra**     | Implementa as interfaces definidas no `Domain`, conectando a aplicação com o mundo externo. | Firebase (Firestore, Auth, Storage), APIs REST    |
| 🔸 **Main**       | Conecta as camadas, construindo as instâncias dos casos de uso com suas dependências concretas. | Injeção de Dependência, Factories                 |
| 🔸 **Presentation** | Responsável pela interface do usuário (UI). Exibe os dados e captura as interações do usuário. | Componentes React, Hooks, Estilos                 |
| 🔸 **App**         | Organiza as telas, a navegação e os fluxos de interação do usuário.           | Expo Router, Stacks de Navegação                  |

---

## 🚀 Como Executar o Projeto

### **Pré-requisitos**
- Node.js
- `npm` ou `yarn`
- Expo Go (para rodar em dispositivo físico) ou Emulador Android/iOS

### **Instalação e Execução**

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DA_PASTA>
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npx expo start
   ```

4. **Abra o aplicativo:**
   - Leia o QR Code com o app **Expo Go** no seu celular.
   - Ou pressione `a` para abrir no Emulador Android.
   - Ou pressione `w` para abrir no navegador web.

---

## 👥 Integrantes do Grupo 7

- Alexa Lins
- Diego Costa
- Henrique Aguiar
- Kauane Gonçalves
- Manoel Meseque

---

## 📦 Entregáveis

- ✅ **Código-fonte refatorado** com Clean Architecture.
- ✅ **Repositório organizado** e com histórico de commits limpo.
- ✅ **Aplicação 100% funcional** após a refatoração.
- 📹 **Vídeo de 5 minutos** demonstrando a arquitetura, o fluxo do app e a integração com o Firebase.

---

## 📄 Licença

Este projeto é de uso exclusivo para fins acadêmicos no âmbito da Pós-Graduação em Arquitetura de Software da FIAP (Tech Challenge).
