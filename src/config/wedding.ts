/**
 * Texto da recepção — altere `RECEPTION_NOTE_KEY` para "a", "b" ou "c".
 *
 * a) Leve e acolhedora (sugestão da noiva)
 * b) Clara e direta
 * c) Curta e emocional
 */
const RECEPTION_NOTE_KEY = "a" as const;

const receptionNoteOptions = {
  a: {
    label: "Leve e acolhedora",
    text: "Escolhemos celebrar nosso casamento de um jeito leve e descontraído.\n\nDepois da cerimônia, esperamos todos para um jantar no restaurante, com consumo por adesão. Os noivos terão a alegria de compartilhar o bolo e os docinhos preparados para essa ocasião tão especial.\n\nO mais importante para nós é celebrar ao lado de pessoas queridas.",
  },
  b: {
    label: "Clara e direta",
    text: "Após a cerimônia, nos encontramos no Talavera para um jantar em clima descontraído. O consumo é por adesão — cada convidado escolhe o que deseja pedir no restaurante.\n\nCompartilharemos com vocês o bolo e os docinhos desta celebração. Não há pacote fechado nem consumação obrigatória; o que mais desejamos é a sua presença.",
  },
  c: {
    label: "Curta e emocional",
    text: "Queremos uma festa leve e íntima: jantar com consumo por adesão, sem obrigatoriedade de pacote fechado. Os noivos oferecem o bolo e os docinhos; o restante, cada um escolhe à vontade.\n\nSua companhia é o presente que mais nos importa.",
  },
} as const;

export const weddingConfig = {
  couple: {
    bride: "Adriele",
    groom: "João Paulo",
    names: "Adriele & João Paulo",
  },
  event: {
    isoDateTime: "2026-06-26T20:00:00-04:00",
    fullDate: "26 de junho de 2026",
    weekday: "Sexta-feira",
    time: "20h",
    ceremony: {
      location: "Paróquia Nossa Senhora Mãe dos Homens",
      address: "Rua Cândido Mariano, 133 - Quilombo, Cuiabá - MT",
      lat: -15.5913638,
      lng: -56.1029378,
    },
    reception: {
      location: "Talavera",
      address: "Cuiabá - MT",
      // Coordenadas aproximadas — verificar no Google Maps antes de publicar
      lat: -15.5962,
      lng: -56.0834,
      placeUrl:
        "https://www.google.com/maps/place/talavera/data=!4m2!3m1!1s0x939db3d4ce22a5e1:0xd2ef9def626ced97",
      details:
        "Após a cerimônia, celebraremos juntos no Talavera — o mesmo lugar onde nosso pedido de casamento aconteceu.",
      proposalStory:
        "Foi aqui, à beira da fonte iluminada e sob o jardim à noite, que dissemos sim ao nosso futuro. Por isso escolhemos o Talavera para receber vocês: um lugar que já guarda o começo da nossa história e que, para nós, é inesquecível.",
      receptionNoteKey: RECEPTION_NOTE_KEY,
      receptionNoteOptions,
      receptionNote: receptionNoteOptions[RECEPTION_NOTE_KEY].text,
      menuUrl: "https://www.dguests.com.br/cardapio/talavera",
      photos: [
        {
          src: "/fotos/talavera/20240608_205731.jpg",
          alt: "Pedido de casamento à mesa, de mãos dadas, com a fonte iluminada ao fundo",
        },
        {
          src: "/fotos/talavera/20240608_205644.jpg",
          alt: "Alianças sobre o cardápio do Talavera, no dia do pedido de casamento",
        },
        {
          src: "/fotos/talavera/20240608_215916.jpg",
          alt: "Casal celebrando o pedido de casamento no jardim do Talavera",
        },
      ],
    },
    attire: "Vista-se como preferir — o que celebramos é a sua presença.",
    timeline: [
      { time: "20h", label: "Início da cerimônia — após o final da missa das 19h" },
      { time: "21h", label: "Cumprimentos" },
      { time: "21h30", label: "Recepção e jantar" },
    ],
  },
  photos: {
    // Crie um álbum no Google Fotos → "Colaborar" → copie o link e cole aqui
    albumUrl: "https://photos.app.goo.gl/BgiV32hhaCRUTqoJ6",
  },
  rsvp: {
    deadline: process.env.RSVP_DEADLINE ?? "2026-06-25T23:59:59-04:00",
    deadlineLabel: "25 de junho de 2026",
    maxExtraCompanions: 5,
  },
  gifts: {
    title: "Um gesto de carinho",
    description:
      "Não teremos lista de presentes. Se quiser nos ajudar de outra forma, cada um contribui como preferir — com o coração, no valor que fizer sentido para você.",
    qrImage: "/qr-code.svg",
    qrAlt: "QR Code para contribuição",
  },
  content: {
    invitation:
      "Convidamos você para testemunhar o momento em que nossas vidas se tornam uma só jornada.",
    verse:
      "Grava-me como selo sobre o teu coração, pois o amor é forte como a morte. Nem as grandes águas podem apagar o amor, nem os rios submergí-lo.",
    verseReference: "Cânticos 8:6-7",
    story:
      "Nossa história foi escrita com carinho e cumplicidade. Hoje, celebramos não apenas um contrato, mas a promessa de uma vida inteira de respeito, risadas e crescimento mútuo.",
    gratitude:
      "Agradecemos por fazer parte da nossa rede de afeto e por estar conosco nesta data tão significativa.",
    closing: "Esperamos por você!",
  },
} as const;
