/* =================================================== */
                /* common js file */
/* =================================================== */

/* ======= global page loader ======= */

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        document.getElementById("pageLoader").classList.add("d-none");
    }
};

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

/* ======= show and hide delete popup ======= */

// show the delete toast
document.getElementById("deletePopup").addEventListener('click', showdeletePopup);

function showdeletePopup(){
   document.getElementById('deletePopupShow').classList.remove('d-none');
}

// hide the delete popup
document.getElementById("closedeletePopup").addEventListener('click', hidedeletePopup);
function hidedeletePopup(){
   document.getElementById('deletePopupShow').classList.add('d-none');
}
