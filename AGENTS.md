# Politica Operacional dos Agentes

Este projeto adapta o modelo do `context-bridge-lab`.

```text
PO/Codex decide.  -> prioriza, define aceite e valida o resultado.
Gemini executa.   -> pesquisa, mapeia e implementa trabalho operacional.
Claude revisa.    -> entra apenas em trabalho critico ou bloqueio comprovado.
MCP registra.     -> guarda metricas das execucoes do Gemini.
```

## Fonte de verdade

Antes de implementar, ler nesta ordem:

1. `docs/PRODUCT.md`
2. `docs/DECISIONS.md`
3. `docs/ARCHITECTURE.md`
4. `docs/BACKLOG.md`

O deck e referencia visual e de conteudo. Decisoes registradas no repositorio
prevalecem quando houver divergencia posterior.

## Forma de trabalho

- Classificar a tarefa antes de agir:
  - `RESEARCH`: leitura, pesquisa, mapeamento e logs -> Gemini `research`.
  - `DEVELOPMENT`: UI, CRUD, testes e tarefas pequenas -> Gemini `development`.
  - `REVIEW`: validacao de requisitos e qualidade -> PO/Codex.
  - `CRITICAL`: auth, tokens, autorizacao, banco destrutivo, privacidade e
    concorrencia -> PO/Codex conduz; Claude pode revisar.
- Trabalhar em uma tarefa pequena e identificavel do backlog.
- Inspecionar o estado atual antes de editar.
- Respeitar os padroes ja existentes no repositorio.
- Nao fazer refatoracoes sem relacao com a tarefa.
- Atualizar testes e documentacao junto da mudanca.
- Nao marcar item concluido sem executar verificacoes relevantes.
- Registrar nova decisao arquitetural em `docs/DECISIONS.md`.
- Nunca inventar endereco, prazo, contato, lista de presentes ou regra de RSVP.

## Limites de seguranca

- Nunca adicionar `.env`, credenciais ou dados reais de convidados ao Git.
- Usar dados ficticios em testes e seeds versionados.
- Banco acessado somente no servidor.
- Nao registrar tokens completos, telefones ou observacoes pessoais em logs.
- Mudancas de schema exigem migration.
- Operacoes destrutivas em producao exigem aprovacao humana explicita.

## Divisao de responsabilidade

- Gemini: leitura ampla, implementacao operacional, testes, documentacao e
  correcoes rotineiras.
- PO/Codex: arquitetura, prioridades, criterios de aceite e revisao final.
- Claude CLI: revisao direcionada de seguranca, banco, concorrencia ou bug
  complexo depois de Gemini apresentar diagnostico e tentativa concreta.

## Uso do Gemini Bridge

- Rodar a partir da raiz deste projeto.
- Usar `research` como modo padrao para leitura ampla.
- Usar `development` somente em tarefa com escopo e aceite claros.
- Nunca usar `yolo`.
- Para relatorios longos, salvar em `docs/gemini-output/`.
- Tratar o briefing do Gemini como hipotese ate a revisao.
- Conferir `git status`, `git diff` e testes; a declaracao do agente nao e
  evidencia suficiente.

## Metricas e retrabalho

O MCP registra execucoes automaticamente em
`docs/gemini-output/_metrics/gemini-runs.jsonl`.

Depois da revisao, registrar quando relevante:

- nivel de retrabalho: `none`, `low`, `medium`, `high` ou `critical`;
- validacoes executadas;
- divergencias entre arquivos realmente alterados e o briefing.

## Handoff obrigatorio

Ao finalizar uma tarefa, informar:

- item do backlog;
- arquivos alterados;
- decisoes ou suposicoes;
- comandos de verificacao e resultados;
- riscos ou pendencias;
- proximo item recomendado.

Para tarefas relevantes, atualizar
`docs/reports/agent-handoff-latest.md` para permitir troca de sessao sem perda
de contexto.
