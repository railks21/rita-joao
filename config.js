/**
 * CONFIGURAÇÃO DO CASAMENTO - RITA ALVES & JOÃO ABREU
 * 
 * Pode editar facilmente qualquer uma destas informações.
 * O website atualizará os textos, datas, contactos e locais automaticamente!
 */

const WEDDING_CONFIG = {
  // Informações dos Noivos
  couple: {
    bride: "Rita Alves",
    groom: "João Abreu",
    title: "Rita Alves & João Abreu",
    monogram: "R & J",
    quote: "Duas vidas, um só caminho. Mal podemos esperar para celebrar o nosso amor convosco!",
    hashtag: "#RitaEJoao2027"
  },

  // Data e Hora do Casamento
  event: {
    // Formato ISO: AAAA-MM-DDTHH:mm:ss
    targetDate: "2027-07-23T15:00:00",
    displayDate: "23 de Julho de 2027",
    dayOfWeek: "Sexta-feira",
    time: "15:00",
    rsvpDeadline: "31 de Maio de 2027"
  },

  // Locais do Evento
  locations: {
    isAnnounced: true,
    venueName: "Casa do Gandião",
    tagline: "Eventos e Turismo • Fafe",
    address: "Rua do Penedo nº 7, 4820-746 Arões (São Romão), Fafe",
    phone: "(+351) 933 785 589",
    email: "info@casadogandiao.pt",
    website: "https://www.casadogandiao.pt/",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Casa+do+Gandi%C3%A3o+Fafe",
    wazeUrl: "https://waze.com/ul?q=Casa%20do%20Gandi%C3%A3o%20Fafe",
    embedMapUrl: "https://maps.google.com/maps?width=100%25&height=450&hl=pt&q=R.%20do%20Penedo%20n%C2%BA%207%2C%204820-746%20Ar%C3%B5es%20(S%C3%A3o%20Rom%C3%A3o)+(Casa%20do%20Gandi%C3%A3o)&ie=UTF8&t=&z=14&iwloc=B&output=embed",
    
    ceremony: {
      title: "Cerimónia",
      name: "Casa do Gandião",
      address: "Rua do Penedo nº 7, 4820-746 Arões (Fafe)",
      time: "15:00",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Casa+do+Gandi%C3%A3o+Fafe"
    },
    reception: {
      title: "Copo de Água & Festa",
      name: "Casa do Gandião",
      address: "Rua do Penedo nº 7, 4820-746 Arões (Fafe)",
      time: "16:30",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Casa+do+Gandi%C3%A3o+Fafe"
    }
  },

  // Contactos para RSVP
  contacts: {
    whatsappNumber: "351912345678",
    email: "casamento.rita.joao@exemplo.com",
    phoneBride: "+351 912 345 678",
    phoneGroom: "+351 912 345 679"
  },

  // Dados para Lista de Casamento / Presentes
  gifts: {
    message: "A vossa presença no nosso dia é, sem dúvida, o presente mais valioso de todos. Se ainda assim quiserem contribuir para o início desta nossa vida a dois e para a nossa lua de mel, deixamos abaixo os nossos dados:",
    iban: "PT50 0000 0000 0000 0000 0000 0",
    ibanHolder: "Rita Alves e João Abreu",
    mbway: "+351 912 345 678"
  },

  // Programa do Dia
  schedule: [
    {
      time: "14:30",
      icon: "users",
      title: "Receção dos Convidados",
      description: "Chegada dos convidados à Casa do Gandião e boas-vindas ao espaço."
    },
    {
      time: "15:00",
      icon: "rings",
      title: "A Cerimónia",
      description: "O momento solene do 'Sim', onde celebramos os nossos votos de amor."
    },
    {
      time: "16:30",
      icon: "glass",
      title: "Welcome Drink & Cocktail",
      description: "Aperitivos, música ambiente e os primeiros brindes nos jardins da quinta."
    },
    {
      time: "19:30",
      icon: "utensils",
      title: "Jantar & Convívio",
      description: "Banquete com menu especial, discursos e momentos inesquecíveis."
    },
    {
      time: "22:30",
      icon: "cake",
      title: "Corte do Bolo",
      description: "Corte do bolo dos noivos, brinde com champanhe e cortejos de luzes."
    },
    {
      time: "23:00",
      icon: "music",
      title: "Abertura da Pista & Festa",
      description: "Música, dança, bar aberto e ceia até o corpo aguentar!"
    }
  ],

  // Linha do Tempo / Nossa História
  story: [
    {
      year: "2019",
      title: "O Primeiro Olhar",
      text: "Um encontro por acaso entre amigos em comum que se transformou numa conversa sem fim até de madrugada."
    },
    {
      year: "2021",
      title: "A Primeira Viagem",
      text: "Descobrimos que partilhamos a mesma paixão por explorar o mundo, viajar e viver novas aventuras juntos."
    },
    {
      year: "2024",
      title: "Uma Casa, Uma Família",
      text: "Demos o passo de juntar as escovas de dentes e construir o nosso próprio cantinho de conforto e paz."
    },
    {
      year: "2026",
      title: "O Pedido de Casamento",
      text: "Num cenário inesquecível e com o coração aos pulos, o João fez a pergunta e a Rita disse o 'Sim' mais fácil e emocionado de sempre!"
    }
  ],

  // Perguntas Frequentes (FAQ)
  faq: [
    {
      q: "Onde se realiza o casamento?",
      a: "O casamento realizar-se-á na magnífica Casa do Gandião, situada na Rua do Penedo nº 7, Arões (São Romão), Fafe."
    },
    {
      q: "Até quando devo confirmar a presença?",
      a: "Agradecemos que nos confirmem a vossa presença até ao dia 31 de Maio de 2027, para que possamos organizar tudo da melhor forma com o catering."
    },
    {
      q: "Qual é o dress code recomendado?",
      a: "Sugerimos traje Formal / Passeio Completo. Tragam calçado confortável para que possam dançar connosco a noite inteira!"
    },
    {
      q: "Posso levar crianças?",
      a: "Sim! Adoramos as crianças da nossa família e amigos. Por favor, indique no formulário de confirmação quantas crianças irão consigo para que preparemos espaço e menu infantil."
    },
    {
      q: "E se eu tiver alergias ou restrições alimentares?",
      a: "No formulário de confirmação abaixo (RSVP) existe um campo próprio para indicar alergias, intolerâncias ou dietas vegetarianas/vegan. Nós adaptaremos o menu consigo."
    },
    {
      q: "Haverá estacionamento na Casa do Gandião?",
      a: "Sim, a Casa do Gandião dispõe de amplo estacionamento gratuito e privado para todos os convidados."
    }
  ]
};

// Exportar globalmente caso necessário
if (typeof window !== "undefined") {
  window.WEDDING_CONFIG = WEDDING_CONFIG;
}
