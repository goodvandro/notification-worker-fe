# Notification Worker Frontend

Frontend React da aplicação **Notification Worker**, responsável por autenticação, envio, listagem e detalhamento de mensagens com atualização em tempo real via WebSocket.

> 🔗 Backend: [notification-worker-be](https://github.com/goodvandro/notification-worker-be)

---

## 🧱 Tecnologias

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Socket.IO](https://socket.io/)
- [Docker](https://www.docker.com/)
- [Axios](https://axios-http.com/)

---

## 📁 Estrutura de Pastas

```bash
src/
├── api/               # chamadas HTTP (Axios)
├── components/        # componentes compartilhados (PrivateRoute, etc.)
├── features/          # funcionalidades organizadas por domínio (auth, messages)
│   ├── auth/
│   └── messages/
├── hooks/             # hooks reutilizáveis
├── layouts/           # layouts principais (ex: AuthLayout)
├── pages/             # páginas principais (Login, Register, Dashboard, etc.)
├── routes/            # configuração das rotas
├── services/          # serviços como socket, auth, etc.
├── store/             # Redux store e slices
├── styles/            # estilos globais
├── utils/             # funções auxiliares
└── main.tsx           # ponto de entrada
```

---

## 🚀 Como rodar localmente

### 1. Clone o projeto

```bash
git clone https://github.com/goodvandro/notification-worker-fe.git
cd notification-worker-fe
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz com:

```env
VITE_API_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001
```

### 4. Inicie a aplicação

```bash
npm run dev
```

Acesse em [http://localhost:5173](http://localhost:5173)

---

## 🐳 Docker (Como alternativa)

### Build e execute com:

```bash
docker-compose up --build
docker-compose logs -f
```

Acesse: [http://localhost:5173](http://localhost:5173)

---

## 🔐 Funcionalidades

- Autenticação com JWT (com refresh token e expiração automática)
- Registro de usuário
- Listagem paginada de mensagens
- Filtros por status
- Detalhes da mensagem
- Criação de nova mensagem
- WebSocket para atualização em tempo real, após atualização de status
- Feedback com toast (erro/sucesso)
- Estrutura modular e escalável

---

## 🧪 Testes (a configurar)

> Em breve...

---

## 🧑‍💻 Autor

Desenvolvido por [Evandro Monteiro](https://github.com/goodvandro)

---

<!-- ## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. -->
