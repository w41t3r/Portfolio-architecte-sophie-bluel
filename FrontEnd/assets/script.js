console.log("JS LOADED");

worksUrl = "http://127.0.0.1:5678/api/works"

fetch(worksUrl)
    .then(response => response.json())
    .then(worksArray => {
        worksArrayLength = worksArray.length;
        for (let i = 0; i < worksArrayLength; i++) {
            console.log(worksArray[i].title);
            let tagFigure = document.createElement('figure');
            document.querySelector('.gallery').appendChild(tagFigure);

            const galleryFigureArray = document.querySelectorAll('div.gallery figure');
            let imgTag = document.createElement('img');
            imgTag.src = worksArray[i].imageUrl;
            imgTag.alt = worksArray[i].title;
            galleryFigureArray[i].appendChild(imgTag);

            let figcaptionTag = document.createElement('figcaption');
            figcaptionTag.innerHTML = worksArray[i].title;
            galleryFigureArray[i].appendChild(figcaptionTag);
        }
    });

