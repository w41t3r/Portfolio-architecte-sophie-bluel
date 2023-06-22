const loginUrl = "http://127.0.0.1:5678/api/users/login";
/***** Login form management *****/
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
function getLoginInfo() {
    const loginEmail = document.getElementById("email").value;
    const loginPwd = document.getElementById("password").value;
    console.log(loginEmail);
    console.log(loginPwd);
    getLoginResponse(loginEmail, loginPwd);

}

function getLoginResponse(loginEmail, loginPwd) {

    console.log("GET LOGIN INFO");

    const loginInfo = {
        name: loginEmail,
        password: loginPwd
    };

    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(loginInfo)
    };
    console.log("BEFORE FETCH");
    fetch(loginUrl, fetchOptions)
        .then(response => response.status())
        .then(result => {
            //console.log("rLogin = result;");
            console.log("STATUS CODE = " + result + "")
            rLogin = result;
            for (i = 0; i < rLogin.length; i++) {
                console.log("RESULT = ");
                console.log(rLogin[i]);
            }
        });
    console.log("END FETCH");
}

/***** End login form management *****/