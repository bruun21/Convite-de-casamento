# Registro de Decisoes

## Confirmadas

### ADR-001 - Aplicacao unica no Vercel

O convite publico, RSVP e painel administrativo ficarao no mesmo projeto
Next.js para reduzir complexidade operacional.

### ADR-002 - Neon Postgres

O Neon sera a fonte de verdade para convites, convidados e respostas.

### ADR-003 - Distribuicao por WhatsApp

A experiencia e os testes priorizam celular, pre-visualizacao Open Graph e o
navegador interno do WhatsApp.

### ADR-004 - Links individuais

Cada convite deve ter token opaco. O token nao pode ser sequencial nem ser
armazenado em texto puro no banco.

### ADR-005 - Implementacao conduzida por Gemini

Gemini faz leitura ampla e executa tarefas operacionais. PO/Codex decide e
aceita. Claude CLI e reservado para revisoes curtas de alto risco ou problemas
realmente bloqueantes.

### ADR-006 - Context Bridge como referencia operacional

O projeto adapta o fluxo do repositorio local
`JoaoPauloNA/context-bridge-lab`: modos `research` e `development`, briefing
compacto, evidencia de mudancas via Git, metricas locais e handoff entre
sessoes. O modo `yolo` nao sera usado.

### ADR-007 - Database isolado no PostgreSQL local (supersedido)

Desenvolvimento e testes usavam o database `casamento` no container `mvp-db-1`.
**Supersedido em 11/06/2026** pelo ADR-011: o Neon passou a ser o banco ativo
para convites e RSVPs. O Postgres local permanece disponivel para testes
isolados, comentando a `DATABASE_URL` no `.env`.

### ADR-011 - Neon ativo como banco de producao

O projeto Neon `ep-purple-glitter-acilk7jz` (sa-east-1) e a fonte de verdade
para `invitations`, `guests` e `rsvp_events`. Migrations sao aplicadas somente
a partir deste repositorio (`npm run db:migrate`). O painel
`Casamento-administracao` consome o mesmo banco e deve usar o mesmo
`RSVP_TOKEN_PEPPER` para gerar links compativeis com o site.

## Confirmadas durante a implementacao

### ADR-008 - Next.js + Drizzle

Next.js App Router, TypeScript, Tailwind CSS, Drizzle ORM e Zod.

### ADR-009 - Painel administrativo no MVP

Incluir somente consulta, busca e CSV no MVP. Edicao completa fica
para P1.

### ADR-010 - RSVP por pessoa

Um convite representa um grupo e cada pessoa cadastrada recebe sua
propria escolha de presenca dentro do mesmo formulario.

## Pendencias criticas

- O prazo operacional local foi configurado para 25 de junho de 2026 e deve ser
  confirmado antes do envio real.
- O casamento esta indicado para 26 de junho de 2026.
- O cronograma usa "Missa" para evitar o texto incorreto "Missa de Sesta".
- A recepcao ainda nao tem local definitivo no material.
