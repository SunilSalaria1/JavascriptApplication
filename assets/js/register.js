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
                            document.getElementById("registerSuccessToast").classList.remove("d-none");
                        })
                            .catch(function (error) {
                                console.log(`Error:`, error);
                                alert("error is");
                                document.getElementById("registerErrorToast").classList.remove("d-none");
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