/**
 * LÓGICA DO FORMULÁRIO RSVP (rsvp.js)
 * Formatação e envio de confirmações de presença via WhatsApp ou cópia direta.
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rsvpForm");
  const copySummaryBtn = document.getElementById("btnCopyRsvp");

  if (!form) return;

  function getFormData() {
    const name = document.getElementById("guestName")?.value.trim() || "";
    const attendance = form.querySelector('input[name="attendance"]:checked')?.value || "Sim";
    const adults = document.getElementById("adultsCount")?.value || "1";
    const children = document.getElementById("childrenCount")?.value || "0";
    const diet = document.getElementById("dietRestrictions")?.value.trim() || "Nenhuma";
    const song = document.getElementById("songRequest")?.value.trim() || "Ao critério do DJ";
    const notes = document.getElementById("guestNotes")?.value.trim() || "";

    return { name, attendance, adults, children, diet, song, notes };
  }

  function formatMessage(data) {
    const isAttending = data.attendance === "Sim";
    const attendanceText = isAttending 
      ? "✅ Sim, com certeza estarei presente!" 
      : "❌ Infelizmente não poderei comparecer.";

    let msg = `💍 *CONFIRMAÇÃO DE PRESENÇA - CASAMENTO*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `👤 *Nome:* ${data.name}\n`;
    msg += `✨ *Presença:* ${attendanceText}\n`;

    if (isAttending) {
      msg += `👥 *Adultos:* ${data.adults}\n`;
      if (parseInt(data.children) > 0) {
        msg += `👶 *Crianças:* ${data.children}\n`;
      }
      if (data.diet) {
        msg += `🥗 *Restrições alimentares:* ${data.diet}\n`;
      }
      if (data.song) {
        msg += `🎵 *Sugestão de música:* ${data.song}\n`;
      }
    }

    if (data.notes) {
      msg += `💬 *Mensagem aos noivos:* ${data.notes}\n`;
    }

    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Enviado através do site do casamento 🤍`;

    return msg;
  }

  // Submissão do formulário - Enviar via WhatsApp
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = getFormData();
    if (!data.name) {
      alert("Por favor, preencha o seu nome completo.");
      return;
    }

    const message = formatMessage(data);
    const encodedMessage = encodeURIComponent(message);

    // Obter número de WhatsApp das configurações
    const whatsappNumber = (window.WEDDING_CONFIG && window.WEDDING_CONFIG.contacts && window.WEDDING_CONFIG.contacts.whatsappNumber)
      ? window.WEDDING_CONFIG.contacts.whatsappNumber
      : "351912345678";

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp numa nova janela/aplicação
    window.open(whatsappUrl, "_blank");

    // Feedback visual
    if (window.showToast) {
      window.showToast("A abrir o WhatsApp para enviar a confirmação... Obrigado!");
    }
  });

  // Botão opcional de copiar resumo
  if (copySummaryBtn) {
    copySummaryBtn.addEventListener("click", () => {
      const data = getFormData();
      if (!data.name) {
        alert("Por favor, preencha pelo menos o seu nome.");
        return;
      }

      const message = formatMessage(data);
      navigator.clipboard.writeText(message).then(() => {
        if (window.showToast) {
          window.showToast("Resumo da confirmação copiado!");
        }
      }).catch(() => {
        alert("Não foi possível copiar automaticamente. Por favor envie pelo botão do WhatsApp.");
      });
    });
  }
});

