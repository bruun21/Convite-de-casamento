# Handoff Atual

## Contexto

Convite digital da formatura de Suzyellen, publicado na Vercel, com RSVP e
cadastro de convidados armazenados no Neon.

## Tarefa concluida

- Painel `/admin` liberado sem login por solicitacao explicita do responsavel.
- Resumo de confirmados, recusados e pendentes preservado.
- Cadastro de convite, telefone e ate 20 convidados adicionado ao painel.
- Telefones exibidos somente pelos quatro ultimos digitos.
- Conflitos de sufixo de telefone bloqueados para preservar o acesso do
  convidado.
- Exportacao CSV mantida sem a coluna de telefone.
- Rota mantida com `noindex`, `nofollow` e `no-store`.

## Arquivos principais

- `src/app/admin/page.tsx`
- `src/app/admin/admin-create-form.tsx`
- `src/app/admin/actions.ts`
- `src/lib/admin-create.ts`
- `src/proxy.ts`
- `src/app/admin/export/route.ts`

## Validacao

- Typecheck: passou.
- ESLint: passou sem warnings.
- Prettier: passou nos arquivos alterados.
- Vitest: 10 arquivos e 35 testes passaram.
- Build Next.js de producao: passou.
- Previa local de `/admin`: estrutura, formulario e tabela carregaram sem
  autenticacao; nenhum registro ficticio foi gravado no Neon.

## Decisoes e riscos

- ADR-012 registra que o painel e publico e fora de indexacao.
- Qualquer pessoa com a URL pode consultar nomes e cadastrar convites; esse
  risco foi aceito explicitamente pelo responsavel.
- O telefone completo continua armazenado no Neon porque o acesso do convidado
  usa os quatro ultimos digitos, mas nao e renderizado no painel nem exportado.

## Proxima tarefa recomendada

Adicionar edicao e exclusao controlada de convites caso o responsavel precise
corrigir cadastros pelo proprio painel.
