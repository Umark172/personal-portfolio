
// ==============================
// Mobile Navigation
// ==============================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.setAttribute("aria-label", "Toggle navigation");
menuToggle.setAttribute("aria-expanded", "false");
menuToggle.setAttribute("aria-controls", "nav-links");

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
});


// Close mobile menu when a navigation link is clicked

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// ==============================
// Active Navigation Highlight
// ==============================

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

function highlightNavigation() {

    let currentSection = "home";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 150) {

            currentSection = section.id;
        }
    });

    // Highlight Contact when the user reaches the page bottom

    if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 5
    ) {
        currentSection = "contact";
    }

    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {

            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", highlightNavigation, {
    passive: true
});

highlightNavigation();


// ==============================
// Project Filtering
// ==============================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.setAttribute(
        "aria-pressed",
        button.classList.contains("active")
    );

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        const filter = button.dataset.filter;

        projectCards.forEach(card => {

            const category = card.dataset.category;

            if (filter === "all" || category === filter) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");
            }
        });
    });
});


// ==============================
// Project Information
// ==============================

const projects = {

    // Project 1: ByteBuilder

    bytebuilder: {

        title: "ByteBuilder",

        description:
            "ByteBuilder is an AI-assisted full-stack web " +
            "application designed to simplify the process of " +
            "building a custom PC. The application allows users " +
            "to search for computer components, select hardware, " +
            "customize their builds, and check hardware " +
            "compatibility. It uses Python and FastAPI for backend " +
            "API endpoints, JavaScript and Vite for the frontend, " +
            "and Google Gemini with Model Context Protocol (MCP) " +
            "for AI integration. The project explores full-stack " +
            "development, API integration, artificial intelligence, " +
            "and communication between frontend and backend systems."
    },


    // Project 2: Personal Portfolio

    portfolio: {

        title: "Personal Portfolio",

        description:
            "A responsive personal portfolio website developed " +
            "using HTML, CSS, and vanilla JavaScript. The website " +
            "showcases academic background, technical skills, " +
            "software development projects, and contact information. " +
            "It features a modern dark-themed interface, responsive " +
            "navigation, interactive project filtering, project " +
            "detail popups, and clipboard functionality. The " +
            "project demonstrates frontend development, responsive " +
            "design, and DOM manipulation."
    },


    // Project 3: Minesweeper

    minesweeper: {

        title: "Minesweeper",

        description:
            "A recreation of the classic Minesweeper puzzle game. " +
            "The project focuses on grid-based programming, mine " +
            "placement, neighboring cell calculations, game logic, " +
            "and managing win and loss conditions. It demonstrates " +
            "the application of programming fundamentals, " +
            "algorithmic thinking, and problem-solving skills " +
            "through interactive game mechanics."
    },


    // Project 4: Maze Solver

    maze: {

        title: "Maze Solver",

        description:
            "A C++ programming project focused on navigating " +
            "a maze using data structures and algorithms. " +
            "The project explores pathfinding, tracking visited " +
            "locations, handling obstacles, and identifying " +
            "valid routes through a maze. It demonstrates " +
            "algorithmic problem-solving, logical reasoning, " +
            "and the practical application of computer " +
            "science fundamentals."
    }
};


// ==============================
// Project Details Popup
// ==============================

const modal = document.getElementById("project-modal");

const modalTitle = document.getElementById("modal-title");

const modalDescription =
    document.getElementById("modal-description");

const closeModal = document.getElementById("close-modal");

const projectLinks = document.querySelectorAll(".project-link");

modal.setAttribute("aria-labelledby", "modal-title");
modal.setAttribute("aria-describedby", "modal-description");


// Open popup when a project button is clicked

projectLinks.forEach(button => {

    button.addEventListener("click", () => {

        const projectName = button.dataset.project;

        const project = projects[projectName];

        if (project) {

            modalTitle.textContent = project.title;

            modalDescription.textContent = project.description;

            modal.showModal();
        }
    });
});


// Close popup using X button

closeModal.addEventListener("click", () => {

    modal.close();
});


// Close popup when clicking outside

modal.addEventListener("click", event => {

    if (event.target === modal) {

        modal.close();
    }
});


// ==============================
// Copy Email Address
// ==============================

const copyEmail = document.getElementById("copy-email");

const email = "alex.morgan@example.com";

let copyTimeout;

copyEmail.setAttribute("aria-live", "polite");

copyEmail.addEventListener("click", async () => {

    clearTimeout(copyTimeout);

    try {

        await navigator.clipboard.writeText(email);

        copyEmail.textContent = "Email Copied!";

    } catch (error) {

        copyEmail.textContent = "Unable to copy";
    }

    copyTimeout = setTimeout(() => {

        copyEmail.textContent = "Copy Email";

    }, 2000);
});


// ==============================
// Automatically Update Footer Year
// ==============================

const year = document.getElementById("year");

year.textContent = new Date().getFullYear();


// ==============================
// Close Mobile Menu on Escape
// ==============================

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
    }
});
