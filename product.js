/* =====================================================
   SECUREFENCE PRODUCTS PAGE INTERACTIONS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    const rtlToggle = document.getElementById("rtlToggle");
    const rtlText = document.getElementById("rtlText");

    const homeDropdown = document.getElementById("desktopHomeDropdown");
    const homeDropdownBtn = document.getElementById("homeDropdownBtn");

    const mobileToggle = document.getElementById("mobileToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileIcon = document.getElementById("mobileIcon");

    const year = document.getElementById("currentYear");

    const newsletterForm = document.getElementById("newsletterForm");
    const newsletterMessage = document.getElementById("newsletterMessage");

    /* LIGHT / DARK THEME */
    function setTheme(theme) {
        root.dataset.theme = theme;

        const dark = theme === "dark";

        themeIcon.className = dark
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";

        themeToggle.setAttribute(
            "aria-label",
            dark ? "Switch to light mode" : "Switch to dark mode"
        );

        themeToggle.title = dark
            ? "Switch to light mode"
            : "Switch to dark mode";
    }

    setTheme(root.dataset.theme === "dark" ? "dark" : "light");

    themeToggle?.addEventListener("click", () => {
        const nextTheme =
            root.dataset.theme === "dark" ? "light" : "dark";

        setTheme(nextTheme);
    });

    /* RTL / LTR DIRECTION */
    rtlToggle?.addEventListener("click", () => {
        const nextDir = root.dir === "rtl" ? "ltr" : "rtl";

        root.dir = nextDir;

        rtlText.textContent = nextDir === "rtl" ? "LTR" : "RTL";

        rtlToggle.setAttribute(
            "aria-label",
            nextDir === "rtl"
                ? "Switch to left-to-right direction"
                : "Switch to right-to-left direction"
        );

        rtlToggle.title = nextDir === "rtl"
            ? "Switch to LTR"
            : "Switch to RTL";
    });

    /* HOME DROPDOWN */
    homeDropdownBtn?.addEventListener("click", (event) => {
        event.stopPropagation();

        const isOpen = homeDropdown.classList.toggle("open");

        homeDropdownBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });

    document.addEventListener("click", (event) => {
        if (homeDropdown && !homeDropdown.contains(event.target)) {
            homeDropdown.classList.remove("open");

            homeDropdownBtn?.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    });

    /* ESCAPE KEY */
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            homeDropdown?.classList.remove("open");

            homeDropdownBtn?.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileMenu?.classList.remove("open");

            mobileToggle?.setAttribute(
                "aria-expanded",
                "false"
            );

            if (mobileIcon) {
                mobileIcon.className = "fa-solid fa-bars";
            }
        }
    });

    /* MOBILE NAVIGATION */
    mobileToggle?.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("open");

        mobileToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        mobileToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        mobileIcon.className = isOpen
            ? "fa-solid fa-xmark"
            : "fa-solid fa-bars";
    });

    mobileMenu?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");

            mobileToggle?.setAttribute(
                "aria-expanded",
                "false"
            );

            if (mobileIcon) {
                mobileIcon.className = "fa-solid fa-bars";
            }
        });
    });

    /* CURRENT COPYRIGHT YEAR */
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    /* NEWSLETTER DEMO */
    newsletterForm?.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!newsletterForm.reportValidity()) {
            return;
        }

        if (newsletterMessage) {
            newsletterMessage.textContent =
                "Thank you for subscribing! Connect a newsletter service to store subscriptions.";
        }

        newsletterForm.reset();
    });
});