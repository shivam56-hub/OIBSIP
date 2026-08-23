document.addEventListener("DOMContentLoaded", () => {
    const accordion = document.querySelector(".accordion-btn");
    const panel = document.querySelector(".panel");

    // Click event to toggle the quote panel animation
    accordion.addEventListener("click", () => {
        accordion.classList.toggle("active");
        
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            accordion.textContent = "Show Famous Quote";
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            accordion.textContent = "Hide Famous Quote";
        }
    });
});