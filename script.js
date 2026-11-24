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

  const problems = [
    {
      title: "Know your water. Plan with confidence.",
      text: "We begin with a site review and water audit to understand current sources, demand and opportunities."
    },
    {
      title: "Give rainwater a better route.",
      text: "We look at drainage, runoff, site levels and the rainfall picture before recommending flood-management interventions."
    },
    {
      title: "Understand what is happening underground.",
      text: "We study groundwater conditions and check where recharge measures may be feasible for your site."
    },
    {
      title: "Make water responsibilities easier to manage.",
      text: "We review the relevant water information, documentation and monitoring needs before helping plan practical steps."
    },
    {
      title: "Turn water ambition into a realistic roadmap.",
      text: "We help define the baseline, opportunities and evidence needed for responsible water-neutrality and stewardship plans."
    },
    {
      title: "Fix the problem, not just the symptom.",
      text: "We investigate the performance of existing systems, identify likely gaps and recommend improvements that fit their use."
    }
  ];
  const answerHeading = document.getElementById("answer-heading");
  const answerDetail = document.getElementById("answer-detail");
  document.querySelectorAll(".problem-item").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.problem);
      const item = problems[index];
      if (!item) return;
      document.querySelectorAll(".problem-item").forEach(el => {
        el.classList.remove("active");
        el.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
      answerHeading.textContent = item.title;
      answerDetail.textContent = item.text;
    });
  });
  document.querySelector('.problem-item.active')?.setAttribute("aria-pressed", "true");

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

  const dialog = document.getElementById("article-dialog");
  document.getElementById("read-article")?.addEventListener("click", () => {
    if (typeof dialog?.showModal === "function") dialog.showModal();
  });
  document.getElementById("close-article")?.addEventListener("click", () => dialog?.close());
  document.getElementById("article-contact")?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
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
