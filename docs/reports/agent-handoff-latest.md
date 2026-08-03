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
- Chave Pix de exemplo substituida por `91 989930440`, conforme confirmacao
  explicita do responsavel pelo convite.

## Arquivos principais

- `src/app/envelope-intro.tsx`
- `src/app/convite/[token]/rsvp-form.tsx`
- `src/app/convite/[token]/rsvp-form.test.tsx`
- `src/lib/rsvp.ts`
- `src/config/wedding.ts`
- `src/app/(site)/page.test.tsx`

## Decisoes e riscos

- A coluna legada `extra_companion_count` permanece no banco para evitar uma
  migration destrutiva, mas novas respostas sempre gravam zero.
- O painel `/admin` continua publico por decisao ADR-012.
- O QR Code existente nao foi alterado; a solicitacao recebida tratava do texto
  da chave exibido abaixo dele.

## Validacao

- Typecheck e ESLint passaram.
- Build Next.js de producao passou.
- Vitest: 10 arquivos e 36 testes passaram.
- Busca no codigo publico confirmou ausencia dos nomes e textos antigos do
  casamento.
- Teste direcionado da pagina: 1 arquivo e 5 testes passaram apos a troca da
  chave Pix; typecheck e ESLint tambem passaram.

## Proxima tarefa recomendada

Validar se o QR Code deve ser regenerado com a chave Pix confirmada e testar
uma confirmacao real de ponta a ponta antes de enviar os convites.
