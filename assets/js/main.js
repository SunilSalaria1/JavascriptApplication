/* =================================================== */
/* common js file */
/* =================================================== */

/* ======= global page loader ======= */

function loader() {
    document.getElementById("pageLoader").classList.add("d-none");
}
setTimeout(loader, 1000);

/* ======= toggle menu ======= */

document.getElementById("asideToggleBtn").addEventListener('click', menuToggle);
function menuToggle() {
    document.querySelector("aside").classList.toggle("aside-hide");
    document.querySelector("main").classList.toggle("main-full");
}

/* ======= active nav links ======= */
let asideLink = document.querySelector("aside");
asideLink.querySelectorAll(".nav-link").forEach(function (link) {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});


