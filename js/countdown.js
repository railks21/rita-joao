/**
 * CONTADOR DECRESCENTE (countdown.js)
 * Calcula e atualiza os dias, horas, minutos e segundos até ao casamento.
 */

document.addEventListener("DOMContentLoaded", () => {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const countdownTitleEl = document.querySelector(".countdown-title");

  // Ler data do ficheiro config.js ou usar data padrão
  const targetDateStr = (window.WEDDING_CONFIG && window.WEDDING_CONFIG.event && window.WEDDING_CONFIG.event.targetDate) 
    ? window.WEDDING_CONFIG.event.targetDate 
    : "2027-07-23T15:00:00";

  const targetDate = new Date(targetDateStr).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      if (countdownTitleEl) {
        countdownTitleEl.textContent = "É HOJE O GRANDE DIA!";
      }
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, "0");

    if (daysEl) daysEl.textContent = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minutesEl) minutesEl.textContent = pad(minutes);
    if (secondsEl) secondsEl.textContent = pad(seconds);
  }

  // Executar imediatamente e a cada 1 segundo
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

