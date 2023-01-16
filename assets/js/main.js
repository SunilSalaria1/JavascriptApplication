/* =================================================== */
                 /* common js file */
/* =================================================== */

/* ======= global page loader ======= */

function loader() {
    document.getElementById("pageLoader").classList.add("d-none");
}
setTimeout(loader, 1000);

/* ======= toggle menu ======= */

document.getElementById("aside-toggle-btn").addEventListener('click', menuToggle);
function menuToggle() {
    document.querySelector("aside").classList.toggle("aside-hide");
    document.querySelector("main").classList.toggle("main-full");
}