# Projeto Levantamento Técnico

Este projeto é uma aplicação web moderna para realização de levantamentos técnicos, desenvolvida com **React**, **TypeScript**, **Vite** e **Express**.

## 🚀 Tecnologias Utilizadas

- **Frontend:** React 19, TypeScript, Tailwind CSS, Radix UI, Lucide React.
- **Backend:** Express (Node.js).
- **Ferramentas de Build:** Vite, esbuild.
- **Gerenciador de Pacotes:** pnpm.

## 📂 Estrutura do Projeto

```text
/
├── client/          # Código fonte do frontend (React)
├── server/          # Código fonte do backend (Express)
├── shared/          # Código compartilhado entre client e server
├── patches/         # Patches de dependências (wouter)
├── public/          # Arquivos estáticos
├── package.json     # Configurações e dependências
└── vite.config.ts   # Configuração do Vite
```

## 🛠️ Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) e o [pnpm](https://pnpm.io/) instalados em sua máquina.

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/projeto-levantamento-tecnico.git
   ```

2. Entre na pasta do projeto:
   ```bash
   cd projeto-levantamento-tecnico
   ```

3. Instale as dependências:
   ```bash
   pnpm install
   ```

### Desenvolvimento

Para iniciar o servidor de desenvolvimento (frontend e backend):

```bash
pnpm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

### Build para Produção

Para gerar a versão de produção:

```bash
pnpm run build
```

Os arquivos serão gerados na pasta `dist/`.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
