# Documento de Produto

## Visao

Criar um convite digital elegante e pessoal para o casamento de Adriele e Joao
Paulo. O site deve preservar a identidade editorial do deck, funcionar muito
bem em celulares e tornar a confirmacao de presenca simples para convidados que
chegam por um link no WhatsApp.

## Objetivos do MVP

1. Apresentar o casal, a data, a cerimonia e a recepcao.
2. Permitir que um convidado confirme ou recuse a presenca.
3. Registrar a resposta de forma confiavel no Neon.
4. Permitir links individuais para reduzir erros de identificacao.
5. Oferecer um painel administrativo simples para consultar respostas.
6. Entregar carregamento rapido e boa pre-visualizacao no WhatsApp.

## Publico e contexto

- Convidados acessam predominantemente por celular.
- O primeiro acesso tende a ocorrer no navegador interno do WhatsApp.
- Parte do publico pode ter pouca familiaridade com formularios digitais.
- O fluxo deve aceitar nomes com acentos e familias/casais no mesmo convite.

## Identidade visual

Base extraida do deck:

- Estilo: romantico, editorial, classico e acolhedor.
- Fundo principal: marfim quente, aproximado `#fff9f1`.
- Destaque: dourado fosco, aproximado `#b08d57`.
- Texto principal: quase preto, aproximado `#121212`.
- Texto secundario: cinza escuro, aproximado `#444444`.
- Titulos: Playfair Display.
- Textos e rotulos: Lato.
- Elementos: linhas finas, fotografia em destaque, bastante respiro e animacoes
  discretas.

O site deve interpretar o deck como uma pagina vertical continua. Nao deve
parecer uma apresentacao com slides nem um dashboard de cartoes.

## Jornada principal

1. O convidado recebe no WhatsApp um link como `/convite/<token>`.
2. A pre-visualizacao mostra nomes do casal, data e imagem social.
3. A pagina reconhece o convite e mostra uma saudacao personalizada.
4. O convidado percorre historia, cerimonia, detalhes e cronograma.
5. O convidado seleciona `Vou comparecer` ou `Nao poderei comparecer`.
6. Quando permitido, informa quais pessoas do grupo comparecerao.
7. Confirma a resposta e recebe uma mensagem clara de sucesso.
8. Um novo acesso ao mesmo link exibe a resposta atual e permite alteracao
   ate o prazo configurado.

## Estrutura da pagina

1. Hero com monograma, nomes e data.
2. Mensagem de convite: "Nossa Uniao".
3. Versiculo de 1 Corintios 13:4.
4. Historia do casal.
5. Cerimonia e botao para abrir o endereco no mapa.
6. Data, horario e traje.
7. Recepcao, com estado "local a confirmar" enquanto necessario.
8. Cronograma do dia.
9. Confirmacao de presenca.
10. Lista de presentes, somente quando o destino estiver definido.
11. Encerramento "Esperamos por voce".

## Conteudo inicial

- Casal: Adriele & Joao Paulo.
- Data: 26 de junho de 2026, sexta-feira.
- Cerimonia: 20:00, apos a missa das 19:00.
- Local: Paroquia Nossa Senhora Mae dos Homens.
- Endereco: Rua Candido Mariano, 133 - Quilombo, Cuiaba - MT.
- Traje: passeio completo, com elegancia e conforto.
- Recepcao: local ainda indicado como "a definir" no deck.
- Cronograma:
  - 19:00 - missa.
  - 20:00 - inicio da cerimonia.
  - 21:00 - cumprimentos.
  - 21:30 - recepcao e jantar.

## Requisitos funcionais

### RSVP

- O link individual usa token aleatorio, sem expor ID sequencial.
- O formulario aceita respostas somente para os nomes previamente cadastrados
  no convite; acompanhantes extras nao sao permitidos.
- O convidado pode responder por todo o grupo ou por pessoa, conforme a
  configuracao do convite.
- A resposta deve ser idempotente e atualizavel.
- Deve existir protecao contra envios automatizados e excesso de requisicoes.
- O sistema registra data da primeira resposta e da ultima alteracao.
- Mensagens de erro nao podem revelar se nomes especificos estao na lista.

### Administracao

- Acesso publico e fora de indexacao por decisao explicita do responsavel.
- Resumo de confirmados, recusas, pendentes e total de pessoas.
- Lista pesquisavel por nome.
- Exportacao CSV.
- Criacao de convites disponivel no painel; edicao completa fica para a fase
  seguinte.

### WhatsApp e compartilhamento

- Metadados Open Graph com imagem em proporcao adequada para compartilhamento.
- URL curta, legivel e sempre HTTPS.
- Sem parametros sensiveis alem do token opaco.
- Botao opcional para falar com a assessoria por WhatsApp.
- Testes no navegador interno do WhatsApp em Android e iOS.

## Requisitos nao funcionais

- Mobile-first a partir de 320 px.
- Acessibilidade WCAG 2.2 AA como referencia.
- Conteudo principal utilizavel sem animacoes.
- Respeitar `prefers-reduced-motion`.
- Imagens responsivas e otimizadas.
- Meta de Lighthouse mobile: Performance >= 90, Accessibility >= 95, SEO >= 95.
- Horarios e datas tratados no fuso `America/Cuiaba`.
- Logs nao devem conter token completo, telefone ou observacoes pessoais.

## Fora do MVP

- Pagamentos ou compra de presentes dentro do site.
- Chat em tempo real.
- Login para convidados.
- Editor visual completo do convite.
- Envio automatico em massa pelo WhatsApp.
- Galeria colaborativa de fotos.
- Multiplos idiomas.

## Criterios de sucesso

- Um convidado conclui o RSVP em menos de dois minutos.
- Nenhuma resposta e registrada sem convite valido.
- Atualizar uma resposta nao cria duplicatas.
- A administracao consegue reconciliar convidados e total de presentes.
- O link apresenta corretamente imagem, titulo e descricao no WhatsApp.

## Questoes de produto pendentes

- Novo prazo de RSVP: o deck informa 26 de maio de 2026, data ja passada em
  10 de junho de 2026.
- Confirmar se "Missa de Sesta" deveria ser "Missa de Sexta" ou apenas "Missa".
- Endereco definitivo da recepcao.
- URL da lista de presentes.
- Numero e contato da assessoria.
- RSVP por grupo ou individual para cada pessoa do convite.
- Acompanhantes sem nome previamente cadastrado nao sao permitidos.
- Ate quando respostas podem ser alteradas.
- Fotografias oficiais e autorizacao de uso.
