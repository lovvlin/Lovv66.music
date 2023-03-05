let container = document.querySelector(`.albums`);



for (let i = 0; i < albums.length; i++){
    let album = albums[i];
    container.innerHTML += `
        <div class="col">
            <div class="card" style="width: 16rem;">
                <a href="album.html?i=${i}">
                    <img src="${album.img}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <p class="card-text">${album.title}</p>
                    </div>
                </a>
            </div>
        </div>`;
}