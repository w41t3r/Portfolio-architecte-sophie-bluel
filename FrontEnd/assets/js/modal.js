import { generateTag } from "./functions.js"
import { loggedUser } from "./functions.js"

const worksUrl = "http://127.0.0.1:5678/api/works";

fetch(worksUrl)
    .then(response => response.json())
    .then(response => {
        allWorksData = response;
    });

// !!!!!!! A DEBUGGER fonction logout !!!!!!! \\
if (loggedUser()) {
    document.getElementById('login__button').remove();
    const linksContainer = document.querySelectorAll('nav ul li');
    let linkTag = document.createElement('a');
    linkTag.innerText = "logout";
    linkTag.id = "logout__button";
    linksContainer[2].appendChild(linkTag);
    // BOUTON MODIFIER 

    generateTag("#portfolio h2", "div", "update__button_container", 0, 0, 0);
    generateTag("#portfolio h2", "button", "update__button", "Modifier", 0, 0);
    generateTag("#portfolio .update__button", "i", "fa-regular fa-pen-to-square update__logo", 0, 0, 0);

    let updateButton = document.querySelector('#portfolio .update__button');

    updateButton.addEventListener('click', function (e) {
        e.preventDefault();
        createModal();
    })
}

function createModal() {
    if (document.querySelector('.modal') !== null) return;
    else {
        const modalContainer = document.querySelector('body');
        const firstElement = document.querySelector('header');
        let modal = document.createElement('div');
        modal.className = 'modal';
        modalContainer.insertBefore(modal, firstElement);
        fillModale();
    }
}

function fillModale() {
    generateTag("body .modal", "div", "modal__content", 0, 0, 0);
    generateTag("body .modal__content", "i", "fa-solid fa-xmark modal__close__logo", "Fermer la modal", 0, 0);
    generateTag("body .modal__content", "h3", "modal__title", "Galerie photo", 0, 0);
    generateTag("body .modal__content", "div", "modal__selector", 0, 0, 0);
    for (i = 0; i < allWorksData.length; i++) {

        ///////////////////////////
        console.log(`I = ${i}`);

        generateTag("body .modal__selector", "div", "modal__item__container", 0, 0, 0);
        let itemsContainer = document.querySelectorAll('.modal__item__container');

        if (i === 0) {
            generateTag("body .modal__item__container", "div", "move__logo__container", 0, 0, 0);
            console.log("1");
            let moveLogoContainer = document.querySelector('.modal__item__container > div:last-child');
            console.log("2");
            moveLogoContainer.innerHTML = "<i class=\"fa-solid fa-up-down-left-right move__logo\"></i>";
            itemsContainer[i].appendChild(moveLogoContainer);
            console.log("3");
        }

        generateTag("body .modal__item__container", "div", "trash__logo__container", 0, 0, 0);

        let trashLogoContainer = document.querySelector('.modal__item__container > div:last-child');
        trashLogoContainer.innerHTML = "<i class=\"fa-regular fa-trash-can trash__logo\"></i>";
        itemsContainer[i].appendChild(trashLogoContainer);


        generateTag("body .modal__item__container", "img", "modal__item", 0, 0, 0);

        let imageTag = document.querySelector('.modal__item__container > img:last-child');
        imageTag.src = allWorksData[i].imageUrl;
        itemsContainer[i].appendChild(imageTag);

        generateTag("body .modal__item__container", "p", "modal__item__txt", 0, 0, 0);

        let textTag = document.querySelector('.modal__item__container > p:last-child');
        textTag.innerText = "éditer";
        itemsContainer[i].appendChild(textTag);

    }

    generateTag("body .modal__content", "div", "modal__line", 0, 0, 0);

    generateTag("body .modal__content", "button", "button modal__add__btn", "Ajouter une photo", 0, 0);
    generateTag("body .modal__content", "button", "modal__delete__btn", "Supprimer la galerie", 0, 0);
    


    closeModal();
}

function closeModal() {
    document.querySelector('.modal__close__logo').addEventListener('click', function (e) {
        e.preventDefault;
        document.querySelector('.modal').remove();
    })
}
