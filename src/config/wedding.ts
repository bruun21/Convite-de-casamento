/**
 * Configuração central do convite — Festa de Formatura da Suzyellen.
 *
 * Quase todo o conteúdo visível do site vem daqui. Edite os textos, datas e
 * links abaixo. O nome do export continua `weddingConfig` só para não quebrar
 * os imports espalhados pelo projeto.
 */
export const weddingConfig = {
  // A formanda (mantém a chave `couple` por compatibilidade dos imports)
  couple: {
    firstName: "Suzyellen",
    monogram: "S",
    names: "Suzyellen dos Santos Lavareda",
  },
  event: {
    // Belém/PA usa fuso -03:00 (sem horário de verão)
    isoDateTime: "2026-08-25T20:00:00-03:00",
    fullDate: "25 de agosto de 2026",
    weekday: "Terça-feira",
    time: "20h às 00h",
    // Local único da festa
    venue: {
      location: "Travessa São Francisco, 60",
      address: "Próximo à Praça da Bandeira — Campina, Belém/PA",
      // Coordenadas aproximadas da Praça da Bandeira — confirme no Google Maps
      lat: -1.4558,
      lng: -48.5039,
      // Link de busca pelo endereço (mais confiável que a coordenada)
      placeUrl:
        "https://www.google.com/maps/search/?api=1&query=Travessa+S%C3%A3o+Francisco%2C+60+-+Campina%2C+Bel%C3%A9m+-+PA",
      details:
        "Vai ser uma noite pra celebrar essa conquista ao lado de quem eu amo. Espero você lá!",
    },
    attire: "Traje esporte fino",
    // ⚠️ Observações importantes exibidas em destaque
    notes: [
      "O convite é de caráter individual.",
      "Confirme sua presença aqui pelo site.",
      "Por gentileza, não usar a cor vermelha.",
    ],
    timeline: [
      { time: "20h", label: "Início da celebração" },
      { time: "00h", label: "Encerramento" },
    ],
  },
  photos: {
    // Fotos da formanda em public/fotos/ (troque os arquivos mantendo os nomes)
    hero: [
      { src: "/fotos/foto-1.webp", alt: "Suzyellen" },
      { src: "/fotos/foto-3.webp", alt: "Suzyellen" },
      { src: "/fotos/foto-2.webp", alt: "Suzyellen" },
    ],
    closing: { src: "/fotos/foto-4.webp", alt: "Suzyellen" },
  },
  rsvp: {
    deadline: "2026-08-24T23:59:59-03:00",
    deadlineLabel: "24 de agosto de 2026",
  },
  gifts: {
    title: "Lista de Presentes",
    description:
      "Sua presença já é o maior presente. Mas, se quiser me contemplar de outra forma, você pode contribuir pelo Pix — de forma prática e segura — com o valor que fizer sentido pra você. 🎁",
    // Chave Pix para receber as contribuições — SUBSTITUA pela chave real
    pixKey: "SUA_CHAVE_PIX_AQUI",
    pixName: "Suzyellen dos Santos Lavareda",
    qrImage: "/qr-code.png",
    qrAlt: "QR Code Pix para contribuição",
    // Valores sugeridos (edite à vontade)
    options: [
      { label: "Vale-presente", amount: "R$ 100" },
      { label: "Vale-presente", amount: "R$ 70" },
      { label: "Vale-presente", amount: "R$ 60" },
      { label: "Vale-presente", amount: "R$ 50" },
    ],
  },
  content: {
    // Mensagem de boas-vindas (topo)
    welcomeTitle: "Bem-vindos à minha formatura!",
    welcome:
      "Olá, queridos amigos e familiares! ❤️\n\nEste site foi criado com muito amor para compartilhar com vocês os detalhes da minha grande e aguardada festa de formatura. 🎓🥂🎉\n\nAqui você também pode me presentear de forma prática e segura e, claro, confirmar a sua presença. Leia com atenção as observações do evento. Espero você lá!",
    // Frase / dedicatória (substitui o versículo) — troque à vontade
    verse:
      "Cada esforço, cada noite em claro e cada desafio valeram a pena. Que este seja apenas o começo de uma jornada repleta de conquistas.",
    verseReference: "Suzyellen",
    // Texto opcional de trajetória / agradecimento
    story:
      "Foram anos de dedicação, aprendizado e muita persistência até chegar aqui. Nada disso teria o mesmo sabor sem as pessoas que caminharam comigo.",
    gratitude:
      "Obrigada por fazer parte da minha história e por celebrar comigo esta conquista tão especial.",
    closing: "Espero por você!",
  },
} as const;
