# **Aplicação Multi-Tenant com Keycloak para Gerenciamento de Permissões**

![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
## **Descrição**

Este repositório contém uma aplicação multi-tenant desenvolvida com NestJS e TypeScript, que utiliza o Keycloak para gerenciar o permissionamento entre os tenants. A aplicação utiliza o Prisma ORM para a conexão com o banco de dados SQLite.

## **Configuração**

Clone este repositório para o seu ambiente local:

```bash
git clone https://github.com/Luan-max/nest-with-keycloak.git
```

Acesse o diretório raiz do projeto:

```arduino
cd nest-with-keycloak
```

Instale as dependências do projeto:
Copy code

```bash
cd nest-multi-tenancy-keycloak && npm install
```

Crie um arquivo .env dentro da pasta nest-multi-tenancy-keycloak e defina as seguintes variáveis de ambiente:

```perl
JWT_SECRET="KEY PUBLICA DO SEU REALM"
DATABASE_URL="file:./dev.db"
```

Configure o Prisma para a conexão com o banco de dados SQLite:

```bash
npx prisma migrate dev --name init
```

## **Execução**

Inicie o servidor Keycloak, para inciar o servidor do Keycloak, basta ir até a pasta "keycloak".

```bash
cd keycloak && docker-compose up
```

Inicie a aplicação:

```bash
cd nest-multi-tenancy-keycloak && npm run start:dev
```

A aplicação estará disponível em http://localhost:3000.

# **Uso**

Faça login na aplicação utilizando as credenciais fornecidas pelo servidor Keycloak.

Após o login, a aplicação irá redirecionar para a página inicial.

Acesse as funcionalidades disponíveis na aplicação e crie seu sistema de permissionamento
