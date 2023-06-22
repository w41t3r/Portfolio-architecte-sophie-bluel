const worksUrl = "http://127.0.0.1:5678/api/works";

/***** Filter management and home page content *****/

fetch(worksUrl)
    .then(response => response.json())
    .then(response => {
        allWorksData = response;
        initializeFilterBtn(allWorksData, 1);
    });


const buttonsArray = document.querySelectorAll('.filter__btn');
const buttonsArrayLength = buttonsArray.length;
console.log("filter btn count : " + buttonsArray.length + "");



function initializeFilterBtn(worksData, btnNumber) {
    buttonsArray[btnNumber - 1].classList.add('filter__btn--selected');
    displayWorks(filteringCategories(worksData, btnNumber - 1));
}

for (let i = 0; i < buttonsArrayLength; i++) {
    buttonsArray[i].addEventListener('click', function () {
        for (let i = 0; i < buttonsArrayLength; i++) {
            if (buttonsArray[i].className === 'filter__btn filter__btn--selected') {
                buttonsArray[i].classList.remove('filter__btn--selected');
            }
        }
        buttonsArray[i].classList.toggle('filter__btn--selected');
        if (i === 0) {
            displayWorks(allWorksData);
        }
        if (i === 1) {
            let filteredData = filteringCategories(allWorksData, 1);
            displayWorks(filteredData);
        }
        if (i === 2) {
            let filteredData = filteringCategories(allWorksData, 2);
            displayWorks(filteredData);
        }
        if (i === 3) {
            let filteredData = filteringCategories(allWorksData, 3);
            displayWorks(filteredData);
        }
    });
}

function filteringCategories(worksData, categoryId) {
    let worksFilteredData = [];
    let filteredIndex = 0;

    if (categoryId === 0) {
        return worksData;
    }
    for (i = 0; i < worksData.length; i++) {
        if (worksData[i].categoryId === categoryId) {
            worksFilteredData[filteredIndex] = worksData[i];
            filteredIndex++;
        }
    }
    return worksFilteredData;
}

function displayWorks(worksData) {

    worksDataLength = worksData.length;


    console.log("WORKS IN THIS CAT : " + worksDataLength + "");


    let allTagFigure = document.querySelectorAll('div.gallery figure');
    for (i = 0; i < allTagFigure.length; i++) {
        allTagFigure[i].remove();
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
/***** End filter management and home page content *****/
