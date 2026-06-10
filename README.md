# Convite de Casamento - Adriele & Joao Paulo

Site mobile-first para convite de casamento, compartilhado principalmente por
WhatsApp, com confirmacao de presenca armazenada no Neon Postgres e deploy na
Vercel.

## Status

MVP local implementado e validado em 10 de junho de 2026. Inclui pagina
publica mobile-first, convites individuais, RSVP por pessoa, painel
administrativo, exportacao CSV, importacao de convidados e PostgreSQL isolado
no container `mvp-db-1`.

Neon e Vercel permanecem intencionalmente pendentes. A apresentacao de
referencia continua sendo a fonte inicial de conteudo e direcao visual:

https://docs.google.com/presentation/d/1fnTkGUQxhCesSGoQBVwc1U966-HPFD8BETOwRRVm9Og/edit

## Documentacao

- `docs/PRODUCT.md`: visao, escopo, experiencia e criterios de aceite.
- `docs/ARCHITECTURE.md`: arquitetura proposta, seguranca e modelo de dados.
- `docs/BACKLOG.md`: backlog priorizado para implementacao.
- `docs/DECISIONS.md`: decisoes tomadas e pontos que ainda exigem confirmacao.
- `AGENTS.md`: regras comuns para Claude e Gemini.
- `GEMINI.md`: papel do agente principal de implementacao.
- `CLAUDE.md`: uso restrito do Claude CLI.

## Direcao tecnica inicial

- Next.js com App Router e TypeScript.
- Vercel para hospedagem e funcoes server-side.
- Neon Postgres para convites e respostas de RSVP.
- Drizzle ORM para schema e migrations.
- Interface responsiva, acessivel e otimizada para navegadores abertos pelo
  WhatsApp.

Nenhuma credencial deve ser adicionada ao repositorio.

## Execucao local

```text
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Convite ficticio para teste:

```text
http://localhost:3000/convite/11111111111111111111111111111111
```

Para importar a lista real, preencha um CSV seguindo
`docs/convidados.example.csv` e execute:

```text
npm run db:import -- caminho/para/convidados.csv
```

Os links individuais sao gravados em `exports/`, que nao entra no Git.

## Modelo de trabalho

Este projeto adapta o modelo local do
`JoaoPauloNA/context-bridge-lab`, instalado em:

```text
C:\Users\crowc\OneDrive\Documentos\02 - Trabalho e Projetos\Projetos\context-bridge-lab
```

Fluxo adotado:

```text
PO/Codex prioriza e aceita
Gemini pesquisa e executa trabalho operacional
Claude CLI revisa somente mudancas criticas
MCP registra as execucoes do Gemini
```

O `gemini-bridge` ja esta conectado ao Claude Code nesta maquina. Resultados
brutos e metricas ficam em `docs/gemini-output/` e nao entram no Git.
