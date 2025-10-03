document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".portfolio-grid");
    let iso;

    fetch("graphics.json")
        .then(res => res.json())
        .then(data => {
            data.forEach(item => {
                const div = document.createElement("div");
                div.className = `portfolio-item ${item.category}`;
                div.innerHTML = `
                    <a href="${item.src}" class="glightbox" data-gallery="portfolio"
                       data-title="<br>${item.description}<br><em>${item.date}</em>">
                        <img src="${item.src}" alt="${item.category}">
                    </a>
                    <div class="caption">${item.description}</div>
                `;
                grid.appendChild(div);
            });

            // Wait until images are loaded before initializing Isotope
            imagesLoaded(grid, function () {
                iso = new Isotope(grid, {
                    itemSelector: ".portfolio-item",
                    layoutMode: "masonry",
                    masonry: {gutter: 15},
                    transitionDuration: 1  // adjust duration, or '0s' for instant
                });
            });

            // Initialize GLightbox
            GLightbox({ selector: ".glightbox" });

            // Filter buttons
            document.querySelectorAll(".filter-btn").forEach(btn => {
                btn.addEventListener("click", function () {
                    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
                    this.classList.add("active");
                    const filterValue = this.getAttribute("data-filter");
                    iso.arrange({ filter: filterValue });
                });
            });
        })
        .catch(err => console.error("Error loading graphics.json:", err));
});
