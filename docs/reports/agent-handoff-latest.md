# Handoff Atual

## Contexto

Convite digital da formatura de Suzyellen, publicado na Vercel, com RSVP e
cadastro de convidados armazenados no Neon.

## Tarefa concluida

- Envelope atualizado de Adriele e Joao Paulo para Suzyellen.
- Data e local do envelope atualizados para 25 de agosto de 2026, Belem/PA.
- Monograma antigo `A & J` substituido por `S`.
- Textos de casamento no envelope substituidos por mensagem de formatura.
- Metadados dos convites personalizados atualizados para Suzyellen.
- Secao de acompanhantes extras removida do formulario RSVP.
- API ajustada para sempre zerar o campo legado de acompanhantes.
- Prazo do RSVP fixado em 24 de agosto de 2026, sem a variavel antiga do
  casamento sobrescrever a data correta.

## Arquivos principais

- `src/app/envelope-intro.tsx`
- `src/app/convite/[token]/rsvp-form.tsx`
- `src/app/convite/[token]/rsvp-form.test.tsx`
- `src/lib/rsvp.ts`
- `src/config/wedding.ts`

## Decisoes e riscos

- A coluna legada `extra_companion_count` permanece no banco para evitar uma
  migration destrutiva, mas novas respostas sempre gravam zero.
- O painel `/admin` continua publico por decisao ADR-012.
- A chave Pix publica ainda precisa ser substituida pela chave real.

## Validacao

- Typecheck e ESLint passaram.
- Build Next.js de producao passou.
- Vitest: 10 arquivos e 36 testes passaram.
- Busca no codigo publico confirmou ausencia dos nomes e textos antigos do
  casamento.

## Proxima tarefa recomendada

Substituir a chave Pix de exemplo e validar uma confirmacao real de ponta a
ponta antes de enviar os convites.
