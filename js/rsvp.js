/**
 * LÓGICA DO FORMULÁRIO RSVP (rsvp.js)
 * Gestão de caixas dinâmicas para Adultos e Crianças,
 * validação sem bloqueios do navegador e envio direto para Google Sheets (Google Apps Script).
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

  // Estado dos campos para não perder dados ao mudar quantidades
  let savedAdults = [];
  let savedChildren = [];

  /**
   * Inicialização
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

    // Crianças
    const childCards = childrenBoxes ? childrenBoxes.querySelectorAll(".guest-card-box") : [];
    savedChildren = [];
    childCards.forEach((card, index) => {
      const firstName = card.querySelector(".child-first-name")?.value.trim() || "";
      const lastName = card.querySelector(".child-last-name")?.value.trim() || "";
      const ageRadio = card.querySelector(`input[name="childAge_${index}"]:checked`);
      const ageGroup = ageRadio ? ageRadio.value : "0-5";
      savedChildren.push({ firstName, lastName, ageGroup });
    });
  }

  /**
   * Renderizar caixas para identificação de Adultos (sem atributo 'required' nativo)
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
   * Renderizar caixas para identificação de Crianças (sem atributo 'required' nativo)
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
      const prevData = savedChildren[i] || { firstName: "", lastName: "", ageGroup: "0-5" };
      const isAge05 = prevData.ageGroup === "0-5";
      const isAge610 = prevData.ageGroup === "6-10";

      const card = document.createElement("div");
      card.className = "guest-card-box";

      card.innerHTML = `
        <div class="guest-card-header">
          <span class="guest-badge guest-badge-child">Criança ${i + 1}</span>
        </div>
        <div class="guest-names-grid">
          <div>
            <label class="form-label">Primeiro Nome *</label>
            <input type="text" class="form-input child-first-name" placeholder="Ex: Tomás" value="${escapeHtml(prevData.firstName)}">
          </div>
          <div>
            <label class="form-label">Apelido *</label>
            <input type="text" class="form-input child-last-name" placeholder="Ex: Silva" value="${escapeHtml(prevData.lastName)}">
          </div>
        </div>
        <div class="child-age-group">
          <label class="form-label">Faixa Etária *</label>
          <div class="radio-group child-age-radios">
            <label class="radio-label">
              <input type="radio" name="childAge_${i}" value="0-5" ${isAge05 || !isAge610 ? "checked" : ""}>
              <span>Idade 0-5</span>
            </label>
            <label class="radio-label">
              <input type="radio" name="childAge_${i}" value="6-10" ${isAge610 ? "checked" : ""}>
              <span>Idade 6-10</span>
            </label>
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
      // Validar e recolher Adultos
      const adultCards = adultsBoxes ? adultsBoxes.querySelectorAll(".guest-card-box") : [];
      let missingAdult = false;

      adultCards.forEach((card, idx) => {
        const firstInput = card.querySelector(".adult-first-name");
        const lastInput = card.querySelector(".adult-last-name");
        const first = firstInput?.value.trim() || "";
        const last = lastInput?.value.trim() || "";

        if (!first || !last) {
          missingAdult = true;
          if (!first) firstInput?.focus();
          else lastInput?.focus();
        } else {
          const fullName = `${first} ${last}`.trim();
          adultsList.push(fullName);
          if (idx === 0) primaryDisplayName = fullName;
        }
      });

      if (missingAdult || adultsList.length === 0) {
        alert("Por favor, preencha o primeiro nome e apelido de todos os adultos.");
        return;
      }

      // Validar e recolher Crianças (se selecionadas)
      const childCount = parseInt(childrenSelect?.value || "0", 10);
      if (childCount > 0) {
        const childCards = childrenBoxes ? childrenBoxes.querySelectorAll(".guest-card-box") : [];
        let missingChild = false;

        childCards.forEach((card, idx) => {
          const firstInput = card.querySelector(".child-first-name");
          const lastInput = card.querySelector(".child-last-name");
          const first = firstInput?.value.trim() || "";
          const last = lastInput?.value.trim() || "";

          const ageRadio = card.querySelector(`input[name="childAge_${idx}"]:checked`);
          const age = ageRadio ? ageRadio.value : "0-5";

          if (!first || !last) {
            missingChild = true;
            if (!first) firstInput?.focus();
            else lastInput?.focus();
          } else {
            childrenList.push(`${first} ${last}`.trim() + ` (Idade ${age})`);
          }
        });

        if (missingChild) {
          alert("Por favor, preencha o primeiro nome e apelido de todas as crianças.");
          return;
        }
      }
    } else {
      // Validar quem não comparece
      const firstInput = document.getElementById("decliningFirstName");
      const lastInput = document.getElementById("decliningLastName");
      const first = firstInput?.value.trim() || "";
      const last = lastInput?.value.trim() || "";

      if (!first) {
        firstInput?.focus();
        alert("Por favor, preencha o seu primeiro nome.");
        return;
      }
      if (!last) {
        lastInput?.focus();
        alert("Por favor, preencha o seu apelido.");
        return;
      }

      primaryDisplayName = `${first} ${last}`.trim();
    }

    const dietRestrictions = document.getElementById("dietRestrictions")?.value.trim() || "Nenhuma";
    const songRequest = document.getElementById("songRequest")?.value.trim() || "";
    const guestNotes = document.getElementById("guestNotes")?.value.trim() || "";

    // Payload estruturado
    const payload = {
      timestamp: new Date().toISOString(),
      attendance: isAttending ? "Sim" : "Não",
      adultsCount: isAttending ? adultsList.length : 0,
      adultsNames: isAttending ? adultsList.join(", ") : primaryDisplayName,
      childrenCount: isAttending ? childrenList.length : 0,
      childrenDetails: isAttending ? childrenList.join("; ") : "N/A",
      dietRestrictions: isAttending ? dietRestrictions : "N/A",
      songRequest: isAttending ? songRequest : "N/A",
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
        console.warn("RSVP: Google Sheets URL não configurado em config.js. A simular envio:", payload);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      // Sucesso! Mostrar Cartão de Confirmação
      showSuccess(isAttending, primaryDisplayName, adultsList.length, childrenList.length);
    } catch (err) {
      console.error("Erro ao enviar RSVP:", err);
      alert("Houve um problema ao guardar a resposta. Por favor tente novamente.");
    } finally {
      setLoadingState(false);
    }
  }

  function setLoadingState(isLoading) {
    if (!btnSubmit) return;
    btnSubmit.disabled = isLoading;
    if (isLoading) {
      btnSubmit.classList.add("btn-loading");
      if (btnSubmitText) btnSubmitText.textContent = "A guardar resposta...";
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
        summary += `A confirmação para o vosso grupo (${adultsCount} adulto${adultsCount > 1 ? "s" : ""}${childrenCount > 0 ? `, ${childrenCount} criança${childrenCount > 1 ? "s" : ""}` : ""}) foi registada na lista com sucesso.`;
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
