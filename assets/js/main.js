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
let checkToggle = document.querySelectorAll("asideToggleBtn").length;
if (checkToggle !== 0) {
    document.querySelector("#asideToggleBtn").addEventListener('click', menuToggle);
    function menuToggle() {
        document.querySelector("aside").classList.toggle("aside-hide");
        document.querySelector("main").classList.toggle("main-full");
    }
}

/* ======= active nav links ======= */
let checkAside = document.querySelectorAll("aside").length;
if (checkAside !== 0) {
    let asideLink = document.querySelector("aside");
    asideLink.querySelectorAll(".nav-link").forEach(function (link) {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });
}


/* ======= show and hide delete popup ======= */
let checkDeletePopup = document.querySelectorAll("deletePopup").length;

if (checkDeletePopup !== 0) {
    // show the delete toast
    document.getElementById("deletePopup").addEventListener('click', showdeletePopup);
    function showdeletePopup() {
        document.getElementById("deletePopupShow").classList.remove('d-none');
    }

    // hide the delete popup
    document.getElementById("closedeletePopup").addEventListener('click', hidedeletePopup);
    function hidedeletePopup() {
        document.getElementById("deletePopupShow").classList.add('d-none');
    }

}


/* ======= post register form data with single pair values ======= */

let checkRegister = document.querySelectorAll("#registerForm").length;
if (checkRegister !== 0) {

    // post register form data with single pair values

    document.getElementById("registerForm").addEventListener('submit', function (event) {
        event.preventDefault();
        let userFirstName = document.querySelector('#firstName').value;
        let userLastName = document.querySelector('#lastName').value;
        let userEmail = document.querySelector('#email').value;
        let userProfession = document.querySelector('#profession').value;
        let userPhoneNumber = document.querySelector('#phoneNumber').value;
        let userPassword = document.querySelector('#password').value;
        let userConfirmPassword = document.querySelector('#confirmPassword').value;

        fetch('http://localhost:3004/user', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: userFirstName,
                lastName: userLastName,
                email: userEmail,
                profession: userProfession,
                phoneNumber: userPhoneNumber,
                password: userPassword,
                confirmPassword: userConfirmPassword
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('Success:', data);
            document.getElementById("registerSuccessToast").classList.remove("d-none");
            debugger
        }).catch(function (error) {
            console.log(`Error:`, error);
            alert("error is");
            document.getElementById("registerErrorToast").classList.remove("d-none");
        })
    });

    // post register form data with object

    // document.getElementById("registerForm").addEventListener('submit', function (event) {
    //     event.preventDefault();
    //     let registerData = new FormData(this);
    //     let printData = Object.fromEntries(registerData);

    //     fetch('http://localhost:3004/user', {
    //         method: 'post',
    //         headers:{
    //             'Content-Type':'application/json'
    //         },
    //         body: JSON.stringify(printData)
    //     })
    // });
}

/* ======= get data from api ======= */

fetch('http://localhost:3004/user')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let tableData = " ";
        data.forEach(function (userData) {
        tableData += `<tr>
        <th scope="row">${userData.id}</th>
        <td>${userData.firstName}</td>
        <td>${userData.lastName}</td>
        <td>${userData.email}</td>
        <td>${userData.profession}</td>
        <td>${userData.phoneNumber}</td>
        <td>${document.getElementById("actionButtons").innerHTML}</td>
        </tr>`
        });
        document.getElementById("tableBody").innerHTML = tableData;
    })

