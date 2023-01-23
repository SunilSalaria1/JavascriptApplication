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
let checkToggle = document.querySelectorAll("#asideToggleBtn").length;
if (checkToggle !== 0) {
    let accountName = localStorage.getItem('LoggedInUserName');
    let accountProfession = localStorage.getItem('LoggedInUserProfession');
    document.querySelector('#profileName').innerHTML = accountName;
    document.querySelector('#profileDesignation').innerHTML = accountProfession;
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
                            method: 'POST',
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
                            document.getElementById("loginSuccessToast").classList.replace("hide", "show");
                            console.log('Success:', data);
                        }).catch(function (error) {
                            console.log(`Error:`, error);
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

/* ======= get data from api and construct table ======= */

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
            // click on edit and go to edit page
            document.getElementById("tableBody").innerHTML = tableData;
            document.getElementById("tableBody").addEventListener('click', function (e) {
                e.preventDefault();
                let currentUserId = e.target.parentElement.id;
                let targetElement = e.target.parentElement;
                let getUserId = (targetElement.parentElement.parentElement).children[0].innerText;
                const url = "http://localhost:3004/user";
                fetch(`${url}/${getUserId}`).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    localStorage.setItem('editUserId', data.id);
                    if (currentUserId == "editUser") {
                        window.location.href = "/edit.html"
                    }
                })
            });
            // click on delete and delete a particular record
            document.getElementById("tableBody").innerHTML = tableData;
            document.getElementById("tableBody").addEventListener('click', function (e) {
                e.preventDefault();
                let currentUserId = e.target.parentElement.id;
                console.log(currentUserId);
                let targetElement = e.target.parentElement;
                let getUserId = (targetElement.parentElement.parentElement).children[0].innerText;
                if (currentUserId == "deletePopup") {
                    document.querySelector('#deletePopupShow').classList.remove('d-none');
                    document.querySelector('#deleteUserDetails').addEventListener('click', function() {
                        const url = "http://localhost:3004/user";
                        fetch(`${url}/${getUserId}`, {
                            method: 'DELETE',
                        }).then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            document.getElementById("deleteSuccessToast").classList.replace("hide", "show");
                            console.log(data);
                        })
                    });
                    document.querySelector('#canceldeletePopup').addEventListener('click', function () {
                        document.querySelector('#deletePopupShow').classList.add('d-none');
                    })
                }
            });
        });
}


/* ======= update data of edit form ======= */
let checkEditForm = document.querySelectorAll("#editForm").length;
if (checkEditForm !== 0) {

    // get data from database and fill in edit form
    let getlocalUserId = localStorage.getItem('editUserId');
    const url = "http://localhost:3004/user";
    fetch(`${url}/${getlocalUserId}`).then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log(data);
        document.querySelector('#firstName').value = data.firstName;
        document.querySelector('#lastName').value = data.lastName;
        document.querySelector('#email').value = data.email;
        document.querySelector('#profession').value = data.profession;
        document.querySelector('#phoneNumber').value = data.phoneNumber;
        document.querySelector('#password').value = data.password;
        document.querySelector('#confirmPassword').value = data.confirmPassword;
        // replace the data in database on clicking update button
        document.getElementById("editForm").addEventListener('submit', function (event) {
            event.preventDefault();
            fetch(`${url}/${getlocalUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: document.querySelector('#firstName').value,
                    lastName: document.querySelector('#lastName').value,
                    email: document.querySelector('#email').value,
                    profession: document.querySelector('#profession').value,
                    phoneNumber: document.querySelector('#phoneNumber').value,
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                document.getElementById("editSuccessToast").classList.replace("hide", "show");
                window.location.href = "/index.html";
            })
        })

    })
}

/* ======= edit form data button clicks ======= */

// let checkEdit = document.querySelectorAll("#editForm").length;
// if (checkEdit !== 0) {

//     document.getElementById("editForm").addEventListener('submit', function (event) {
//         event.preventDefault();
//         fetch('http://localhost:3004/user', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 firstName: userFirstName,
//                 lastName: userLastName,
//                 email: userEmail,
//                 profession: userProfession,
//                 phoneNumber: userPhoneNumber,
//                 password: userPassword,
//                 confirmPassword: userConfirmPassword
//             })
//         })
//         document.getElementById("editSuccessToast").classList.replace("hide", "show");
//     })

//     document.getElementById("editCancel").addEventListener('click', function () {
//         window.location.href = "/index.html";
//     })
// }





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
                            localStorage.setItem('LoggedInUserName', data[i].firstName);
                            localStorage.setItem('LoggedInUserProfession', data[i].profession);
                            setTimeout(function () {
                                window.location.href = "/index.html";
                            }, 1000)
                            console.log(data[i]);
                            return data[i];
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