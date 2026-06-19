let events = [
    {
        id: crypto.randomUUID(),
        name: "Tech Conference",
        date: "2026-07-15",
        description: "Technology event for developers."
    },
    {
        id: crypto.randomUUID(),
        name: "Web Development Workshop",
        date: "2026-08-20",
        description: "Learn modern web development."
    },
    {
        id: crypto.randomUUID(),
        name: "AI Work shop",
        date: "2025-01-10",
        description: "Completed seminar."
    }
];

const eventsContainer = document.getElementById("eventsContainer");
const eventForm = document.getElementById("eventForm");
const warning = document.getElementById("warning");
const searchInput = document.getElementById("searchInput");

/* RENDER EVENTS */
function renderEvents(list) {
    eventsContainer.innerHTML = "";

    const sorted = [...list].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    sorted.forEach(event => {
        const isPast = new Date(event.date) < new Date();

        const card = document.createElement("div");
        card.className = `event-card ${isPast ? "past" : ""}`;

        card.innerHTML = `
            ${isPast ? `<div class="tag">PAST SEMINAR — time is gone</div>` : ""}

            <h3>${event.name}</h3>
            <p><b>Date:</b> ${event.date}</p>
            <p>${event.description}</p>

            <button class="delete-btn" onclick="removeEvent('${event.id}')">
                Delete
            </button>
        `;

        eventsContainer.appendChild(card);
    });
}

/* DELETE EVENT */
function removeEvent(id) {
    events = events.filter(event => event.id !== id);
    renderEvents(events);
}

/* ADD EVENT */
eventForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("eventName").value.trim();
    const date = document.getElementById("eventDate").value;
    const description = document.getElementById("eventDescription").value.trim();

    if (!name || !date || !description) {
        warning.textContent = "⚠ Please fill all fields.";
        return;
    }

    warning.textContent = "";

    events.push({
        id: crypto.randomUUID(),
        name,
        date,
        description
    });

    eventForm.reset();
    renderEvents(events);
});

/* SEARCH */
searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = events.filter(event =>
        event.name.toLowerCase().includes(value) ||
        event.date.includes(value)
    );

    renderEvents(filtered);
});

/* INIT */
renderEvents(events);