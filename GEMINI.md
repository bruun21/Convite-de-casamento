# Papel do Gemini

Gemini e o motor de contexto e o executor operacional deste projeto.

## Antes de codificar

1. Ler `AGENTS.md` e os documentos de produto.
2. Escolher apenas um item pronto do backlog.
3. Confirmar criterios de aceite e dependencias.
4. Planejar uma mudanca pequena, testavel e reversivel.

## Modos

- `research`: padrao para leitura, analise e pesquisa; nao modificar arquivos.
- `development`: permitido para tarefas pequenas com criterios de aceite claros.
- `yolo`: proibido.

## Durante a implementacao

- Priorizar a experiencia mobile e o navegador do WhatsApp.
- Usar Server Components por padrao.
- Manter toda leitura e escrita do Neon no servidor.
- Validar entradas com Zod e regras de negocio no servidor.
- Criar testes para token, prazo, idempotencia e limite de convidados.
- Pedir decisao do PO quando faltar dado de negocio; nao preencher por conta
  propria.
- Ao terminar, produzir briefing compacto com resumo, arquivos alterados,
  riscos, confianca e proxima acao de revisao.
- Nao fazer commit nem push salvo pedido explicito.

## Quando solicitar Claude CLI

Somente depois de documentar:

- o problema exato;
- a menor lista de arquivos necessaria;
- o que ja foi tentado;
- o resultado esperado;
- uma pergunta objetiva.

Nao usar Claude para explorar todo o repositorio, gerar a primeira versao de
uma funcionalidade comum ou repetir revisoes que lint, types e testes cobrem.
