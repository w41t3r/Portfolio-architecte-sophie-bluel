/***** Login form management *****/

const loginUrl = "http://127.0.0.1:5678/api/users/login";

/*
function getLoginInfo() {
    console.log("GET INFO");
    let loginEmail = document.forms["RegForm"]["email"];
    let loginPwd = document.forms["RegForm"]["password"];
    console.log(loginEmail);
    console.log(loginPwd);
    return true;
}
*/

const loginForm = document.querySelector('.login__form');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    getLoginInfo(event);
});



function getLoginInfo(event) {
    const loginEmail = event.target.querySelector("[name=email]").value;
    const loginPwd = event.target.querySelector("[name=password]").value;
    getLoginResponse(loginEmail, loginPwd);
}

function getLoginResponse(loginEmail, loginPwd) {

    const loginInfo = {
        email: loginEmail,
        password: loginPwd
    };

    const fetchOptions = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(loginInfo)
    };
    fetch(loginUrl, fetchOptions)
        .then(response => {
            console.log(response.status);
            if (response.status !== 200) {
                window.location.href = "./login.html";
                alert("/!\\ Email ou mot de passe incorrect /!\\");
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        })
        .then(responseLogin => {
            sessionStorage.setItem("token", responseLogin.token);
            window.location.href = "./index.html";
            alert("Connexion reussi");
        });
}

/***** End login form management *****/