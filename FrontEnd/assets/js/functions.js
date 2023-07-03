export function loggedUser() {
    if (sessionStorage.getItem('token') !== null) {
        /////////////////////////////////////////
        console.log('User connected');
        return true;
    }
    else {
        console.log('User NOT connected');
        return false;
    }
}

export function generateTag(tagParent, tagType, tagName, textContent, tagId, tagHtml) {

    let element = document.createElement(tagType);
    tagParent = document.querySelector(tagParent);
    
    if (checkParam(tagName)) {
        element.className = tagName;
    }

    if (checkParam(textContent)) {
        element.innerText = textContent;
    }
    
    if (checkParam(tagId)) {
        element.id = tagId;
    }


    if (checkParam(tagHtml)) {
        console.log(tagHtml);
        element.innerHtml = tagId;
    }
    tagParent.appendChild(element);
}

function checkParam(param) {
    if ((param !== 0) && (param !== null)) return true;
    else return false;
}