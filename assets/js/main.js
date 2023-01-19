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
        if (userPassword === userConfirmPassword) {
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
            }).catch(function (error) {
                console.log(`Error:`, error);
                alert("error is");
                document.getElementById("registerErrorToast").classList.remove("d-none");
            })
        }
        else {
            document.getElementById("passwordNotMatched").classList.remove("d-none");
        }
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
            if(userLoginEmail.match(validEmail)){
                document.getElementById("requiredEmailField").innerText="";
                document.getElementById("requiredPasswordField").innerText="";
                if (userLoginEmail.includes("@")) {
                    console.log("contains");
                } 
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
            else{
                document.getElementById("requiredEmailField").innerText = "Please include @ in the email address."; 
            }       
        }
    }
    );

    // input email keydown
    document.getElementById("loginEmail").addEventListener('keydown', function(){
        document.getElementById("requiredEmailField").innerText = "";
        document.getElementById("loginEmail").style.borderColor = "#ced4da";
    })

    // input password keydown
    document.getElementById("loginPassword").addEventListener('keydown', function(){
        document.getElementById("requiredPasswordField").innerText = "";
        document.getElementById("loginPassword").style.borderColor = "#ced4da";
    })
}
