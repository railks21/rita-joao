/**
 * CASAMENTO RITA & JOÃO - LÓGICA PRINCIPAL (main.js)
 * Navegação, animações de scroll, cópia de IBAN, FAQ e Lightbox.
 */

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileMenu();
  initScrollSpy();
  initRevealAnimations();
  initFaqAccordion();
  initClipboardButtons();
  initLightbox();
  applyConfigData();
});

/**
 * Efeito visual do Header ao fazer scroll
 */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/**
 * Menu móvel (Hambúrguer)
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link, .nav-cta");

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Fechar o menu ao clicar num dos links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
}

/**
 * Realce do menu de navegação de acordo com a secção visível
 */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
}

/**
 * Animações suaves de entrada ao fazer scroll (Intersection Observer)
 */
function initRevealAnimations() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

/**
 * Acordeão de Perguntas Frequentes (FAQ)
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Fechar outros se pretender comportamento acordeão único
      faqItems.forEach((other) => other.classList.remove("active"));

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

/**
 * Cópia de IBAN e MB WAY para a Área de Transferência
 */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll(".btn-copy");

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const targetEl = document.getElementById(targetId);

      if (!targetEl) return;

      const textToCopy = targetEl.textContent.trim();

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerHTML;
        btn.classList.add("copied");
        btn.innerHTML = `✓ Copiado!`;

        showToast(`${btn.getAttribute("data-label") || "Texto"} copiado para a área de transferência!`);

        setTimeout(() => {
          btn.classList.remove("copied");
          btn.innerHTML = originalText;
        }, 3000);
      }).catch((err) => {
        console.error("Erro ao copiar: ", err);
      });
    });
  });
}

/**
 * Visualizador de Imagens (Lightbox) para a Galeria
 */
function initLightbox() {
  const modal = document.getElementById("lightboxModal");
  const modalImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("lightboxClose");
  const galleryItems = document.querySelectorAll(".gallery-item img, .timeline-img");

  if (!modal || !modalImg) return;

  function openLightbox(src, alt) {
    if (!src) return;
    modalImg.src = src;
    modalImg.alt = alt || "Fotografia do Casamento";
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Clicar em qualquer cartão da Galeria de Fotos
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (img) {
        openLightbox(img.getAttribute("src"), img.getAttribute("alt"));
      }
    });
  });

  // Clicar em qualquer imagem ou cartão da Linha do Tempo
  document.querySelectorAll(".timeline-img-wrap, .timeline-img").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const img = el.tagName.toLowerCase() === "img" ? el : el.querySelector("img");
      if (img) {
        openLightbox(img.getAttribute("src"), img.getAttribute("alt"));
      }
    });
  });

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

/**
 * Notificação Toast Flutuante
 */
window.showToast = function (message) {
  let toast = document.getElementById("toastNotice");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastNotice";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
};

/**
 * Aplica os dados do ficheiro config.js à página caso estejam definidos
 */
function applyConfigData() {
  const config = window.WEDDING_CONFIG;
  if (!config) return;

  // Atualizar nomes e títulos
  if (config.couple) {
    document.querySelectorAll("[data-bind='couple.title']").forEach((el) => {
      el.textContent = config.couple.title;
    });
    document.querySelectorAll("[data-bind='couple.hashtag']").forEach((el) => {
      el.textContent = config.couple.hashtag;
    });
  }

  // Atualizar data
  if (config.event) {
    document.querySelectorAll("[data-bind='event.displayDate']").forEach((el) => {
      el.textContent = config.event.displayDate;
    });
    document.querySelectorAll("[data-bind='event.rsvpDeadline']").forEach((el) => {
      el.textContent = config.event.rsvpDeadline;
    });
  }

  // Atualizar dados bancários se existirem
  if (config.gifts) {
    const ibanEl = document.getElementById("ibanValue");
    if (ibanEl && config.gifts.iban) ibanEl.textContent = config.gifts.iban;

    const ibanHolderEl = document.getElementById("ibanHolder");
    if (ibanHolderEl && config.gifts.ibanHolder) ibanHolderEl.textContent = config.gifts.ibanHolder;

    const mbwayEl = document.getElementById("mbwayValue");
    if (mbwayEl && config.gifts.mbway) mbwayEl.textContent = config.gifts.mbway;
  }
}

