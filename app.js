let container = document.getElementById('container');
let audio = document.getElementById('audio');
let context, analyser, src, array, arrayForCircle, arrayForSquare;
let logo = document.querySelectorAll(".logo");

let menu = document.getElementById('menu');
let menuButton = document.getElementById('menuButton');
let menuIcon = document.getElementById('menuIcon');
let colorBcg = document.getElementById('colorBcg');
let colorObject = document.getElementById('colorObject');
let SizeOfHeight = document.getElementById('SizeOfHeight');
let range = document.getElementById('range');
let typeOfVizualizator = document.getElementById('typeOfVizualizator');
let volumeValue = document.getElementById('volumeValue');
let volumeControle = document.getElementById('volumeControle');
let boxForSquare = document.getElementById('boxForSquare');
let square = document.getElementById('square');
let boxForCircle = document.getElementById('boxForCircle');
let circle = document.getElementById('circle');
let fileUpload = document.getElementById('fileUpload');
let play = document.querySelector('.play');
let pause = document.querySelector('.pause');



document.body.style.overflow = 'hidden';

window.addEventListener('click', function(event) {
  if (event.target.id != 'container' && event.target.id != 'circle' && event.target.id != 'square' && event.target.className != 'logo') return;
  
  
    if (!context) {
      preparation();
    }
    if (audio.paused) {
      pause.classList.remove('active');
      play.classList.add('active');
      audio.play();
      loop();
      loopForSquare();
      loopForCircle();
    } else {
      audio.pause();
      play.classList.remove('active');
      pause.classList.add('active');
    }
  
});


function preparation() {
  context = new AudioContext();
  analyser = context.createAnalyser();
  src = context.createMediaElementSource(audio);
  src.connect(analyser);
  analyser.connect(context.destination);
  loop();
  loopForSquare();
  loopForCircle();
}

function loop() {
  if (!audio.paused) {
    window.requestAnimationFrame(loop);
  }
  
    for (let elem of logo) {
      array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      let rand = Math.floor(Math.random() * array.length);
      elem.style.minHeight = (array[rand]) * range.value + "px";
      
    }
}


function loopForCircle() {
  if(!audio.paused) {
    window.requestAnimationFrame(loopForCircle);
  }
  arrayForCircle = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(arrayForCircle);
  
  if (circle) {
    circle.style.height = (arrayForCircle[40]) * range.value + 'px';
    circle.style.width = (arrayForCircle[40]) * range.value + 'px';
  }
} 


function loopForSquare() {
  if(!audio.paused) {
    window.requestAnimationFrame(loopForSquare);
  }
  arrayForSquare = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(arrayForSquare);
  
  if (square) {
    square.style.height = (arrayForSquare[40]) + 'px';
    square.style.width = (arrayForSquare[40]) + 'px';
    square.style.transform = `rotate(${arrayForSquare[40] * range.value}deg)`;
  }
}




 
menuButton.addEventListener('click', function() {
  menu.classList.toggle('left');
  menuIcon.classList.toggle('menuIconActive');
});

colorBcg.addEventListener('input', function() {
  container.style.backgroundColor = colorBcg.value;
});

colorObject.addEventListener('input', function() {
  for (let elem of logo) {
    elem.style.backgroundColor = colorObject.value;
  }
  square.style.backgroundColor = colorObject.value;
  circle.style.backgroundColor = colorObject.value;
});

range.addEventListener('input' , function() {
  SizeOfHeight.textContent = range.value;
});



typeOfVizualizator.addEventListener('change', function() {
  
  if (typeOfVizualizator.value == 'circle') {
    boxForCircle.classList.remove('hidden');
    for (let elem of logo) {
      elem.classList.add('hidden');
    }
    audio.pause();
    container.classList.remove('LinesInBottom');
    if (boxForSquare) boxForSquare.classList.add('hidden');
    
    pause.classList.remove('active');
    play.classList.remove('active');
    pause.classList.add('active');
  }
  
  if (typeOfVizualizator.value == 'defolt') {
    container.classList.remove('LinesInCenter');
    container.classList.add('LinesInBottom');
    for (let elem of logo) {
      elem.classList.remove('hidden');
    }
    if (boxForCircle) boxForCircle.classList.add('hidden');
    if (boxForSquare) boxForSquare.classList.add('hidden');
    audio.pause();
    
    pause.classList.remove('active');
    play.classList.remove('active');
    pause.classList.add('active');
  }
  
  if (typeOfVizualizator.value == 'LinesInCenter') {
    if (boxForCircle) boxForCircle.classList.add('hidden');
    if (boxForSquare) boxForSquare.classList.add('hidden');
    audio.pause();
    for (let elem of logo) {
      elem.classList.remove('hidden');
    }
    container.classList.remove('LinesInBottom');
    container.classList.add('LinesInCenter');
    
    pause.classList.remove('active');
    play.classList.remove('active');
    pause.classList.add('active');
  }
  
  if (typeOfVizualizator.value == 'square') {
    if (boxForCircle) boxForCircle.classList.add('hidden');
    audio.pause();
    for (let elem of logo) {
      elem.classList.add('hidden');
    }
    container.classList.remove('LinesInBottom');
    boxForSquare.classList.remove('hidden');
    
    pause.classList.remove('active');
    play.classList.remove('active');
    pause.classList.add('active');
  }
});

volumeControle.addEventListener('input', function() {
  volumeValue.textContent = volumeControle.value;
  audio.volume = volumeControle.value;
});


fileUpload.addEventListener('change', function() {
  let file = this.files[0];
  
  if (file) {
    let reader = new FileReader();
    
    reader.addEventListener('load', function() {
      audio.setAttribute('src', this.result);
    });
    
    reader.readAsDataURL(file);
  }
})

























