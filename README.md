```
    ____                  __                _          
   / __ \____ _____  ____/ /___  ____ ___  (_)___  ___ 
  / /_/ / __ `/ __ \/ __  / __ \/ __ `__ \/ /_  / / _ \
 / _, _/ /_/ / / / / /_/ / /_/ / / / / / / / / /_/  __/
/_/ |_|\__,_/_/ /_/\__,_/\____/_/ /_/ /_/_/ /___/\___/  by Catmaitachi

```

<p align="center">
    <img src="https://img.shields.io/badge/docker-blue?logo=docker" alt="Docker" />
    <img src="https://img.shields.io/badge/node.js-18%2B-brightgreen?logo=node.js" alt="Node.js" />
    <img src="https://img.shields.io/badge/typescript-5.x-blue?logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/postgresql-14%2B-blue?logo=postgresql" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/n8n-automation-orange?logo=n8n" alt="n8n" />
</p>

Randomize é um projeto que integra um nó customizado para n8n, desenvolvido em TypeScript, que utiliza a API da Random.org para gerar números aleatórios dentro de um intervalo especificado. O projeto também inclui a pré-configuração de um banco de dados PostgreSQL para armazenar os números gerados.

---

## Pré-requisitos

Antes de começar, verifique se você possui os seguintes itens instalados:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download/)

## Instalação

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/catmaitachi/Randomize.git
   cd Randomize
   ```
2. **Instale as dependências e compile o projeto:**
   ```sh
   npm install
   npm run build
   ```
3. **Suba os containers com Docker Compose:**
   ```sh
   docker-compose up -d
   ```

---

## Testando o Nó

Eis o passo a passo para um teste pré-configurado:

1. Acesse o n8n em [http://localhost:5678](http://localhost:5678)
2. Adicione as credenciais pré-configuradas para o teste:
   - **PostgreSQL:** 
     - Host: `postgres`
     - Database: `NumbersDB`
     - User: `byCatmaitachi`
     - Password: `777`
3. Importe o workflow de teste disponível em `./test/workflow/default.json`.
4. Selecione as credenciais do PostgreSQL nos nós correspondentes.
5. Escolha um intervalo de números no nó "True Random Number".
6. Execute o workflow e verifique os resultados no nó "PostgreSQL - Select All".

---

## Estrutura do Projeto

```
Randomize/
├── nodes/
│   └── Random/
│       ├── Random.node.ts        # Código-fonte do nó
│       └── Random.node.svg       # Ícone SVG do nó
│
├── postgres-init/
│   └── init.sql                  # Scripts de inicialização do banco PostgreSQL
│
├── test/
│   └── workflow/            
│       └── default.json          # Workflow pré-configurado para teste
│
├── docker-compose.yml            # Configuração do Docker Compose
├── gulpfile.js                   # Instruções para compilar o ícone SVG
├── package-lock.json             # Versões exatas das dependências instaladas
├── package.json                  # Configuração do Node.js e dependências do projeto
├── tsconfig.json                 # Configuração do TypeScript
└── README.md                     # Documentação do projeto
```
