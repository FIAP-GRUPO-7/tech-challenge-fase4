<div align="center">

# **Tech Challenge – Fase 4 (Grupo 7 | FIAP)**
### **Refatoração Mobile com Clean Architecture e Atomic Design**

</div>

---

## 📖 Tabela de Conteúdos

1. Sobre o Projeto  
2. Funcionalidades Principais  
3. Arquitetura Implementada  
   - Estrutura de Diretórios  
   - Explicação das Camadas  
4. Padrão de UI (Atomic Design)  
5. Como Executar o Projeto  
6. Integrantes  
7. Entregáveis  
8. Licença  

---

## 🎯 Sobre o Projeto

A **Fase 4 do Tech Challenge** tem como objetivo evoluir o aplicativo mobile desenvolvido na Fase 3, aplicando de forma prática e completa os conceitos de **Clean Architecture**, **separação de responsabilidades**, **baixo acoplamento**, **alta coesão** e **refatoração estrutural**.

Nesta etapa, o foco não está apenas em funcionalidades, mas principalmente na **qualidade arquitetural do código**, garantindo que a aplicação esteja preparada para manutenção, testes, evolução e escalabilidade.

Este repositório contém a versão **totalmente refatorada** do projeto, seguindo rigorosamente os princípios exigidos pela disciplina.

---

## 🔥 Funcionalidades Principais

- **Autenticação de Usuários**
  - Login e cadastro utilizando Firebase Authentication.

- **Depósito Inicial**
  - Criação automática de saldo inicial para novos usuários.

- **Gestão de Transações**
  - Criação, listagem e histórico de transações financeiras.

- **Transferências entre Usuários**
  - Transferências com atualização de saldo em tempo real e geração de comprovante.

- **Upload de Comprovantes**
  - Upload de imagens (PDF/JPG/PNG) utilizando Firebase Storage.

- **Dashboard Financeiro**
  - Visualização de saldo, gráficos e atividades recentes.

- **Dados em Tempo Real**
  - Sincronização instantânea com Firebase Firestore.

---

## 🏛️ Arquitetura Implementada — Clean Architecture

O projeto foi estruturado seguindo os princípios da **Clean Architecture**, garantindo independência de frameworks, desacoplamento entre camadas e clareza na separação de responsabilidades.

### 📂 Estrutura de Diretórios

src
├── app/ # Telas, rotas e navegação (Expo Router)
├── core/ # Configurações globais, utils e inicialização do Firebase
├── domain/ # Regras de negócio puras (entidades e casos de uso)
├── infra/ # Implementações concretas (Firebase, APIs externas)
├── main/ # Injeção de dependências e factories
├── presentation/ # UI, componentes visuais, hooks e estilos
└── App.js # Ponto de entrada da aplicação

---

### 🧠 Explicação das Camadas

| Camada | Responsabilidade |
|------|------------------|
| **Domain** | Contém a lógica de negócio pura. Não depende de frameworks, bibliotecas externas ou Firebase. |
| **Infra** | Implementa as interfaces definidas no Domain, conectando a aplicação ao Firebase e serviços externos. |
| **Main** | Responsável pela injeção de dependências, criando as instâncias corretas dos casos de uso. |
| **Presentation** | Camada de interface do usuário, responsável apenas por exibição e captura de eventos. |
| **App** | Gerencia navegação, rotas e fluxo entre telas. |

Essa separação garante que alterações em UI ou infraestrutura **não impactem as regras de negócio**.

---

## 🎨 Padrão de UI — Atomic Design

A camada de apresentação foi estruturada utilizando o padrão **Atomic Design**, promovendo reutilização, consistência visual e organização do código.

presentation/components
├── atoms # Componentes básicos (Button, Input, Icon, etc.)
├── molecules # Combinações simples de atoms
├── organisms # Componentes complexos e seções da tela

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (LTS)
- npm ou yarn
- Expo Go (dispositivo físico) ou Emulador Android/iOS

### Instalação

    git clone <URL_DO_REPOSITORIO>
    cd tech-challenge-fase4
    npm install

### Execução

    npx expo start

Após iniciar o servidor:

- Escaneie o QR Code com o aplicativo Expo Go
- Ou utilize:
  - a para abrir no Emulador Android
  - w para abrir no navegador Web

---

## 👥 Integrantes — Grupo 7

- Alexa Lins
- Diego Costa
- Henrique Aguiar
- Kauane Gonçalves
- Manoel Meseque

---

## 📦 Entregáveis

✅ Código-fonte totalmente refatorado aplicando Clean Architecture  
✅ Estrutura modular com separação clara de responsabilidades  
✅ Camada de UI organizada com Atomic Design  
✅ Aplicação 100% funcional, executável e integrada ao Firebase

📹 Vídeo demonstrativo contendo:
- Visão geral da arquitetura aplicada
- Organização das camadas do projeto
- Demonstração do fluxo da aplicação
- Integração com Firebase (Auth, Firestore e Storage)

---

## 📄 Licença

Este projeto foi desenvolvido exclusivamente para fins acadêmicos no âmbito da Pós-Graduação em Front-End Engennering — FIAP, como parte do Tech Challenge – Fase 4.
