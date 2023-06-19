worksUrl = "http://127.0.0.1:5678/api/works"



fetch(worksUrl)
    .then(response => response.json())
    .then(response => {
        allWorksData = response;
        displayWorks(allWorksData);
    });

function displayWorks(worksData) {
    worksDataLength = worksData.length;
    for (i = 0; i < worksDataLength; i++) {
        console.log("DISPLAY WORKS CAT = : " + worksData[i].category.name + "");
    }
    for (let i = 0; i < worksDataLength; i++) {
        let tagFigure = document.createElement('figure');
        document.querySelector('.gallery').appendChild(tagFigure);

        const galleryFigureArray = document.querySelectorAll('div.gallery figure');
        let imgTag = document.createElement('img');
        imgTag.src = worksData[i].imageUrl;
        imgTag.alt = worksData[i].title;
        galleryFigureArray[i].appendChild(imgTag);

        let figcaptionTag = document.createElement('figcaption');
        figcaptionTag.innerHTML = worksData[i].title;
        galleryFigureArray[i].appendChild(figcaptionTag);
    }
}


const buttonsArray = document.querySelectorAll('.filter__btn');
const buttonsArrayLength = buttonsArray.length;
console.log("filter btn count : " + buttonsArray.length + "");

initializeFilterBtn(1);

function initializeFilterBtn(btnNumber) {
    buttonsArray[btnNumber - 1].classList.add('filter__btn--selected');
}

for (let i = 0; i < buttonsArrayLength; i++) {
    buttonsArray[i].addEventListener('click', function () {
        for (let i = 0; i < buttonsArrayLength; i++) {
            if (buttonsArray[i].className === 'filter__btn filter__btn--selected') {
                buttonsArray[i].classList.remove('filter__btn--selected');
            }
        }
        buttonsArray[i].classList.toggle('filter__btn--selected');
    });
}
