# Backlog Priorizado

Legenda: `P0` necessario para lancamento, `P1` importante, `P2` evolucao.

## Descoberta

- [x] `P0` Configurar prazo operacional de RSVP para 25 de junho de 2026.
- [x] `P0` Usar "Missa" no cronograma ate nova orientacao.
- [ ] `P0` Definir local e endereco da recepcao.
- [ ] `P0` Receber fotografias oficiais do casal.
- [x] `P0` Definir RSVP individual para pessoas previamente cadastradas.
- [ ] `P1` Definir contato de WhatsApp da assessoria.
- [ ] `P1` Definir destino da lista de presentes.
- [ ] `P1` Aprovar politica de alteracao e retencao das respostas.

## Fundacao tecnica

- [x] `P0` Criar aplicacao Next.js TypeScript.
- [x] `P0` Configurar lint, formatacao, testes e verificacao de tipos.
- [x] `P0` Configurar variaveis de ambiente sem credenciais de producao no Git.
- [x] `P0` Configurar e validar database PostgreSQL local isolado.
- [x] `P0` Configurar Drizzle e migrations.
- [x] `P0` Configurar Neon como banco ativo (migrations + convite de teste).
- [ ] `P1` Criar branch Neon de preview separada quando deploy for aprovado.
- [ ] `P0` Configurar projeto Vercel e deploy de preview.

## Experiencia publica

- [x] `P0` Implementar tokens visuais do deck.
- [x] `P0` Criar hero mobile-first com nomes e data.
- [x] `P0` Implementar secoes de historia, versiculo e convite.
- [x] `P0` Implementar cerimonia, mapa, data, horario e traje.
- [x] `P0` Implementar recepcao e cronograma.
- [x] `P0` Implementar encerramento.
- [x] `P0` Otimizar fontes e layout sem fotografias nesta fase.
- [x] `P1` Respeitar reduced motion; animacoes ficam opcionais.
- [x] `P1` Adicionar lista de presentes com a chave Pix aprovada.

## RSVP

- [x] `P0` Gerar tokens seguros e fornecer importador CSV.
- [x] `P0` Resolver convite pelo token no servidor.
- [x] `P0` Implementar confirmacao e recusa.
- [x] `P0` Permitir selecao de pessoas do grupo.
- [x] `P0` Permitir revisar resposta existente.
- [x] `P0` Impedir respostas apos o prazo configurado.
- [x] `P0` Adicionar transacao e trilha de eventos.
- [x] `P0` Adicionar rate limit e protecao anti-bot.
- [x] `P0` Criar estados de carregamento, erro e sucesso acessiveis.
- [x] `P0` Remover acompanhantes extras e limitar o RSVP aos nomes cadastrados.
- [x] `P0` Atualizar envelope e metadados para a formatura de Suzyellen.

## Administracao

- [x] `P0` Disponibilizar painel administrativo sem login (decisao ADR-012).
- [x] `P0` Exibir totais de confirmados, recusas e pendentes.
- [x] `P0` Criar lista pesquisavel.
- [x] `P0` Exportar CSV.
- [x] `P1` Cadastrar novos convites e convidados no painel.
- [ ] `P1` Editar convites no painel.
- [ ] `P1` Revogar e regenerar link.
- [ ] `P2` Historico detalhado por convite.

## WhatsApp, qualidade e lancamento

- [x] `P0` Criar titulo, descricao e imagem Open Graph.
- [ ] `P0` Testar link real no WhatsApp Android e iOS.
- [x] `P0` Testar layout em 320 px sem overflow.
- [x] `P0` Validar semantica, foco, labels e fluxo por teclado automatizado.
- [ ] `P0` Validar Lighthouse e Core Web Vitals.
- [ ] `P0` Revisar todos os textos com o casal.
- [x] `P0` Disponibilizar exportacao CSV antes do envio dos links.
- [ ] `P1` Configurar dominio personalizado.
- [ ] `P1` Criar mensagem padrao para envio individual no WhatsApp.

## Definition of Done

Uma tarefa so esta concluida quando:

- O comportamento atende aos criterios de produto.
- Typecheck, lint e testes relevantes passam.
- A alteracao foi testada em viewport mobile.
- Nao introduz credenciais nem dados pessoais em fixtures/logs.
- Documentacao e migration foram atualizadas quando aplicavel.
- Outro agente revisou mudancas de seguranca, banco ou RSVP.
