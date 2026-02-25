# Arquitetura (Microsserviços + DDD)

## 1) Estrutura completa

```text
.
├── .github/workflows/ci.yml
├── docker-compose.yml
├── docs/architecture.md
├── package.json
├── tsconfig.base.json
└── services
    ├── api-gateway
    │   ├── Dockerfile
    │   ├── package.json
    │   └── src/main.ts
    ├── auth-service
    │   ├── Dockerfile
    │   ├── package.json
    │   └── src
    │       ├── application
    │       │   ├── dto
    │       │   ├── ports
    │       │   └── use-cases
    │       ├── domain
    │       │   ├── entities
    │       │   ├── repositories
    │       │   └── value-objects
    │       ├── infrastructure
    │       │   ├── config
    │       │   ├── controllers
    │       │   ├── persistence
    │       │   └── security
    │       └── main.ts
    └── data-service
        ├── Dockerfile
        ├── package.json
        └── src
            ├── application
            │   ├── dto
            │   ├── ports
            │   └── use-cases
            ├── domain
            │   ├── entities
            │   └── repositories
            ├── infrastructure
            │   ├── config
            │   ├── controllers
            │   └── persistence
            └── main.ts
```

## 2) Inversão de Dependência
- Use cases dependem de **interfaces** (`ports` e `repositories`), nunca de implementações concretas.
- Implementações Mongo/JWT/Bcrypt ficam na camada `infrastructure` e são injetadas no `main.ts`.

## 3) Caso de uso principal (implementado)
`CreateAcknowledgmentUseCase`:
- Valida/normaliza entrada.
- Cria entidade de domínio.
- Executa transação Mongo (`withTransaction`) para:
  1. persistir agradecimento
  2. gravar auditoria
- Retorna id criado.

Esse fluxo garante atomicidade (ACID) entre escrita principal e auditoria.

## 4) Concorrência
- Atualizações de `acknowledgments` e `orders` usam **otimistic locking** por campo `version`.
- Se `version` divergir, API retorna `409 Conflict`.
- Para expansão futura, recomenda-se adotar fila de eventos (`RabbitMQ/Kafka`) com padrão outbox.

## 5) Segurança by design
- `auth-service` emite:
  - Access Token (15 min)
  - Refresh Token (7 dias)
- Refresh token é armazenado com hash no banco.
- `data-service` exige Bearer token e valida assinatura JWT.

## 6) CI/CD básico
- Pipeline GitHub Actions (`.github/workflows/ci.yml`):
  - install
  - build
  - test

## 7) Próximos passos
1. Adicionar endpoint de refresh token e revogação.
2. Adicionar testes de integração com Mongo em container efêmero.
3. Incluir front-end (React/Next) consumindo o API Gateway para as telas.
