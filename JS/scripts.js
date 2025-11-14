// Basic accessibility helpers for menu and submenu
(function () {
  // Toggle mobile nav aria-expanded
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

  // Submenu toggle for touch/mobile
  const submenuParents = document.querySelectorAll(".has-submenu");
  submenuParents.forEach((li) => {
    const toggleLink = li.querySelector(":scope > a");
    const submenu = li.querySelector(".submenu");
    if (!toggleLink || !submenu) return;

    // make submenu accessible
    toggleLink.setAttribute("aria-haspopup", "true");
    toggleLink.setAttribute("aria-expanded", "false");
    submenu.setAttribute("aria-hidden", "true");

    // Click toggles on touch devices
    toggleLink.addEventListener("click", (evt) => {
      const isMobile = window.matchMedia("(max-width: 899px)").matches;
      if (isMobile) {
        evt.preventDefault();
        const expanded = toggleLink.getAttribute("aria-expanded") === "true";
        toggleLink.setAttribute("aria-expanded", expanded ? "false" : "true");
        submenu.style.display = expanded ? "none" : "block";
        submenu.setAttribute("aria-hidden", expanded ? "true" : "false");
      }
    });

    // Close submenu if clicked outside
    document.addEventListener("click", (evt) => {
      if (!li.contains(evt.target)) {
        toggleLink.setAttribute("aria-expanded", "false");
        submenu.style.display = "";
        submenu.setAttribute("aria-hidden", "true");
      }
    });
  });
})();
