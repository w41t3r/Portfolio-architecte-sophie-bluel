import { loggedUser } from "./functions.js"

document.getElementById('logout__button').addEventListener('onclick', function (e) {
//    e.preventDefault();
    console.log(e);
    console.log("LOGOUT CLICKED");
    if (loggedUser()) {
        sessionStorage.removeItem('token');
    }
})