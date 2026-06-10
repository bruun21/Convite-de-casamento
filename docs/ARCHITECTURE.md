# Arquitetura Proposta

## Principios

- Uma unica aplicacao para reduzir operacao e custo.
- Banco acessado apenas no servidor.
- Convites identificados por tokens opacos e revogaveis.
- Conteudo publico separado de dados pessoais.
- Solucao simples o bastante para ser mantida depois do casamento.

## Stack

- Next.js App Router com TypeScript.
- React Server Components por padrao.
- Route Handlers ou Server Actions para RSVP.
- Tailwind CSS para estilos, mantendo tokens visuais em CSS variables.
- Drizzle ORM e migrations versionadas.
- PostgreSQL no Neon.
- Vercel para deploy, analytics basico e variaveis de ambiente.
- Zod para validacao na fronteira da aplicacao.

## Banco local

Durante o desenvolvimento, o projeto reutiliza o servidor PostgreSQL 16 do
container Docker existente `mvp-db-1`. O casamento possui database e role
proprios; o database `casa_capital_dev` nao deve ser acessado ou alterado.
Nenhum recurso Neon sera criado nesta fase.

```text
Container: mvp-db-1
Host:     127.0.0.1
Porta:    5432
Banco:    casamento
Usuario:  casamento_app
Senha:    casamento_local
```

Comandos:

```text
npm run db:status
npm run db:check
npm run db:psql
```

Os dados compartilham o servidor e volume do container, mas nao o database. O
database `casamento` pertence ao role `casamento_app`; `casa_capital_dev`
continua pertencendo a `postgres`. Nao adicionar scripts de `down`, remocao de
volume ou comandos destrutivos, pois o container atende outros projetos.

As credenciais sao exclusivamente locais e nao devem ser reutilizadas em
preview ou producao.

## Conexao futura com Neon

Para Vercel com Fluid Compute, a preferencia inicial e `pg` com pool anexado
por `attachDatabasePool` de `@vercel/functions`, conforme a recomendacao atual
do Neon. Caso o runtime escolhido nao suporte esse modelo, usar
`@neondatabase/serverless` por HTTP para consultas simples.

Esta secao e apenas uma direcao futura. Nenhuma conexao Neon deve ser criada
ate uma decisao explicita do usuario.

Variaveis esperadas:

```text
DATABASE_URL=
ADMIN_AUTH_SECRET=
NEXT_PUBLIC_SITE_URL=
RSVP_TOKEN_PEPPER=
```

## Rotas

```text
/                         pagina publica generica
/convite/[token]          convite personalizado e RSVP
/api/rsvp                 leitura/gravacao server-side, se Route Handler
/admin                    resumo protegido
/admin/convidados         lista e exportacao
```

Evitar colocar nome, telefone ou status do convidado na URL.

## Modelo de dados

### `invitations`

```text
id                  uuid primary key
token_hash          text unique not null
display_name        text not null
contact_phone       text null
max_guests          integer not null
allow_plus_one      boolean not null default false
status              text not null default 'pending'
first_responded_at  timestamptz null
responded_at        timestamptz null
created_at          timestamptz not null
updated_at          timestamptz not null
```

O banco guarda somente o hash do token. O token original aparece apenas no link
gerado para envio.

### `guests`

```text
id                  uuid primary key
invitation_id       uuid references invitations(id)
name                text not null
is_primary          boolean not null default false
attendance          text null
created_at          timestamptz not null
updated_at          timestamptz not null
```

`attendance` aceita `attending`, `declined` ou `null`.

### `rsvp_events`

```text
id                  uuid primary key
invitation_id       uuid references invitations(id)
event_type          text not null
payload             jsonb not null
created_at          timestamptz not null
```

Mantem uma trilha minima de alteracoes sem registrar token, IP completo ou
outros dados desnecessarios.

## Fluxo de gravacao

1. Validar formato e tamanho do token.
2. Gerar hash com pepper do servidor.
3. Buscar convite pelo hash.
4. Validar payload com Zod.
5. Verificar prazo e limites no servidor.
6. Atualizar convite e convidados em transacao.
7. Registrar evento de auditoria.
8. Retornar apenas os dados necessarios para a confirmacao.

## Seguranca e privacidade

- Token com pelo menos 128 bits de entropia, gerado por CSPRNG.
- Comparacao por hash indexado; nunca persistir token em texto puro.
- Rate limit por origem e por token derivado.
- Honeypot ou desafio progressivo contra bots.
- Headers de seguranca e Content Security Policy.
- Nenhuma consulta ao Neon diretamente do cliente.
- Coletar telefone apenas se houver necessidade operacional confirmada.
- Politica de retencao e exclusao dos dados apos o evento.
- Backups e restauracao seguem os recursos do plano Neon escolhido.

## Ambientes

- `local`: database `casamento` no container Docker existente `mvp-db-1`.
- `preview`: branch Neon isolada quando houver mudanca de schema relevante.
- `production`: branch principal protegida.

Migrations devem ser testadas em branch de preview antes da producao.

## Observabilidade

- Erros de aplicacao em ferramenta compativel com Vercel.
- Logs estruturados sem dados pessoais.
- Evento de sucesso/falha do RSVP sem armazenar o token.
- Monitor simples para erro 5xx e indisponibilidade.

## Estrategia de testes

- Unitarios: validacao, prazo, limites e normalizacao.
- Integracao: token valido/invalido, resposta e atualizacao idempotente.
- E2E mobile: fluxo completo de RSVP e acesso administrativo.
- Visual: larguras de 320, 375, 430 e desktop.
- Compartilhamento: Open Graph e comportamento no navegador do WhatsApp.
