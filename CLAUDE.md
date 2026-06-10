# Uso Restrito do Claude CLI

Claude atua como especialista sob demanda, nao como implementador padrao.

O Claude Code possui o MCP `gemini-bridge` conectado. Quando uma sessao do
Claude precisar de leitura ampla, deve delegar essa leitura ao Gemini e receber
um briefing compacto. Isso nao transforma Claude no executor principal.

## Casos permitidos

- Revisao de seguranca do fluxo de RSVP e tokens.
- Revisao de migration ou transacao com risco de perda/duplicacao.
- Diagnostico de concorrencia, cache ou comportamento serverless complexo.
- Segunda opiniao sobre uma mudanca pequena que permaneceu bloqueada apos
  tentativa concreta do Gemini.
- Decisao final em autenticacao, autorizacao, privacidade e operacoes
  destrutivas de banco.

## Orcamento operacional

- Uma chamada por questao.
- Contexto limitado aos arquivos diretamente envolvidos.
- Prompt curto, com pergunta objetiva.
- Preferir revisao de diff em vez de leitura ampla do repositorio.
- Nao pedir implementacao completa quando uma analise ou patch pequeno basta.
- Preferir uma unica chamada com diff e pergunta objetiva.
- Nao usar `yolo`.

## Formato do pedido

```text
Objetivo:
Problema observado:
Arquivos:
Tentativas realizadas:
Restricoes:
Pergunta unica:
```

## Saida esperada

Claude deve responder com achados priorizados, justificativa tecnica e o menor
patch possivel. Gemini continua responsavel por integrar, testar e documentar.
