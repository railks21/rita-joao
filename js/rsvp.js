/**
 * LÓGICA DO FORMULÁRIO RSVP (rsvp.js)
 * Gestão de caixas dinâmicas para Adultos e Menores,
 * validação sem bloqueios nativos e envio direto para Google Sheets (via Google Apps Script Web App).
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rsvpForm");
  const successCard = document.getElementById("rsvpSuccessCard");
  const resetBtn = document.getElementById("btnResetRsvp");

  if (!form) return;

  const attendanceRadios = form.querySelectorAll('input[name="attendance"]');
  const attendingSection = document.getElementById("attendingSection");
  const decliningSection = document.getElementById("decliningSection");

  const adultsSelect = document.getElementById("adultsCount");
  const childrenSelect = document.getElementById("childrenCount");
  const adultsBoxes = document.getElementById("adultsBoxes");
  const childrenGroup = document.getElementById("childrenGroup");
  const childrenBoxes = document.getElementById("childrenBoxes");

  const btnSubmit = document.getElementById("btnSubmitRsvp");
  const btnSubmitText = document.getElementById("btnSubmitText");
  const statusMessage = document.getElementById("rsvpStatusMessage");

  // Estado dos campos para não perder dados ao mudar quantidades
  let savedAdults = [];
  let savedChildren = [];

  /**
   * Inicializar caixas dinâmicas
   */
  function init() {
    renderAdultBoxes(parseInt(adultsSelect?.value || "2", 10));
    renderChildrenBoxes(parseInt(childrenSelect?.value || "0", 10));

    // Eventos de alteração de número de pessoas
    adultsSelect?.addEventListener("change", (e) => {
      saveCurrentData();
      renderAdultBoxes(parseInt(e.target.value, 10));
    });

    childrenSelect?.addEventListener("change", (e) => {
      saveCurrentData();
      renderChildrenBoxes(parseInt(e.target.value, 10));
    });

    // Alternar entre Sim e Não
    attendanceRadios.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        handleAttendanceToggle(e.target.value);
      });
    });

    // Submissão do Formulário
    form.addEventListener("submit", handleSubmit);

    // Botão de Nova Resposta / Reset
    resetBtn?.addEventListener("click", () => {
      successCard.style.display = "none";
      form.style.display = "grid";
      form.reset();
      savedAdults = [];
      savedChildren = [];
      renderAdultBoxes(2);
      renderChildrenBoxes(0);
      handleAttendanceToggle("Sim");
      document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  /**
   * Guardar valores introduzidos atualmente antes de re-renderizar
   */
  function saveCurrentData() {
    // Adultos
    const adultCards = adultsBoxes ? adultsBoxes.querySelectorAll(".guest-card-box") : [];
    savedAdults = [];
    adultCards.forEach((card) => {
      const firstName = card.querySelector(".adult-first-name")?.value.trim() || "";
      const lastName = card.querySelector(".adult-last-name")?.value.trim() || "";
      savedAdults.push({ firstName, lastName });
    });

    // Menores
    const childCards = childrenBoxes ? childrenBoxes.querySelectorAll(".guest-card-box") : [];
    savedChildren = [];
    childCards.forEach((card) => {
      const firstName = card.querySelector(".child-first-name")?.value.trim() || "";
      const lastName = card.querySelector(".child-last-name")?.value.trim() || "";
      const age = card.querySelector(".child-age")?.value.trim() || "";
      savedChildren.push({ firstName, lastName, age });
    });
  }

  /**
   * Renderizar caixas para identificação de Adultos
   */
  function renderAdultBoxes(count) {
    if (!adultsBoxes) return;
    adultsBoxes.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const prevData = savedAdults[i] || { firstName: "", lastName: "" };
      const card = document.createElement("div");
      card.className = "guest-card-box";

      card.innerHTML = `
        <div class="guest-card-header">
          <span class="guest-badge">Adulto ${i + 1}</span>
        </div>
        <div class="guest-names-grid">
          <div>
            <label class="form-label">Primeiro Nome *</label>
            <input type="text" class="form-input adult-first-name" placeholder="Ex: Maria" value="${escapeHtml(prevData.firstName)}">
          </div>
          <div>
            <label class="form-label">Apelido *</label>
            <input type="text" class="form-input adult-last-name" placeholder="Ex: Fernandes" value="${escapeHtml(prevData.lastName)}">
          </div>
        </div>
      `;
      adultsBoxes.appendChild(card);
    }
  }

  /**
   * Renderizar caixas para identificação de Menores (com input number para a idade)
   */
  function renderChildrenBoxes(count) {
    if (!childrenBoxes || !childrenGroup) return;

    if (count === 0) {
      childrenGroup.style.display = "none";
      childrenBoxes.innerHTML = "";
      return;
    }

    childrenGroup.style.display = "block";
    childrenBoxes.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const prevData = savedChildren[i] || { firstName: "", lastName: "", age: "" };

      const card = document.createElement("div");
      card.className = "guest-card-box";

      card.innerHTML = `
        <div class="guest-card-header">
          <span class="guest-badge guest-badge-child">Menor ${i + 1}</span>
        </div>
        <div class="guest-child-grid">
          <div>
            <label class="form-label">Primeiro Nome *</label>
            <input type="text" class="form-input child-first-name" placeholder="Ex: Tomás" value="${escapeHtml(prevData.firstName)}">
          </div>
          <div>
            <label class="form-label">Apelido *</label>
            <input type="text" class="form-input child-last-name" placeholder="Ex: Silva" value="${escapeHtml(prevData.lastName)}">
          </div>
          <div class="child-age-col">
            <label class="form-label">Idade *</label>
            <input type="number" class="form-input child-age" min="0" max="17" placeholder="Ex: 8" value="${escapeHtml(prevData.age)}">
          </div>
        </div>
      `;
      childrenBoxes.appendChild(card);
    }
  }

  /**
   * Alternar secções quando escolhem Sim ou Não
   */
  function handleAttendanceToggle(attendance) {
    const isAttending = attendance === "Sim";

    if (attendingSection && decliningSection) {
      attendingSection.style.display = isAttending ? "block" : "none";
      decliningSection.style.display = isAttending ? "none" : "block";

      if (btnSubmitText) {
        btnSubmitText.textContent = isAttending ? "Confirmar Presença" : "Enviar Resposta";
      }
    }
  }

  /**
   * Submissão e envio para o Google Sheets
   */
  async function handleSubmit(e) {
    e.preventDefault();

    const attendance = form.querySelector('input[name="attendance"]:checked')?.value || "Sim";
    const isAttending = attendance === "Sim";

    let adultsList = [];
    let childrenList = [];
    let primaryDisplayName = "";

    if (isAttending) {
      // 1. Validar e recolher Adultos
      const adultCards = adultsBoxes ? adultsBoxes.querySelectorAll(".guest-card-box") : [];
      let allAdultsValid = true;

      adultCards.forEach((card, idx) => {
        const first = card.querySelector(".adult-first-name")?.value.trim() || "";
        const last = card.querySelector(".adult-last-name")?.value.trim() || "";

        if (!first || !last) {
          allAdultsValid = false;
        } else {
          const fullName = `${first} ${last}`.trim();
          adultsList.push(fullName);
          if (idx === 0) primaryDisplayName = fullName;
        }
      });

      if (!allAdultsValid || adultsList.length === 0) {
        alert("Por favor, preencha o primeiro nome e apelido de todos os adultos.");
        return;
      }

      // 2. Validar e recolher Menores
      const childCards = childrenBoxes ? childrenBoxes.querySelectorAll(".guest-card-box") : [];
      let allChildrenValid = true;

      childCards.forEach((card) => {
        const first = card.querySelector(".child-first-name")?.value.trim() || "";
        const last = card.querySelector(".child-last-name")?.value.trim() || "";
        const age = card.querySelector(".child-age")?.value.trim() || "";

        if (!first || !last || age === "") {
          allChildrenValid = false;
        } else {
          const ageNum = parseInt(age, 10);
          const ageLabel = isNaN(ageNum) || ageNum !== 1 ? `${age} anos` : "1 ano";
          childrenList.push(`${first} ${last} (${ageLabel})`);
        }
      });

      if (childCards.length > 0 && (!allChildrenValid || childrenList.length !== childCards.length)) {
        alert("Por favor, preencha o primeiro nome, apelido e a idade de todos os menores.");
        return;
      }
    } else {
      // Formulário para quem NÃO vai
      const first = document.getElementById("decliningFirstName")?.value.trim() || "";
      const last = document.getElementById("decliningLastName")?.value.trim() || "";
      primaryDisplayName = `${first} ${last}`.trim();

      if (!first || !last) {
        alert("Por favor, preencha o seu primeiro nome e apelido.");
        return;
      }
    }

    const dietRestrictions = document.getElementById("dietRestrictions")?.value.trim() || "Nenhuma";
    const guestNotes = document.getElementById("guestNotes")?.value.trim() || "";

    // Payload estruturado compatível com a folha Google Sheets
    const payload = {
      timestamp: new Date().toISOString(),
      attendance: isAttending ? "Sim" : "Não",
      adultsCount: isAttending ? adultsList.length : 0,
      adultsNames: isAttending ? adultsList.join(", ") : primaryDisplayName,
      childrenCount: isAttending ? childrenList.length : 0,
      childrenDetails: isAttending ? childrenList.join("; ") : "N/A",
      dietRestrictions: isAttending ? dietRestrictions : "N/A",
      songRequest: "N/A",
      guestNotes: guestNotes || "Sem mensagem"
    };

    // Obter endpoint do Google Apps Script configurado em config.js
    const scriptUrl = window.WEDDING_CONFIG?.rsvp?.googleSheetScriptUrl;

    // Estado visual de carregamento
    setLoadingState(true);

    try {
      if (scriptUrl && scriptUrl.startsWith("https://script.google.com/")) {
        // Envio direto para o Google Sheets (modo no-cors necessário para Google Apps Script)
        await fetch(scriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify(payload)
        });
      } else {
        // Fallback caso o script ainda não tenha sido configurado
        console.warn("RSVP: Google Sheets URL não configurado em config.js. A simular envio:", payload);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      // Sucesso! Mostrar Cartão de Confirmação
      showSuccess(isAttending, primaryDisplayName, adultsList.length, childrenList.length);
    } catch (err) {
      console.error("Erro ao enviar RSVP:", err);
      alert("Houve um problema ao guardar a resposta. Por favor tente novamente ou entre em contacto connosco.");
    } finally {
      setLoadingState(false);
    }
  }

  function setLoadingState(isLoading) {
    if (!btnSubmit) return;
    btnSubmit.disabled = isLoading;
    if (isLoading) {
      btnSubmit.classList.add("btn-loading");
      if (btnSubmitText) btnSubmitText.textContent = "A guardar confirmação...";
    } else {
      btnSubmit.classList.remove("btn-loading");
      const attendance = form.querySelector('input[name="attendance"]:checked')?.value || "Sim";
      if (btnSubmitText) {
        btnSubmitText.textContent = attendance === "Sim" ? "Confirmar Presença" : "Enviar Resposta";
      }
    }
  }

  function showSuccess(isAttending, name, adultsCount, childrenCount) {
    form.style.display = "none";
    if (!successCard) return;

    successCard.style.display = "block";

    const titleEl = successCard.querySelector(".rsvp-success-title");
    const namesEl = document.getElementById("rsvpSuccessNames");

    if (isAttending) {
      if (titleEl) titleEl.textContent = "Presença Confirmada! 🎉";
      let summary = `Muito obrigado, <strong>${escapeHtml(name)}</strong>! `;
      const totalGuests = adultsCount + childrenCount;
      if (totalGuests > 1) {
        const minorsText = childrenCount > 0 ? `, ${childrenCount} menor${childrenCount > 1 ? "es" : ""}` : "";
        summary += `A confirmação para o vosso grupo (${adultsCount} adulto${adultsCount > 1 ? "s" : ""}${minorsText}) foi registada na lista com sucesso.`;
      } else {
        summary += `A sua confirmação foi registada com sucesso na nossa lista de convidados.`;
      }
      if (namesEl) namesEl.innerHTML = summary;
    } else {
      if (titleEl) titleEl.textContent = "Obrigado pela Resposta 🤍";
      if (namesEl) {
        namesEl.innerHTML = `Obrigado por nos avisar, <strong>${escapeHtml(name)}</strong>. Sentiremos a sua falta neste dia, mas sabemos que estará a celebrar connosco no coração!`;
      }
    }

    // Scroll suave até ao cartão
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  init();
});
