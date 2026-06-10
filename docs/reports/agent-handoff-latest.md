# Handoff Atual

## Contexto

Projeto de convite digital para o casamento de Adriele e Joao Paulo, com deploy
na Vercel, RSVP no Neon e distribuicao principal por WhatsApp.

## Estado

- Descoberta inicial concluida.
- Fundacao criada com Next.js 16.2.9, React 19.2.7 e TypeScript.
- Tailwind CSS 4.3.0 configurado com tokens visuais em CSS.
- ESLint, Prettier, typecheck e Vitest configurados.
- Pagina inicial textual implementada sem uso de imagens.
- Tres testes de renderizacao e semantica passando.
- Build de producao passando.
- Logo oficial fornecida pelo usuario em `assets/Logo_casamentoa.svg`.
- Nenhum banco, RSVP, admin, autenticacao ou deploy foi implementado.
- Database local `casamento` criado no container existente `mvp-db-1`.
- Role local dedicado `casamento_app` criado como proprietario do database.
- `casa_capital_dev` permanece separado e pertencendo a `postgres`.

## Validacao

- `npm run format`: passou.
- `npm run lint`: passou sem warnings.
- `npm run typecheck`: passou.
- `npm test`: 1 arquivo e 3 testes passaram.
- `npm run build`: passou; rota `/` gerada estaticamente.
- Revisao curta do Claude: nenhum bloqueio encontrado.

## Decisoes

- `Playfair Display` para titulos e `Lato` para textos via `next/font`.
- Marfim, dourado e tons de texto definidos como CSS custom properties.
- `assets/Logo_casamentoa.svg` e a unica fonte oficial da logo e nao deve ser
  redesenhada sem pedido explicito.
- Imagens e logo nao fazem parte da primeira implementacao da home.
- Dependencias fixadas nas versoes verificadas para reproducibilidade.
- O horario usa `-04:00`: `America/Cuiaba` foi verificado como GMT-04:00 em
  26 de junho de 2026; a sugestao contraria da revisao foi rejeitada.
- Desenvolvimento e testes usarao PostgreSQL 16 no container `mvp-db-1`, mas
  somente por meio do database `casamento` e role `casamento_app`.
- Nenhum recurso Neon deve ser criado sem nova autorizacao do usuario.

## Riscos

- `npm audit --omit=dev` reporta severidade moderada em um PostCSS interno do
  Next.js estavel. O npm nao oferece uma atualizacao estavel correta; nao foi
  aplicado downgrade inseguro nem `npm audit fix --force`.
- As regras de RSVP e informacoes da recepcao ainda estao pendentes.

## Pendencias de negocio

- Atualizar o prazo de RSVP, pois 26 de maio de 2026 ja passou.
- Confirmar o texto do item de missa.
- Informar local da recepcao.
- Definir RSVP por grupo ou por pessoa.
- Informar lista de presentes e contato da assessoria.

## Proxima tarefa recomendada

Definir as regras P0 de convidados e RSVP antes de criar o schema Drizzle no
database local `casamento`.
