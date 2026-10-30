
/* =====================================================
   SECUREFENCE - MAIN.JS
   Active Navigation + Theme + RTL + Mobile Menu
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const htmlRoot = document.documentElement;

    /* ================= CURRENT PAGE ================= */
    let currentPage =
        window.location.pathname.split("/").pop().toLowerCase();

    if (!currentPage || currentPage === "/") {
        currentPage = "index.html";
    }

    const homePages = ["index.html", "home2.html"];

    /* ================= ACTIVE NAVIGATION ================= */
    const homeDropdown = document.getElementById("desktopHomeDropdown");
    const homeButton = document.getElementById("homeDropdownBtn");
    const desktopMenu = document.getElementById("desktopHomeMenu");

    const isHomePage = homePages.includes(currentPage);

    // Home remains active on index.html and home2.html
    if (homeButton) {
        homeButton.classList.toggle("active", isHomePage);

        if (isHomePage) {
            homeButton.setAttribute("aria-current", "page");
        } else {
            homeButton.removeAttribute("aria-current");
        }

        homeButton.setAttribute("aria-expanded", "false");
    }

    // Other desktop navigation links
    document.querySelectorAll(".nav-menu a.nav-link").forEach(function (link) {
        const linkPage = (link.getAttribute("href") || "")
            .split("/")
            .pop()
            .toLowerCase();

        const isActive = linkPage === currentPage;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    // Highlight Home 1 or Home 2 inside the dropdown
    if (desktopMenu) {
        desktopMenu.querySelectorAll("a").forEach(function (link) {
            const linkPage = (link.getAttribute("href") || "")
                .split("/")
                .pop()
                .toLowerCase();

            if (linkPage === currentPage) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    // Mobile navigation active state
    document.querySelectorAll(".mobile-nav-list a").forEach(function (link) {
        const linkPage = (link.getAttribute("href") || "")
            .split("/")
            .pop()
            .toLowerCase();

        const isActive = linkPage === currentPage;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    /* ================= HOME DROPDOWN ================= */
    function closeHomeDropdown() {
        if (!homeDropdown || !homeButton) return;

        homeDropdown.classList.remove("open");
        homeButton.setAttribute("aria-expanded", "false");

        // Preserve active Home state on both home pages
        homeButton.classList.toggle(
            "active",
            homePages.includes(currentPage)
        );
    }

    if (homeDropdown && homeButton) {
        homeButton.addEventListener("click", function (event) {
            event.stopPropagation();

            const isOpen = homeDropdown.classList.toggle("open");

            homeButton.setAttribute("aria-expanded", String(isOpen));
        });

        if (desktopMenu) {
            desktopMenu.addEventListener("click", function (event) {
                event.stopPropagation();
            });
        }

        document.addEventListener("click", function (event) {
            if (!homeDropdown.contains(event.target)) {
                closeHomeDropdown();
            }
        });
    }
    

    /* ================= MOBILE MENU ================= */
    const mobileToggle = document.getElementById("mobileToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileIcon = document.getElementById("mobileIcon");

    function closeMobileMenu() {
        if (!mobileToggle || !mobileMenu) return;

        mobileMenu.classList.remove("show");
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.setAttribute("aria-label", "Open navigation");

        if (mobileIcon) {
            mobileIcon.className = "fa-solid fa-bars";
        }
    }

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener("click", function (event) {
            event.stopPropagation();

            const isOpen = mobileMenu.classList.toggle("show");

            mobileToggle.setAttribute("aria-expanded", String(isOpen));
            mobileToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            if (mobileIcon) {
                mobileIcon.className = isOpen
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";
            }
        });

        mobileMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMobileMenu);
        });

        document.addEventListener("click", function (event) {
            if (
                mobileMenu.classList.contains("show") &&
                !mobileMenu.contains(event.target) &&
                !mobileToggle.contains(event.target)
            ) {
                closeMobileMenu();
            }
        });
    }

    /* ================= THEME TOGGLE ================= */
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    function updateThemeButton(theme) {
        if (!themeToggle || !themeIcon) return;

        if (theme === "dark") {
            themeIcon.className = "fa-solid fa-sun";
            themeToggle.setAttribute("aria-label", "Switch to light mode");
            themeToggle.setAttribute("title", "Switch to light mode");
        } else {
            themeIcon.className = "fa-solid fa-moon";
            themeToggle.setAttribute("aria-label", "Switch to dark mode");
            themeToggle.setAttribute("title", "Switch to dark mode");
        }
    }

    if (themeToggle && themeIcon) {
        updateThemeButton(htmlRoot.getAttribute("data-theme") || "light");

        themeToggle.addEventListener("click", function () {
            const currentTheme =
                htmlRoot.getAttribute("data-theme") || "light";

            const newTheme =
                currentTheme === "light" ? "dark" : "light";

            htmlRoot.setAttribute("data-theme", newTheme);
            updateThemeButton(newTheme);
        });
    }

    /* ================= RTL / LTR TOGGLE ================= */
    const rtlToggle = document.getElementById("rtlToggle");
    const rtlText = document.getElementById("rtlText");

    function updateDirectionButton(direction) {
        if (!rtlToggle || !rtlText) return;

        rtlText.textContent = direction === "rtl" ? "LTR" : "RTL";

        rtlToggle.setAttribute(
            "aria-label",
            direction === "rtl"
                ? "Switch to left-to-right direction"
                : "Switch to right-to-left direction"
        );

        rtlToggle.setAttribute(
            "title",
            direction === "rtl" ? "Switch to LTR" : "Switch to RTL"
        );
    }

    if (rtlToggle && rtlText) {
        updateDirectionButton(htmlRoot.getAttribute("dir") || "ltr");

        rtlToggle.addEventListener("click", function () {
            const currentDirection =
                htmlRoot.getAttribute("dir") || "ltr";

            const newDirection =
                currentDirection === "rtl" ? "ltr" : "rtl";

            htmlRoot.setAttribute("dir", newDirection);
            updateDirectionButton(newDirection);
        });
    }

    /* ================= HEADER SCROLL SHADOW ================= */
    const siteHeader = document.getElementById("siteHeader");

    function updateHeaderShadow() {
        if (!siteHeader) return;

        siteHeader.classList.toggle("scrolled", window.scrollY > 10);
    }

    updateHeaderShadow();

    window.addEventListener("scroll", updateHeaderShadow, {
        passive: true
    });

    /* ================= ESCAPE KEY ================= */
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeHomeDropdown();
            closeMobileMenu();
        }
    });
});

/* HOME DROPDOWN CLICK FIX */

document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.getElementById("desktopHomeDropdown");
    const button = document.getElementById("homeDropdownBtn");
    const menu = document.getElementById("desktopHomeMenu");

    if (!dropdown || !button || !menu) {
        console.warn("Home dropdown elements were not found.");
        return;
    }

    button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const isOpen = dropdown.classList.toggle("open");
        button.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("open");
            button.setAttribute("aria-expanded", "false");
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            dropdown.classList.remove("open");
            button.setAttribute("aria-expanded", "false");
            button.focus();
        }
    });
});

