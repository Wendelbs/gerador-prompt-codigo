# Sistema de Gerenciamento de Dados (Microsserviços)

Arquitetura de referência em **TypeScript + Express + MongoDB**, orientada a domínio (DDD) e inversão de dependência.

## Serviços
- `api-gateway`: roteamento único para clientes (web/mobile).
- `auth-service`: cadastro/login, JWT access token + refresh token.
- `data-service`: CRUD de `acknowledgments` (agradecimentos) e `orders` (pedidos).

## Fluxo das telas
1. Tela de Login -> `POST /auth/login`
2. Tela de Cadastro de Usuário -> `POST /auth/register`
3. Tela de Cadastro/Edição/Exclusão de Agradecimentos -> `/data/acknowledgments`
4. Tela de Cadastro/Edição/Exclusão de Pedidos -> `/data/orders`

> O front-end pode consumir somente o gateway (`http://localhost:3000`).

## Estrutura de pastas
Consulte `docs/architecture.md` para a visão completa.

## Como subir com Docker
```bash
docker compose up --build
```

## Validação rápida
```bash
npm install
npm run build
npm run test
```
