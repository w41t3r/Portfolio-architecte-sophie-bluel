import { generateTag } from "./functions.js"
import { loggedUser } from "./functions.js"

const worksUrl = "http://127.0.0.1:5678/api/works";
let allWorksData;

fetch(worksUrl)
    .then(response => response.json())
    .then(response => {
        allWorksData = response;
    });


if (loggedUser()) {
    document.querySelector('#portfolio div.filter').remove();
    document.getElementById('login__button').remove();
    const linksContainer = document.querySelectorAll('nav ul li');
    let linkTag = document.createElement('a');
    linkTag.href = "";
    linkTag.innerText = "logout";
    linkTag.id = "logout__button";
    linksContainer[2].appendChild(linkTag);
    // BOUTON MODIFIER 

    generateTag("#portfolio h2 ", "i", "fa-regular fa-pen-to-square update__logo", 0, 0, 0, 0, 0);
    generateTag("#portfolio h2 ", "button", "update__button", "modifier", 0, 0, 0, 0);

    let updateButton = document.querySelector('#portfolio .update__button');

    updateButton.addEventListener('click', function (e) {
        e.preventDefault();
        createModal();
        //        fillModale("DELETE ITEM");
        fillModale("ADD ITEM");
    })
}

function createModal() {
    if (document.querySelector('.modal') !== null) return;
    else {
        const modalContainer = document.querySelector('body');
        const firstElement = document.querySelector('header');
        let modal = document.createElement('div');
        modal.className = 'modal';
        modal.ariaModal = "true";
        modalContainer.insertBefore(modal, firstElement);
    }
}

function fillModale(modal) {
    if (modal === "DELETE ITEM") {
        generateTag("body .modal", "div", "modal__content", 0, 0, 0, 0, 0);
        generateTag("body .modal__content", "i", "fa-solid fa-xmark modal__close__logo", 0, 0, "<span class=\"modal__close__txt\">Fermer la modal</span>", 0, 0);
        generateTag("body .modal__content", "h3", "modal__title", "Galerie photo", 0, 0, 0, 0);
        generateTag("body .modal__content", "div", "modal__selector", 0, 0, 0, 0, 0);

        displayAllWorksInModal(allWorksData);
        generateTag("body .modal__content", "div", "modal__line", 0, 0, 0, 0, 0);
        generateTag("body .modal__content", "button", "button modal__add__btn", "Ajouter une photo", 0, 0, 0, 0);
        generateTag("body .modal__content", "button", "modal__delete__btn", "Supprimer la galerie", 0, 0, 0, 0);

        const trashsLogo = document.querySelectorAll('.trash__logo');
        for (let i = 0; i < trashsLogo.length; i++) {
            trashsLogo[i].addEventListener('click', function (e) {
                trashsLogo[i].classList.toggle('trash__logo--selected');
            })
        }
        document.querySelector('.modal__close__logo').addEventListener('click', closeModal);
        document.querySelector('.modal__add__btn').addEventListener('click', displayAddItem);
        document.querySelector('.modal__delete__btn').addEventListener('click', deleteItem);
    }
    if (modal === "ADD ITEM") {
        generateTag("body .modal", "div", "modal__content__add", 0, 0, 0, 0, 0);
        generateTag("body .modal__content__add", "i", "fa-solid fa-arrow-left-long modal__arrow__logo", 0, 0, 0, 0, 0);
        generateTag("body .modal__content__add", "i", "fa-solid fa-xmark modal__close__logo", 0, 0, "<span class=\"modal__close__txt\">Fermer la modal</span>", 0, 0);
        generateTag("body .modal__content__add", "h3", "modal__title", "Ajout photo", 0, 0, 0, 0);

        //AJOUT FORM
        generateTag("body .modal__content__add", "form", "modal__form", 0, 0, 0, 0, 0);
        /////////////////

        generateTag("body .modal__form", "div", "modal__img__container", 0, 0, 0, 0, 0);
        generateTag("body .modal__img__container", "i", "fa-solid fa-mountain-sun fa-flip-horizontal modal__img__logo", 0, 0, 0, 0, 0);
        generateTag("body .modal__img__container", "label", "button modal__img__add__label", "+ Ajouter photo", 0, 0, 0, "file__upload");

        generateTag("body .modal__img__container", "input", 0, 0, "file__upload", 0, "file", 0);
        generateTag("body .modal__img__container", "img", 0, 0, "img__upload", 0, 0, 0);


        generateTag("body .modal__img__container", "p", "modal__img__txt", "jpg.png : 4mo max", 0, 0, 0, 0);


        generateTag("body .modal__form", "label", "modal__title__work", "Titre", 0, 0, 0, "modal__title__input");
        generateTag("body .modal__form", "input", 0, 0, "modal__title__input", 0, 0, 0);
        generateTag("body .modal__form", "label", "modal__category__work", "Catégorie", 0, 0, 0, "modal__category__select");
        generateTag("body .modal__form", "select", 0, 0, "modal__category__select", 0, 0, 0);
        generateTag("body .modal__form #modal__category__select", "option", "option__category", "Objets", 0, 0, 0, 0);
        generateTag("body .modal__form #modal__category__select", "option", "option__category", "Appartements", 0, 0, 0, 0);
        generateTag("body .modal__form #modal__category__select", "option", "option__category", "Hotels & restaurants", 0, 0, 0, 0);
        generateTag("body .modal__form", "div", "modal__line__add", 0, 0, 0, 0, 0);
        generateTag("body .modal__form", "button", "button modal__validate__btn", "Valider", 0, 0, 0, 0);

        document.getElementById('file__upload').addEventListener('change', (e) => {
            let that = e.currentTarget;
            console.log(`1`)
            if (that.files && that.files[0]) {
                console.log(`IF`)
//                that.next('custom-file-label').html(that.files[0].name);
                let reader = new FileReader();
                reader.onload = (e) => {
                    document.getElementById('img__upload').setAttribute('src', e.target.result);
                    document.getElementById('img__upload').classList.add('selected');
                }
                reader.readAsDataURL(that.files[0]);
            }
        });

        document.querySelector('.modal__close__logo').addEventListener('click', closeModal);
    }
}

function displayAddItem(e) {
    e.preventDefault;
    document.querySelector('.modal__add__btn').removeEventListener('click', displayAddItem);
}

function deleteItem(e) {
    e.preventDefault();
    //    const token = sessionStorage.getItem('token');
    console.log(`FUNCTION DELETE ITEM`);
    const itemsContainer = document.querySelectorAll('.modal__item__container');
    const itemsToDelete = document.querySelectorAll('.trash__logo--selected');
    for (let i = 0; i < itemsToDelete.length; i++) {
        let elementId = itemsToDelete[i].getAttribute('id');
        itemsContainer[elementId - 1].remove();
        console.log(`Element : ${elementId} deleted`);
        fetchDelete(elementId);
    }

}

function fetchDelete(elementId) {
    const token = sessionStorage.getItem('token');
    fetch(worksUrl + '/' + elementId, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + token
        },
    });
}

function closeModal(e) {
    e.preventDefault;
    document.querySelector('.modal__close__logo').removeEventListener('click', closeModal);
    document.querySelector('.modal').remove();
}

function displayAllWorksInModal(allWorksData) {

    /*    if (document.querySelector('.modal__item__container') !== null) {
            document.querySelector('.modal__item__container').remove();
        }
    */
    for (i = 0; i < allWorksData.length; i++) {
        let elementId = allWorksData[i].id;
        generateTag("body .modal__selector", "div", "modal__item__container", 0, elementId, 0, 0, 0);
        let itemsContainer = document.querySelectorAll('.modal__item__container');

        if (i === 0) {
            generateTag("body .modal__item__container", "div", "move__logo__container", 0, 0, 0, 0, 0);
            let moveLogoContainer = document.querySelector('.modal__item__container > div:last-child');
            moveLogoContainer.innerHTML = "<i class=\"fa-solid fa-up-down-left-right move__logo\"></i>";
            itemsContainer[i].appendChild(moveLogoContainer);
        }

        generateTag("body .modal__item__container", "div", "trash__logo__container", 0, 0, 0, 0, 0);
        let trashLogoContainer = document.querySelector('.modal__item__container > div:last-child');
        trashLogoContainer.innerHTML = `<i id="${elementId}" class="fa-regular fa-trash-can trash__logo"></i>`;
        itemsContainer[i].appendChild(trashLogoContainer);

        generateTag("body .modal__item__container", "img", "modal__item", 0, 0, 0, 0, 0);
        let imageTag = document.querySelector('.modal__item__container > img:last-child');
        imageTag.src = allWorksData[i].imageUrl;
        imageTag.id = elementId;
        itemsContainer[i].appendChild(imageTag);

        generateTag("body .modal__item__container", "p", "modal__item__txt", 0, 0, 0, 0, 0);
        let textTag = document.querySelector('.modal__item__container > p:last-child');
        textTag.innerText = "éditer";
        itemsContainer[i].appendChild(textTag);
    }
}