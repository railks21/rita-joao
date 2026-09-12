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
      year: "2013",
      image: "images/2013.jpg",
      title: "O Início de Tudo",
      text: "O ano em que os nossos caminhos se cruzaram pela primeira vez e começou a ser escrita esta história de amor."
    },
    {
      year: "2014",
      image: "images/2014.jpg",
      title: "Primeiros Momentos",
      text: "Novas conversas, cumplicidade a nascer e a certeza de que cada instante partilhado tinha um sabor especial."
    },
    {
      year: "2015",
      image: "images/2015.jpg",
      title: "Cumplicidade a Crescer",
      text: "Passeios inesquecíveis, sorrisos partilhados e um sentimento que se tornava cada vez mais forte e profundo."
    },
    {
      year: "2016",
      image: "images/2016.jpg",
      title: "Sempre Lado a Lado",
      text: "Apoio mútuo em todos os momentos e a confirmação diária de que caminhamos na mesma direção."
    },
    {
      year: "2017",
      image: "images/2017.jpg",
      title: "Aventuras & Descobertas",
      text: "Explorando novos lugares, colecionando momentos felizes e criando memórias que guardamos com muito carinho."
    },
    {
      year: "2018",
      image: "images/2018.jpg",
      title: "Fortalecendo Laços",
      text: "Celebrando cada conquista juntos e construindo uma base sólida de carinho, confiança e amizade verdadeira."
    },
    {
      year: "2019",
      image: "images/2019.jpg",
      title: "Planos & Sonhos",
      text: "Um amor maduro e cheio de entusiasmo a desenhar os contornos do futuro que sempre desejámos viver juntos."
    },
    {
      year: "2020",
      image: "images/2020.jpg",
      title: "União & Companheirismo",
      text: "O nosso porto de abrigo. Foi no abraço um do outro que encontrámos sempre a serenidade e o aconchego."
    },
    {
      year: "2021",
      image: "images/2021.jpg",
      title: "Novos Horizontes",
      text: "Retomando viagens, festejando a vida e celebrando a alegria contagiante de partilharmos cada segundo."
    },
    {
      year: "2022",
      image: "images/2022.jpg",
      title: "Sorrisos & Memórias",
      text: "Mais um ano inesquecível de cumplicidade genuína, viagens e momentos especiais com amigos e família."
    },
    {
      year: "2023",
      image: "images/2023.jpg",
      title: "10 Anos de Amor",
      text: "Uma década inteira a crescer juntos, a rir das mesmas histórias e a renovar este amor todos os dias."
    },
    {
      year: "2024",
      image: "images/2024.jpg",
      title: "O Nosso Lar",
      text: "Passos concretos na construção do nosso cantinho, criando o espaço de paz e carinho onde nos sentimos em casa."
    },
    {
      year: "2025",
      image: "images/2025.jpg",
      title: "A Caminho do Grande Dia",
      text: "A emoção de planear cada detalhe da nossa celebração e a contagem decrescente para o momento do 'Sim'."
    },
    {
      year: "2026",
      image: "images/2026.jpg",
      title: "O 'Sim' Mais Fácil!",
      text: "Com o coração aos pulos e num cenário de sonho, fizemos a promessa de uma vida inteira juntos."
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
