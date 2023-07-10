export function loggedUser() {
    if (sessionStorage.getItem('token') !== null) return true;
    else return false;
}

export function generateTag(tagParent, tagType, tagName, textContent, tagId, tagHtml, inputType, formFor) {

    let element = document.createElement(tagType);
    tagParent = document.querySelector(tagParent);

    if (checkParam(tagName)) {
        element.className = tagName;
    }
    if (checkParam(textContent)) {
        element.innerText = textContent;
        if ((tagType == "option") && (textContent === "Objets")) element.value = 1;
        if ((tagType == "option") && (textContent === "Appartements")) element.value = 2;
        if ((tagType == "option") && (textContent === "Hotels & restaurants")) element.value = 3;
    }

    if (checkParam(tagId)) {
        element.id = tagId;
    }
    if (checkParam(tagHtml)) {
        element.innerHTML = tagHtml;
    }
    if (checkParam(inputType)) {
        element.type = inputType;
    }
    if (checkParam(formFor)) {
        element.htmlFor = formFor;
    }
    if ((tagType == "input") && (tagId === "file__upload")) {
        element.setAttribute("name", "picture");
        element.setAttribute("accept", "image/jpg, image/png");
        element.required = true;
    }
    tagParent.appendChild(element);
    return element;
}

function checkParam(param) {
    if ((param !== 0) && (param !== null)) return true;
    else return false;
}