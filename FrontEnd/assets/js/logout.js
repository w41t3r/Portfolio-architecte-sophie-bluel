import { loggedUser } from "./functions.js"

if (loggedUser()) {
    document.getElementById('logout__button').addEventListener('click', function () {
        sessionStorage.removeItem('token');
        window.location.href = "./index.html";
    })
}