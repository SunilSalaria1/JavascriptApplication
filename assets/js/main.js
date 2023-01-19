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


/* ======= post register form data and validations ======= */

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
        if (userFirstName === "" || userFirstName === null) {
            document.getElementById("requiredNameField").innerText = "This is a required field.";
            document.getElementById("firstName").style.borderColor = "red";
        }
        if (userEmail === "" || userEmail === null) {
            document.getElementById("requiredEmailField").innerText = "This is a required field.";
            document.getElementById("email").style.borderColor = "red";
        }
        if (userProfession === "" || userProfession === null || userProfession === "Select your Role") {
            document.getElementById("requiredProfessionField").innerText = "This is a required field.";
            document.getElementById("profession").style.borderColor = "red";
        }
        if (userPassword === "" || userPassword === null) {
            document.getElementById("requiredPasswordField").innerText = "This is a required field.";
            document.getElementById("password").style.borderColor = "red";
        }
        if (userConfirmPassword === "" || userConfirmPassword === null) {
            document.getElementById("requiredConfirmField").innerText = "This is a required field.";
            document.getElementById("confirmPassword").style.borderColor = "red";
        }
        if (userFirstName.length > 0 && userEmail.length > 0 && userProfession.length > 0 && userPassword.length > 0 && userConfirmPassword.length > 0) {
            let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (userEmail.match(validEmail)) {
                document.getElementById("requiredEmailField").innerText = "";
                document.getElementById("requiredPasswordField").innerText = "";
                if (userPassword === userConfirmPassword) {
                    if (userProfession !== "" && userProfession !== null && userProfession !== "Select your Role") {
                        document.getElementById("requiredProfessionField").innerText = "";
                        document.getElementById("profession").style.borderColor = "#ced4da";
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
                            document.getElementById("loginSuccessToast").classList.replace("hide", "show");
                        })
                            .catch(function (error) {
                                console.log(`Error:`, error);
                                alert("error is");
                                document.getElementById("loginErrorToast").classList.replace("hide", "show");
                            })
                    }
                }
                else {
                    document.getElementById("passwordNotMatched").classList.remove("d-none");
                }
            }
            else {
                document.getElementById("requiredEmailField").innerText = "Please include @ in the email address.";
            }
        }
    });
    // input firstname keydown
    document.getElementById("firstName").addEventListener('keydown', function () {
        document.getElementById("requiredNameField").innerText = "";
        document.getElementById("firstName").style.borderColor = "#ced4da";
    })

    // input email keydown
    document.getElementById("email").addEventListener('keydown', function () {
        document.getElementById("requiredEmailField").innerText = "";
        document.getElementById("email").style.borderColor = "#ced4da";
    })

    // select field click
    let professionVal = document.getElementById("profession");
    professionVal.addEventListener('click', function () {
        if (professionVal.value !== "" && professionVal.value !== null && professionVal.value !== "Select your Role") {
            document.getElementById("requiredProfessionField").innerText = "";
            document.getElementById("profession").style.borderColor = "#ced4da";
        }
    })

    // input password keydown
    document.getElementById("password").addEventListener('keydown', function () {
        document.getElementById("requiredPasswordField").innerText = "";
        document.getElementById("password").style.borderColor = "#ced4da";
    })
    // input confirm keydown
    document.getElementById("confirmPassword").addEventListener('keydown', function () {
        document.getElementById("requiredConfirmField").innerText = "";
        document.getElementById("confirmPassword").style.borderColor = "#ced4da";
    })

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
let checkTable = document.querySelectorAll("#tableBody").length;
if (checkTable !== 0) {
    fetch('http://localhost:3004/user')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let tableData = "";
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
}

/* ======= get and match login form data with validations ======= */

let checkLogin = document.querySelectorAll("#loginForm").length;
if (checkLogin !== 0) {

    // login form submit
    document.getElementById("loginForm").addEventListener('submit', function (event) {
        event.preventDefault();
        let userLoginEmail = document.getElementById("loginEmail").value;
        let userLoginPassword = document.getElementById("loginPassword").value;
        if (userLoginEmail === "" || userLoginEmail === null) {
            document.getElementById("requiredEmailField").innerText = "This is a required field.";
            document.getElementById("loginEmail").style.borderColor = "red";
        }
        if (userLoginPassword === "" || userLoginPassword === null) {
            document.getElementById("requiredPasswordField").innerText = "This is a required field.";
            document.getElementById("loginPassword").style.borderColor = "red";
        }
        if (userLoginEmail.length > 0 && userLoginPassword.length > 0) {
            let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (userLoginEmail.match(validEmail)) {
                document.getElementById("requiredEmailField").innerText = "";
                document.getElementById("requiredPasswordField").innerText = "";
                fetch('http://localhost:3004/user').then(function (response) {
                    return response.json();
                }).then(function (data) {
                    for (let i = 0; i < data.length; i++) {
                        if (userLoginEmail == data[i].email && userLoginPassword == data[i].password) {
                            document.getElementById("loginSuccessToast").classList.replace("hide", "show");
                            setTimeout(function () {
                                window.location.href = "/index.html"
                            }, 1000)
                            return;
                        }
                    }
                    document.getElementById("loginErrorToast").classList.replace("hide", "show");
                })
            }
            else {
                document.getElementById("requiredEmailField").innerText = "Please include @ in the email address.";
            }
        }
    }
    );

    // input email keydown
    document.getElementById("loginEmail").addEventListener('keydown', function () {
        document.getElementById("requiredEmailField").innerText = "";
        document.getElementById("loginEmail").style.borderColor = "#ced4da";
    })

    // input password keydown
    document.getElementById("loginPassword").addEventListener('keydown', function () {
        document.getElementById("requiredPasswordField").innerText = "";
        document.getElementById("loginPassword").style.borderColor = "#ced4da";
    })
}

/* ======= edit form data ======= */

let checkEdit = document.querySelectorAll("#editForm").length;
if (checkEdit !== 0) {
    // update button
    document.getElementById("editForm").addEventListener('submit', function (event) {
        event.preventDefault();
        document.getElementById("editSuccessToast").classList.replace("hide", "show");
    })
    // cancel button
    document.getElementById("editCancel").addEventListener('click', function () {
        window.location.href = "/index.html";
    })
}