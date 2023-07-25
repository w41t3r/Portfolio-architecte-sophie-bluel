import { generateTag } from "./functions.js"
import { loggedUser } from "./functions.js"

const worksUrl = "http://127.0.0.1:5678/api/works";
const token = sessionStorage.getItem('token');
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

    generateTag("#introduction figure", "i", "fa-regular fa-pen-to-square update__logo first__update__logo", 0, 0, 0, 0, 0);
    generateTag("#introduction figure", "button", "update__button", "modifier", 0, 0, 0, 0);

    //    generateTag("#introduction article", "i", "fa-regular fa-pen-to-square update__logo second__update__logo", 0, 0, 0, 0, 0);

    let buttonContainer = document.querySelector('#introduction article');
    let firstElement = document.querySelector('#introduction article h2');
    let secondUpdateButton = document.createElement('i');
    secondUpdateButton.className = 'fa-regular fa-pen-to-square update__logo second__update__logo';
    buttonContainer.insertBefore(secondUpdateButton, firstElement);
    generateTag("#introduction article .second__update__logo", "button", "update__button", "modifier", 0, 0, 0, 0);

    generateTag("#portfolio h2", "i", "fa-regular fa-pen-to-square update__logo  third__update__logo", 0, 0, 0, 0, 0);
    generateTag("#portfolio h2", "button", "update__button", "modifier", 0, 0, 0, 0);

    let updateButtons = document.querySelectorAll('.update__button');

    for (let i = 0; i < updateButtons.length; i++) {
        updateButtons[i].addEventListener('click', function (e) {
            e.preventDefault();
            createModal();
            if (i === 2) fillModale("DELETE ITEM");
            //        fillModale("ADD ITEM");
        })
    }
}

function createModal() {
    console.log(`CREATE MODAL`);
    if (document.querySelector('.modal') !== null) return;
    else {
        const firstElement = document.querySelector('header');
        const modalContainer = document.querySelector('body');
        let modalHeader = document.createElement('div');
        modalHeader.className = 'modal__header';
        modalContainer.insertBefore(modalHeader, firstElement)
        generateTag("body .modal__header", "i", "fa-regular fa-pen-to-square update__logo__header", 0, 0, 0, 0, 0);
        generateTag("body .modal__header", "p", "header__update__text", "Mode édition", 0, 0, 0, 0);
        generateTag("body .modal__header ", "button", "header__update__button", "publier les changements", 0, 0, 0, 0);

        
        let modal = document.createElement('div');
        modal.id = 'modal';
        modal.className = 'modal';
        modal.ariaModal = 'true';
        modal.role = 'dialog';
        modalContainer.insertBefore(modal, firstElement);

    }
}

function fillModale(modal) {
    console.log(`FILL MODAL`);
    if (modal === "DELETE ITEM") {
        generateTag("body .modal", "div", "modal__content__delete", 0, 0, 0, 0, 0);
        generateTag("body .modal__content__delete", "i", "fa-solid fa-xmark modal__close__logo", 0, 0, "<span class=\"modal__close__txt\">Fermer la modal</span>", 0, 0);
        generateTag("body .modal__content__delete", "h3", "modal__title", "Galerie photo", 0, 0, 0, 0);
        generateTag("body .modal__content__delete", "div", "modal__selector", 0, 0, 0, 0, 0);

        displayAllWorksInModal(allWorksData);
        generateTag("body .modal__content__delete", "div", "modal__line", 0, 0, 0, 0, 0);
        generateTag("body .modal__content__delete", "button", "button modal__add__btn", "Ajouter une photo", 0, 0, 0, 0);
        generateTag("body .modal__content__delete", "button", "modal__delete__btn", "Supprimer la galerie", 0, 0, 0, 0);

        const trashsLogo = document.querySelectorAll('.trash__logo');
        for (let i = 0; i < trashsLogo.length; i++) {
            trashsLogo[i].addEventListener('click', function (e) {
                trashsLogo[i].classList.toggle('trash__logo--selected');
            })
        }
        document.querySelector('.modal__close__logo').addEventListener('click', closeModal);
        document.querySelector('.modal__add__btn').addEventListener('click', displayAddModal);
        //        document.querySelector('.modal__add__btn').addEventListener('click', displayAddItem);
        document.querySelector('.modal__delete__btn').addEventListener('click', deleteItem);
    }
    if (modal === "ADD ITEM") {
        generateTag("body .modal", "div", "modal__content__add", 0, 0, 0, 0, 0);
        generateTag("body .modal__content__add", "i", "fa-solid fa-arrow-left-long modal__arrow__logo", 0, 0, 0, 0, 0);
        generateTag("body .modal__content__add", "i", "fa-solid fa-xmark modal__add__close__logo", 0, 0, "<span class=\"modal__close__txt\">Fermer la modal</span>", 0, 0);
        generateTag("body .modal__content__add", "h3", "modal__title", "Ajout photo", 0, 0, 0, 0);

        //AJOUT FORM
        generateTag("body .modal__content__add", "form", "modal__form", 0, 0, 0, 0, 0);
        /////////////////

        generateTag("body .modal__form", "div", "modal__img__container", 0, 0, 0, 0, 0);
        generateTag("body .modal__img__container", "i", "fa-solid fa-mountain-sun fa-flip-horizontal modal__img__logo", 0, 0, 0, 0, 0);
        generateTag("body .modal__img__container", "label", "button modal__img__add__label", "+ Ajouter photo", 0, 0, 0, "file__upload");

        generateTag("body .modal__img__container", "input", 0, 0, "file__upload", 0, "file", 0);
        generateTag("body .modal__img__container", "img", "img__hidden", 0, "img__upload", 0, 0, 0);


        generateTag("body .modal__img__container", "p", "modal__img__txt", "jpg.png : 4mo max", 0, 0, 0, 0);


        generateTag("body .modal__form", "label", "modal__title__work", "Titre", 0, 0, 0, "modal__title__input");
        generateTag("body .modal__form", "input", 0, 0, "modal__title__input", 0, 0, 0);
        generateTag("body .modal__form", "label", "modal__category__work", "Catégorie", 0, 0, 0, "modal__category__select");
        generateTag("body .modal__form", "select", 0, 0, "modal__category__select", 0, 0, 0);
        generateTag("body .modal__form #modal__category__select", "option", "option__category", "Objets", 0, 0, 0, 0);
        generateTag("body .modal__form #modal__category__select", "option", "option__category", "Appartements", 0, 0, 0, 0);
        generateTag("body .modal__form #modal__category__select", "option", "option__category", "Hotels & restaurants", 0, 0, 0, 0);
        generateTag("body .modal__form", "div", "modal__line__add", 0, 0, 0, 0, 0);
        generateTag("body .modal__form", "button", "button modal__upload__btn", "Valider", "upload__btn", 0, "submit", 0);


        document.getElementById('file__upload').addEventListener('change', (e) => {
            let that = e.currentTarget;
            console.log(`1`)
            if (that.files && that.files[0]) {
                console.log(`IF`)
                let reader = new FileReader();
                reader.onload = (e) => {
                    document.getElementById('img__upload').setAttribute('src', e.target.result);
                    document.getElementById('img__upload').classList.remove('img__hidden');
                }
                reader.readAsDataURL(that.files[0]);
                let uploadBtn = document.getElementById('upload__btn');
                uploadBtn.classList.add('green');
                ///////////////////////////////////////////////////////
            }
        });

        //       if (document.getElementById('upload__btn').className === 'button modal__upload__btn green') {
        document.getElementById('upload__btn').addEventListener('click', uploadItem);

        //        }

        document.querySelector('.modal__arrow__logo').addEventListener('click', displayDeleteModal);
        document.querySelector('.modal__add__close__logo').addEventListener('click', closeModal);
    }
    document.getElementById('modal').addEventListener('click', closeModal);
}


function uploadItem(e) {
    e.preventDefault();
    /*    console.log(`E.classname = ${e.target.className}`)
    //    if (e.target.className === 'button modal__upload__btn green') {
    /*    let form = document.querySelector('form');
        let fd = new FormData(form);
    
        let img = document.getElementById('img__upload').src;
        let title = document.getElementById('modal__title__input').value;
    */

    /*    console.log(`CATEGORY = ${category}`);
    let formElement = document.querySelector('form');
    let formData = new FormData(formElement);
    let request = new XMLHttpRequest();
    request.open('POST', worksUrl);
    request.send(formData);
*/
    let category = document.getElementById('modal__category__select').value;

    const formData = new FormData();
    //    formData.append("title", document.getElementById('modal__title__input').value);
    formData.title = document.getElementById('modal__title__input').value;

    //    formData.append("imageUrl", document.getElementById('file__upload').src);

    //    formData.append("imageUrl", document.getElementById('file__upload').files[0]);//
    formData.imageUrl = document.getElementById('file__upload').files[0];

    //    formData.append("categoryId", category.toString());
    formData.categoryId = category.toString();

    console.log(`FORMDATA img = ${formData.imageUrl}`);
    /*    formData.append("userId", 1);
        formData.append("id", 15);
            formData.userId = 1;
    formData.id = 15;
        
    
    
        //    let request = new Request(worksUrl, {*/

    fetch(worksUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json;charset=utf-8',
            'enctype': 'multipart/form-data',
            'Authorization': "Bearer " + token
        },
        body: formData,
    })
        .then((response) => {
            if (!response.ok) throw new Error("Request failed. Code error: " + response.status);
        })
        .catch((error) => {
            console.error("ERROR TO UPLOAD FILE", error);
        });


    //    fetch(request)
    //        .then((res) => res.json)
    //        .then((data => {}))
    //}
    //    else return;
}

function displayAddItem(e) {
    e.preventDefault;
    //    document.querySelector('.modal__add__btn').removeEventListener('click', displayAddItem);
}

function deleteItem(e) {
    e.preventDefault();
    //    const token = sessionStorage.getItem('token');
    console.log(`FUNCTION DELETE ITEM`);
    //    const itemsContainer = document.querySelectorAll('.modal__item__container');
    const itemsToDelete = document.querySelectorAll('.trash__logo--selected');
    for (let i = 0; i < itemsToDelete.length; i++) {
        let elementIdTmp = itemsToDelete[i].getAttribute('id');
        let elementId = parseInt(elementIdTmp, 10);
        //        itemsContainer[elementId - 1].remove();
        console.log(`Element : ${elementId} deleted`);
        fetchDelete(elementId);
    }
}

function fetchDelete(elementId) {
    fetch(worksUrl + '/' + elementId, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + token
        },
    })
        .then((response) => {
            if (!response.ok) throw new Error("Request failed. Code error: " + response.status);
        })
        .catch((error) => {
            console.error("ERROR TO DELETE ITEM", error);
        });
}

function displayAddModal() {
    console.log(`DISPLAY ADD`);
    document.querySelector('.modal__add__btn').removeEventListener('click', displayAddModal);
    document.querySelector('.modal').remove();
    createModal();
    fillModale("ADD ITEM");
}

function displayDeleteModal() {
    console.log(`DISPLAY DELETE`);
    document.querySelector('.modal__arrow__logo').removeEventListener('click', displayDeleteModal);
    document.querySelector('.modal').remove();
    createModal();
    fillModale("DELETE ITEM");
}

function closeModal(e) {
    console.log(`CLOSE MODAL`);
    console.log(`E CLASS NAME = ${e.target.className}`);
    if (document.getElementById('modal') === null) return;
    else {
        if (e.target.className === 'fa-solid fa-xmark modal__close__logo') {
            document.querySelector('.modal__close__logo').removeEventListener('click', closeModal);
            document.querySelector('.modal__header').remove();
            document.querySelector('.modal').remove();
        }
        if (e.target.className === 'fa-solid fa-xmark modal__add__close__logo') {
            document.querySelector('.modal__add__close__logo').removeEventListener('click', closeModal);
            document.querySelector('.modal__header').remove();
            document.querySelector('.modal').remove();
        }
        if (e.target.id === 'modal') {
            document.getElementById('modal').removeEventListener('click', closeModal);
            document.querySelector('.modal__header').remove();
            document.querySelector('.modal').remove();
        }
        if (e.key === 'Escape' || e.key === 'Esc') {
            if (e.target.className === 'fa-solid fa-xmark modal__close__logo') document.querySelector('.modal__close__logo').removeEventListener('click', closeModal);
            if (e.target.className === 'fa-solid fa-xmark modal__add__close__logo') document.querySelector('.modal__add__close__logo').removeEventListener('click', closeModal);
            document.getElementById('modal').removeEventListener('click', closeModal);
            document.querySelector('.modal__header').remove();
            document.querySelector('.modal').remove();
        }
    }
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
        trashLogoContainer.innerHTML = `<i id="${elementId}__item__trash" class="fa-regular fa-trash-can trash__logo"></i>`;
        itemsContainer[i].appendChild(trashLogoContainer);

        generateTag("body .modal__item__container", "img", "modal__item", 0, 0, 0, 0, 0);
        let imageTag = document.querySelector('.modal__item__container > img:last-child');
        imageTag.src = allWorksData[i].imageUrl;
        imageTag.id = "item__" + elementId;
        itemsContainer[i].appendChild(imageTag);

        generateTag("body .modal__item__container", "p", "modal__item__txt", 0, 0, 0, 0, 0);
        let textTag = document.querySelector('.modal__item__container > p:last-child');
        textTag.innerText = "éditer";
        itemsContainer[i].appendChild(textTag);
    }
}

window.addEventListener('keydown', function (e) {
    console.log(`E.KEY = ${e.key}`);
    if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal(e);
    }
})