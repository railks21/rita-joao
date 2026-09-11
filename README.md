# Website de Casamento — Rita Alves & João Abreu 💍

Website estático elegante, moderno e responsivo criado para o casamento de **Rita Alves & João Abreu** em **23 de Julho de 2027**, na **Casa do Gandião** (Fafe).

---

## 📁 Estrutura de Ficheiros

```text
Casamento/
├── index.html          # Estrutura HTML semântica completa
├── config.js           # Ficheiro de configuração simples para os noivos
├── README.md           # Guia de utilização e publicação
├── css/
│   ├── style.css       # Estilos visuais, tipografia e responsividade
│   └── animations.css  # Efeitos de scroll e micro-interações
└── js/
    ├── main.js         # Lógica da navegação, lightbox, FAQ e cópia de IBAN
    ├── countdown.js    # Contador regressivo automático até 23/07/2027
    └── rsvp.js         # Formulário de confirmação com envio via WhatsApp
```

---

## ⚙️ Como Personalizar (`config.js`)

Não precisa de mexer em código HTML para alterar as informações mais importantes. Basta abrir o ficheiro **`config.js`** com um editor de texto (Bloco de Notas, VS Code, etc.) e alterar:

1. **Número de WhatsApp**:
   - Altere `whatsappNumber: "351912345678"` para o número que deve receber as confirmações dos convidados.
2. **Localização**:
   - Assim que o local estiver definido, pode preencher o nome e morada e mudar `isAnnounced: true`.
3. **IBAN & MB WAY**:
   - Altere os dados para as suas contas bancárias e contacto direto.
4. **Data Limite de RSVP**:
   - `rsvpDeadline: "31 de Maio de 2027"`.
5. **Programa do Dia & Linha do Tempo**:
   - Pode alterar horas, títulos e descrições diretamente na lista.

---

## 🚀 Como Visualizar e Testar

- Basta dar **duplo clique no ficheiro `index.html`** no seu computador.
- O site abrirá de imediato no seu navegador (Chrome, Edge, Safari, Firefox).
- Pode redimensionar a janela para ver como se adapta a telemóveis e tablets.

---

## 🌐 Como Publicar na Internet Gratuitamente

Para que todos os seus convidados possam aceder no telemóvel:

### Opção 1: Netlify Drop (Mais simples - 30 segundos)
1. Vá a [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arraste a pasta `Casamento` inteira para a página do browser.
3. Fica de imediato online com um link público (ex.: `casamento-rita-joao.netlify.app`).

### Opção 2: GitHub Pages
1. Crie um repositório no GitHub.
2. Faça o upload dos ficheiros.
3. Nas Definições (Settings) > Pages, ative a publicação a partir do branch `main`.

### Opção 3: Vercel
1. Instale ou aceda à [Vercel](https://vercel.com) e importe a pasta do projeto.

