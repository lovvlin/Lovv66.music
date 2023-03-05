let container = document.querySelector(`.card-album`);
let search = new URLSearchParams(window.location.search);
let i = search.get(`i`);

// Получаем нужный альбом из массива
let album = albums[i];

// Если альбом не найден
if (!album) {
    // Показать ошибку
    renderError();
} else {
    // Вывод информации об альбоме
    renderAlbumInfo();

    // Вывод треков из альбома
    renderTracks();

    // Тут будет код для запуска звуков
    setupAudio();
}

// Ниже объяви все эти функции


// Ошибка если нет альбома
function renderError() {
  container.innerHTML = "Ошибка! Альбома не существует"
};

// Вывод альбома
function renderAlbumInfo() {
  container.innerHTML = `
  <div class="">                
    <div class="album g-5 row m-md-5 m-xl-1">
      <div class="col-md-6 m-0 gy-0">
        <img src="${album.imgAlbum}" class="img-fluid rounded-start me-5" alt="">
      </div>
        <div class="col-md-6">
        <div class="card-body">
          <h5 class="card-title fs-4 fw-bold">${album.title}</h5>
          <p class="card-text">${album.description}</p>
          <p class="card-text"><small class="fw-light">${album.year}</small></p>
        </div>
    </div>
    </div>
  </div>`;
};

// Вывод треков
function renderTracks() {
  let containerPlayList = document.querySelector(`.play-list`);
  let tracks = album.tracks;

  // Ввести треки в список
  for (i = 0; i < tracks.length; i++) {
    let track = i + 1;

    // Если трек не последний
    if (track < tracks.length) {
      containerPlayList.innerHTML += `
      <li class="trak list-group-item align-items-center d-flex bg-transparent">
      <div class="">
      <div class="shadows z-0">
      </div>
      <img src="assets/play.png" alt="" class="play-pause z-10 me-5">
    </div>
      <div>
        <div class="me-5">${tracks[i].title}</div>
        <div>${tracks[i].author}</div>
      </div>
      <div class="progressTime">
      </div>
      <div class="ms-auto time">${tracks[i].time}</div>
      <audio class="audio" src="${tracks[i].src}"></audio>
    </li>`;

    // Если трек последний в списке (Это нужно чтобы нижняя граница у последнего трека была белой)
    } else if (track = tracks.length) {
      containerPlayList.innerHTML += `
      <li class="trak list-group-item align-items-center d-flex bg-transparent list-group-item-end">
      <div class="">
      <div class="shadows z-0">
      </div>
      <img src="assets/play.png" alt="" class="play-pause z-10 me-5">
    </div>
      <div>
        <div>${tracks[i].title}</div>
        <div>${tracks[i].author}</div>
      </div>
      </div>
      <div class="progressTime">
      </div>
      <div class="ms-auto time">${tracks[i].time}</div>
      <audio class="audio" src="${tracks[i].src}"></audio>
    </li>`;
    }
  
  }
};

// Логика звука
function setupAudio() {
  let palylist = document.querySelector(`.play-list`);
  let isPlaying = false;
  palylist.addEventListener(`click`, function (evt) {
      // Если трек сейчас играет...
      let target = evt.target;
      let audio = target.querySelector(`.audio`);
      let playPause = target.querySelector(`.play-pause`);
      let shadow = target.querySelector(`.shadows`);
      if (isPlaying) {
          isPlaying = false;
          // Поставить на паузу
          audio.pause();
          playPause.src = "assets/play.png";
          shadow.classList.remove("play-active");
          window.onload = updateProgress;
  
      // Если трек сейчас не играет...
      } else {
          isPlaying = true;
          // Включить проигрывание
          audio.play();
          playPause.src = "assets/pause.png";
          shadow.classList.add("play-active") ;
      };
  
      // Таймер 
      let timeNode = target.querySelector(`.time`);
      let secT = 0 
      function updateProgress() {
        // Нарисовать актуальное время
        let audioTime = audio.currentTime;
        let sec = Math.floor(audioTime % 60);
        let min = Math.floor(audioTime / 60);
        if (sec >= 10) {
          secT = sec;
        } else if (sec < 10) {
          secT= '0' + sec;
        }
        let time = min + ':' + secT;
      
        timeNode.innerHTML = time;
        
        // Нужно ли вызвать её ещё раз?
        if (isPlaying) {
              requestAnimationFrame(updateProgress);
        };
        
      };

      // Запустить функцию по нажатию
      updateProgress();
  
      // Прогресс бар времени 
      let progressTime = target.querySelector(`.progressTime`);

      // Вставлять прогресс бар по нажатию
      progressTime.innerHTML = `
        <div class="progress  align-content-center"  role="progressbar" aria-label="Example px3 high" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style="height: 3px">
          <div class="progress-bar" style="width: 0%"></div>
        </div>
      `;
      
      let progressbar = target.querySelector(`.progress-bar`);
      let audioDuration = audio.duration;
      
      // Увеличивать прогресс в зависимости от времени проигрываиня 
      function updateProgressBar() {
        let audioTime = audio.currentTime;
        let timeProgress = Math.floor((audioTime * 100) / audioDuration)
        progressbar.style.width = timeProgress + 'px'
        if (isPlaying) {
          requestAnimationFrame(updateProgressBar);
        }
      }
      
      // Запустить функцию по нажатию
      updateProgressBar()
  });
};
