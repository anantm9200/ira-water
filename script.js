"use strict";

(function () {
  document.documentElement.classList.add("has-js");

  const header = document.getElementById("site-header");
  const trigger = document.getElementById("menu-trigger");
  const menu = document.getElementById("mobile-menu");
  const close = document.getElementById("menu-close");
  const main = document.getElementById("main");
  const footer = document.querySelector(".site-footer");
  let priorFocus = null;

  function openMenu() {
    priorFocus = document.activeElement;
    menu.hidden = false;
    document.body.classList.add("menu-open");
    trigger.setAttribute("aria-expanded", "true");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    header?.setAttribute("inert", "");
    close.focus();
  }
  function closeMenu() {
    menu.hidden = true;
    document.body.classList.remove("menu-open");
    trigger.setAttribute("aria-expanded", "false");
    main?.removeAttribute("inert");
    footer?.removeAttribute("inert");
    header?.removeAttribute("inert");
    (priorFocus instanceof HTMLElement ? priorFocus : trigger).focus({ preventScroll: true });
  }
  trigger?.addEventListener("click", openMenu);
  close?.addEventListener("click", closeMenu);
  menu?.querySelectorAll('nav a').forEach(link => {
    link.addEventListener("click", () => { closeMenu(); });
  });
  document.addEventListener("keydown", event => {
    if (menu?.hidden === false) {
      if (event.key === "Escape") { closeMenu(); return; }
      if (event.key === "Tab") {
        const focusables = Array.from(menu.querySelectorAll('a[href],button:not([disabled])')).filter(el => el.getClientRects().length > 0);
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
  });

  const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Buyer challenge -> desired outcome. Labels follow the supplied reference.
  const briefProblems = [
    ["Water availability","We assess your sources, demand and opportunities to improve water availability."],
    ["Flood mitigation","We review site drainage, runoff and flood exposure before designing suitable controls."],
    ["Sustainable groundwater availability","We assess aquifer conditions and the feasibility of groundwater recharge."],
    ["Compliance & continuity","We help review NOCAP / CGWA requirements and supporting water records for the site."],
    ["Measurable progress","We define the baseline and evidence needed to plan for water neutrality."],
    ["Effective water management","We investigate existing systems and plan practical improvements."],
    ["Credible sustainability performance","We help connect water activity with appropriate ESG / BRSR evidence."]
  ];
  document.querySelectorAll("[data-brief-problem]").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.briefProblem);
      const choice = briefProblems[index];
      if (!choice) return;
      document.querySelectorAll("[data-brief-problem]").forEach(el => {
        const active = el === button;
        el.classList.toggle("active", active);
        el.setAttribute("aria-pressed", String(active));
      });
      document.getElementById("problem-output").textContent = choice[0];
      document.getElementById("problem-description").textContent = choice[1];
      const photos = [
        ["photo-1501785888041-af3ef285b470","Water availability and natural water systems"],
        ["photo-1433086966358-54859d0ed716","Fast-flowing water and rainfall runoff"],
        ["photo-1500534623283-312aade485b7","Water catchment landscape and local terrain"],
        ["photo-1581092580497-e0d23cbdf1dc","Engineer examining infrastructure"],
        ["photo-1518837695005-2083093ee35b","Water resources and conservation"],
        ["photo-1504307651254-35680f356dfd","Infrastructure improvement works"],
        ["photo-1497366754035-f200968a6e72","Organisational sustainability planning"]
      ];
      const illustration = document.getElementById("problem-photo");
      if (illustration && photos[index]) {
        illustration.src = "https://images.unsplash.com/" + photos[index][0] + "?auto=format&fit=crop&w=1000&q=82";
        illustration.alt = "Illustrative stock photograph: " + photos[index][1];
      }
    });
  });

  document.querySelectorAll("[data-service-filter]").forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.serviceFilter;
      document.querySelectorAll("[data-service-filter]").forEach(el => {
        const active = el === button;
        el.classList.toggle("active", active);
        el.setAttribute("aria-pressed", String(active));
      });
      document.querySelectorAll("[data-service]").forEach(card => {
        card.hidden = filter !== "all" && card.dataset.service !== filter;
      });
    });
  });

  const caseMedia = document.getElementById("case-media");
  document.querySelectorAll("[data-case-view]").forEach(button => {
    button.addEventListener("click", () => {
      const mode = button.dataset.caseView;
      if (!["compare", "before", "after"].includes(mode)) return;
      caseMedia.dataset.view = mode;
      document.querySelectorAll("[data-case-view]").forEach(el => {
        const active = el === button;
        el.classList.toggle("active", active);
        el.setAttribute("aria-pressed", String(active));
      });
    });
  });

  const roofInput = document.getElementById("roof-area");
  const rainfallInput = document.getElementById("annual-rain");
  const result = document.getElementById("rain-result");
  function updateCalculator() {
    const roof = Number(roofInput?.value), rain = Number(rainfallInput?.value);
    if (!Number.isFinite(roof) || !Number.isFinite(rain) || roof <= 0 || rain <= 0 || roof > 10000000 || rain > 5000) {
      result.textContent = "Enter valid values";
      return;
    }
    const liters = Math.round(roof * rain * 0.8);
    result.textContent = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(liters) + " L";
  }
  roofInput?.addEventListener("input", updateCalculator);
  rainfallInput?.addEventListener("input", updateCalculator);
  document.getElementById("rain-calculator")?.addEventListener("submit", e => e.preventDefault());
  updateCalculator();

  // Homepage lead CTA: no backend exists at this stage, so never claim
  // that merely entering an email has scheduled or sent a booking.
  document.getElementById("hero-demo")?.addEventListener("submit", event => {
    event.preventDefault();
    const field = document.getElementById("hero-work-email");
    if (!field?.reportValidity()) return;
    const email = field.value.trim();
    const subject = encodeURIComponent("Ira Water — schedule a demo");
    const body = encodeURIComponent("Hello Ira Water team,\n\nPlease arrange a demo or consultation.\n\nMy work email: " + email + "\n\nThank you.");
    const status = document.getElementById("hero-demo-status");
    if (status) status.textContent = "Your email application will open. Please send the prepared message to request a demo.";
    window.location.href = "mailto:info@irawater.com?subject=" + subject + "&body=" + body;
  });

  const form = document.getElementById("enquiry-form");
  form?.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const sector = String(data.get("sector") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = "Ira Water website enquiry — " + (company || name);
    const body = [
      "Hello Ira Water team,", "",
      "I would like to discuss a water-related requirement.", "",
      "Name: " + name,
      "Work email: " + email,
      "Organisation: " + (company || "Not provided"),
      "Sector: " + (sector || "Not selected"), "",
      "Water requirement:", message, "",
      "Please get in touch to discuss next steps."
    ].join("\n");
    const status = document.getElementById("form-status");
    status.textContent = "Your email application will open with this enquiry. Please press Send there to deliver it to Ira Water.";
    window.location.href = "mailto:info@irawater.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  });

  const solutionsDialog = document.getElementById("solutions-dialog");
  document.getElementById("view-all-solutions")?.addEventListener("click", () => {
    if (typeof solutionsDialog?.showModal === "function") solutionsDialog.showModal();
  });
  document.getElementById("close-solutions")?.addEventListener("click", () => solutionsDialog?.close());
  document.getElementById("solutions-contact")?.addEventListener("click", () => solutionsDialog?.close());
  solutionsDialog?.addEventListener("click", event => {
    if (event.target === solutionsDialog) solutionsDialog.close();
  });

  function wireDialog(name, openerId, closerId) {
    const modal = document.getElementById(name);
    document.getElementById(openerId)?.addEventListener("click", () => modal?.showModal?.());
    document.getElementById(closerId)?.addEventListener("click", () => modal?.close());
    modal?.addEventListener("click", event => {
      if (event.target === modal) modal.close();
    });
    return modal;
  }
  const projectsDialog = wireDialog("projects-dialog", "view-projects", "close-projects");
  const aboutDialog = wireDialog("about-dialog", "view-about", "close-about");
  [projectsDialog,aboutDialog].forEach(modal => modal?.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener("click", () => modal.close())));
  document.querySelectorAll("[data-audience-choice]").forEach(link => {
    link.addEventListener("click", () => {
      const choice = link.dataset.audienceChoice;
      document.querySelector('[data-brief-problem="' + choice + '"]')?.click();
    });
  });

  const galleryDialog = wireDialog("gallery-dialog", "view-gallery", "close-gallery");
  const diyDialog = wireDialog("diy-dialog", "view-diy", "close-diy");
  galleryDialog?.querySelectorAll("a[href^='#']").forEach(link => link.addEventListener("click", () => galleryDialog.close()));
  diyDialog?.querySelectorAll("a[href^='#']").forEach(link => link.addEventListener("click", () => diyDialog.close()));
  document.getElementById("diy-open-guide")?.addEventListener("click", () => {
    diyDialog?.close();
    document.getElementById("article-dialog")?.showModal?.();
  });

  const dialog = document.getElementById("article-dialog");
  document.getElementById("read-article")?.addEventListener("click", () => {
    if (typeof dialog?.showModal === "function") dialog.showModal();
  });
  document.getElementById("close-article")?.addEventListener("click", () => dialog?.close());
  document.getElementById("article-contact")?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  // The approved client marks live on Ira's existing site. If that host
  // blocks a logo, show the real company name rather than a broken image.
  document.querySelectorAll(".client-logo").forEach(logo => {
    const picture = logo.querySelector("img");
    if (!picture) return;
    const showFallback = () => logo.classList.add("is-missing");
    picture.addEventListener("error", showFallback);
    if (picture.complete && picture.naturalWidth === 0) showFallback();
  });

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -35px 0px" });
    document.querySelectorAll("[data-reveal]").forEach(node => observer.observe(node));
  } else {
    document.querySelectorAll("[data-reveal]").forEach(node => node.classList.add("is-visible"));
  }

  if ("IntersectionObserver" in window) {
    const links = Array.from(document.querySelectorAll(".desktop-nav a"));
    const sections = links.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const current = entry.target.id;
        links.forEach(link => link.classList.toggle("is-active", link.getAttribute("href") === "#" + current));
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));
  }
})();
