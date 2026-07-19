function initContract() {
  const display = document.getElementById("ca-display");
  const copyBtn = document.getElementById("copy-ca");
  const toast = document.getElementById("copy-toast");
  if (!display || !copyBtn || !toast) return;

  const address = display.textContent.trim();

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(address);
      copyBtn.classList.add("copied");
      copyBtn.querySelector("span").textContent = "Copied!";
      toast.textContent = "Contract address copied!";
      toast.classList.add("show");

      setTimeout(() => {
        copyBtn.classList.remove("copied");
        copyBtn.querySelector("span").textContent = "Copy";
        toast.classList.remove("show");
      }, 2500);
    } catch {
      toast.textContent = "Copy failed — select and copy manually.";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2500);
    }
  });
}

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  const header = document.querySelector(".site-header");
  if (!toggle || !links || !header) return;

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initReveals() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((el) => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
  );

  nodes.forEach((el) => io.observe(el));
}

function initMemeLightbox() {
  const lightbox = document.getElementById("meme-lightbox");
  if (!lightbox) return;

  const img = lightbox.querySelector(".lightbox-img");
  const caption = lightbox.querySelector(".lightbox-caption");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  const close = () => {
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    img.src = "";
    img.alt = "";
    caption.textContent = "";
  };

  document.querySelectorAll(".meme-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.dataset.full;
      const text = btn.dataset.caption || "";
      const thumb = btn.querySelector("img");
      img.src = src;
      img.alt = thumb ? thumb.alt : text;
      caption.textContent = text;
      caption.hidden = !text;
      lightbox.hidden = false;
      document.body.classList.add("lightbox-open");
    });
  });

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) close();
  });
}

function initSparks() {
  const field = document.getElementById("spark-field");
  if (!field) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  const count = window.innerWidth < 700 ? 14 : 28;
  const kinds = ["", "gold", "red", "", "", "gold"];

  for (let i = 0; i < count; i++) {
    const spark = document.createElement("span");
    spark.className = "spark " + (kinds[i % kinds.length] || "");
    const size = 2 + Math.random() * 5;
    spark.style.width = size + "px";
    spark.style.height = size + "px";
    spark.style.left = Math.random() * 100 + "%";
    spark.style.bottom = "-8px";
    spark.style.animationDuration = 7 + Math.random() * 14 + "s";
    spark.style.animationDelay = Math.random() * 12 + "s";
    field.appendChild(spark);
  }
}

function initLogoParallax() {
  const banner = document.querySelector(".hero-banner");
  if (!banner) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || window.innerWidth < 769) return;

  let ticking = false;
  window.addEventListener(
    "pointermove",
    (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        banner.style.translate = `${x}px ${y}px`;
        ticking = false;
      });
    },
    { passive: true }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  initContract();
  initNav();
  initReveals();
  initMemeLightbox();
  initSparks();
  initLogoParallax();
});
