import "./style.css";

/* Mobile menu */
const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelector("#navLinks");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuButton.classList.toggle("active", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.classList.remove("active");
      menuButton.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

/* FAQ accordion */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector("button");
  const icon = button.querySelector("span");

  button.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faq) => {
      faq.classList.remove("active");
      faq.querySelector("button").setAttribute("aria-expanded", "false");
      faq.querySelector("button span").textContent = "+";
    });

    if (!isActive) {
      item.classList.add("active");
      button.setAttribute("aria-expanded", "true");
      icon.textContent = "−";
    }
  });
});

/* Reveal animation */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => revealObserver.observe(element));

/* WhatsApp form */
const quoteForm = document.querySelector("#quoteForm");
const companyWhatsappNumber = "21655092613";

function cleanText(value) {
  return value.trim().replace(/\s+/g, " ");
}

function formatDate(dateValue) {
  if (!dateValue) return "Non précisée";

  const [year, month, day] = dateValue.split("-");
  return `${day}/${month}/${year}`;
}

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = cleanText(document.querySelector("#name").value);
    const phone = cleanText(document.querySelector("#phone").value);
    const service = document.querySelector("#service").value;
    const date = document.querySelector("#date").value;
    const message = document.querySelector("#message").value.trim();

    if (!name || !phone || !service) {
      alert("Merci de remplir le nom, le téléphone et le service.");
      return;
    }

    const whatsappMessage = `Bonjour NB Security,
Je souhaite demander un devis gratuit.

Nom: ${name}
Téléphone: ${phone}
Service: ${service}
Date souhaitée: ${formatDate(date)}
Message: ${message || "Non précisé"}

Merci.`;

    const whatsappUrl = `https://wa.me/${companyWhatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}
/* Counter animation */
const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {
  const target = Number(counter.dataset.target);
  const duration = 1400;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * target);

    counter.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => counterObserver.observe(counter));
/* Header background on scroll */
const header = document.querySelector(".header");

if (header) {
  window.addEventListener("scroll", () => {
    header.style.background =
      window.scrollY > 20 ? "rgba(5, 7, 11, 0.9)" : "rgba(5, 7, 11, 0.72)";
  });
}