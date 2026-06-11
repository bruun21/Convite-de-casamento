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
        "Após a cerimônia, celebraremos juntos no Talavera. Acompanhe as atualizações para o endereço completo.",
      receptionNote:
        "A festa segue o modelo de consumação — cada pessoa escolhe o que deseja apreciar durante a celebração. Não há consumação obrigatória; o que importa mesmo é a sua companhia.",
      menuUrl: "https://www.dguests.com.br/cardapio/talavera",
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
  },
  content: {
    invitation:
      "Convidamos você para testemunhar o momento em que nossas vidas se tornam uma só jornada.",
    verse:
      "Grava-me como selo sobre o teu coração, pois o amor é forte como a morte. Nem as grandes águas podem apagar o amor, nem os rios submergí-lo.",
    verseReference: "Cantares 8:6-7",
    story:
      "Nossa história foi escrita com carinho e cumplicidade. Hoje, celebramos não apenas um contrato, mas a promessa de uma vida inteira de respeito, risadas e crescimento mútuo.",
    gratitude:
      "Agradecemos por fazer parte da nossa rede de afeto e por estar conosco nesta data tão significativa.",
    closing: "Esperamos por você!",
  },
} as const;
