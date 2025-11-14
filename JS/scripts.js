/* SPA Router, Template engine, Form validation and localStorage persistence */
(function () {
  const ROUTES = {
    "/": "index.html",
    "/index": "index.html",
    "/projetos": "projetos.html",
    "/cadastro": "Cadastro.html",
  };

  function renderTemplate(tpl, data = {}) {
    return tpl.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => {
      return data[key] !== undefined ? data[key] : "";
    });
  }

  // Toast helper
  function showToast(message, type = "info", timeout = 4500) {
    const toastTpl =
      '<div class="toast" role="status" aria-live="polite">{{message}}</div>';
    const html = renderTemplate(toastTpl, { message });
    const container = document.createElement("div");
    container.innerHTML = html;
    const toast = container.firstChild;
    toast.style.display = "block";
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, timeout);
  }

  // Fetch HTML and replace <main class="container"> content
  async function loadPage(url, push = true) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Falha ao carregar: " + res.status);
      const text = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      const newMain = doc.querySelector("main.container");
      const curMain = document.querySelector("main.container");
      if (newMain && curMain) {
        curMain.innerHTML = newMain.innerHTML;
        // re-run any bindings for dynamic content
        initDynamic();
        if (push) history.pushState({ url }, "", url);
      } else {
        // fallback: full navigation
        window.location.href = url;
      }
    } catch (err) {
      console.error(err);
      showToast(
        "Erro ao carregar página. Abrindo a página normalmente.",
        "danger"
      );
      window.location.href = url;
    }
  }

  // Intercept internal link clicks
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href) return;
    // Only intercept same-origin HTML links
    if (href.endsWith(".html")) {
      e.preventDefault();
      loadPage(href);
    }
  });

  window.addEventListener("popstate", (e) => {
    const state = e.state;
    if (state && state.url) loadPage(state.url, false);
  });

  // Form validation and persistence
  function validateForm(form) {
    const errors = [];
    const data = {};
    // basic required fields
    const required = form.querySelectorAll("[required]");
    required.forEach((el) => {
      el.classList.remove("invalid");
      if (!el.value) {
        errors.push({ el, msg: "Campo obrigatório" });
        el.classList.add("invalid");
      }
    });

    // custom checks: age >= 16
    const nascimento = form.querySelector("#nascimento");
    if (nascimento && nascimento.value) {
      const dob = new Date(nascimento.value);
      const ageDif = Date.now() - dob.getTime();
      const ageDate = new Date(ageDif);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      if (age < 16) {
        errors.push({
          el: nascimento,
          msg: "É necessário ter ao menos 16 anos",
        });
        nascimento.classList.add("invalid");
      }
    }

    // CPF basic pattern check
    const cpf = form.querySelector("#cpf");
    if (cpf && cpf.value) {
      const cpfRe = /\d{3}\.\d{3}\.\d{3}-\d{2}/;
      if (!cpfRe.test(cpf.value)) {
        errors.push({ el: cpf, msg: "CPF em formato inválido" });
        cpf.classList.add("invalid");
      }
    }

    // telefone pattern
    const telefone = form.querySelector("#telefone");
    if (telefone && telefone.value) {
      const telRe = /\(\d{2}\) \d{4,5}-\d{4}/;
      if (!telRe.test(telefone.value)) {
        errors.push({ el: telefone, msg: "Telefone em formato inválido" });
        telefone.classList.add("invalid");
      }
    }

    // terms checkbox
    const termos = form.querySelector("#termos");
    if (termos && !termos.checked) {
      errors.push({ el: termos, msg: "Você precisa concordar com os termos" });
    }

    // collect simple data
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach((i) => {
      if (i.name) data[i.name] = i.type === "checkbox" ? i.checked : i.value;
    });

    return { valid: errors.length === 0, errors, data };
  }

  function saveVolunteer(data) {
    const key = "ms_volunteers";
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    arr.push(Object.assign({ createdAt: new Date().toISOString() }, data));
    localStorage.setItem(key, JSON.stringify(arr));
    return arr.length;
  }

  function bindVolunteerForm() {
    const form = document.querySelector(".volunteer-form");
    if (!form) return;
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const result = validateForm(form);
      // remove previous inline alerts
      const existingAlerts = form.querySelectorAll(".alert");
      existingAlerts.forEach((a) => a.remove());
      if (!result.valid) {
        // show errors inline
        result.errors.forEach(({ el, msg }) => {
          const alert = document.createElement("div");
          alert.className = "alert alert-danger";
          alert.textContent = msg;
          el.insertAdjacentElement("afterend", alert);
        });
        showToast("Corrija os campos destacados.", "danger");
        return;
      }
      // save
      const count = saveVolunteer(result.data);
      showToast(
        "Cadastro salvo com sucesso! Total de voluntários: " + count,
        "success"
      );
      form.reset();
    });
  }

  // Initialize dynamic bindings after content replaced
  function initDynamic() {
    // Basic accessibility helpers: keep mobile nav toggle aria-expanded in sync
    (function () {
      const navToggles = document.querySelectorAll(".nav-toggle");
      navToggles.forEach((input) => {
        const label = document.querySelector("label[for='" + input.id + "']");
        if (label) {
          label.setAttribute("role", "button");
          label.setAttribute("aria-controls", input.id + "-menu");
          // keep aria-expanded in sync
          input.addEventListener("change", () => {
            const expanded = input.checked ? "true" : "false";
            label.setAttribute("aria-expanded", expanded);
          });
        }
      });
    })();
  }

  // run at start
  document.addEventListener("DOMContentLoaded", () => {
    initDynamic();
  });
})();
