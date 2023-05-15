var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var balls = [];
var isRestart=false;
var highestScore = 0;
//Menü butonlarını html kodundan çekiyorum
var restartGame = document.getElementById("restart");
var startGameButton = document.getElementById("start-game");
var howToPlay = document.getElementById("how-to-play-button");

//Genel müzik açma kapama ile ilgili işlemleri yaptığım bblüm
var popSound = document.getElementById("pop");
var NewHighestScoreSound = document.getElementById("highest-score-sound");

var EfectSound = true;
var toggleSoundButton = document.getElementById("toggle-sound");
toggleSoundButton.addEventListener('click', function() {//bir kere tıklanırsa efekt kapama butonuna,efekt sesini kapıyor geri tıklandığında EfectSound değişkeni true oluyor ve geri açılıyor
  EfectSound = !EfectSound;
  if (EfectSound==true) {
    toggleSoundButton.innerText = "Ses kapa";
  } else {
    toggleSoundButton.innerText = "Ses aç";
  }
});



function toggleScreen(id,toggle) {//htmlden çekilen ögelerin ekranda gösterilip gösterilmeyeceğini ayarlayan fonksiyon
  var element = document.getElementById(id);
  var display = ( toggle ) ? 'block' : 'none';
  element.style.display = display;
}
howToPlay.addEventListener('click', () => {
  toggleScreen("how-to-play",true);
});

function startGame() {
  var numBalls = 3;
  var score = 0;
  var totalClicks = 0;
  var correctClicks = 0;
  isRestart=false;
  console.log("start game");
  toggleScreen('canvas',true);
  toggleScreen('start-screen',false);
  toggleScreen('how-to-play-button',false);
  toggleScreen("how-to-play",false);
  toggleScreen("score",false);
  //toggleScreen("accuracy",false);
  
  function addBall() {//Math.random fonksiyonundan gelen veriye göre topun renginin belirlendiği ve ball dizisine eklendiği fonksiyon
    ball_color=Math.random()*10;
    console.log(ball_color);
    if(ball_color<4){
      ball_color="red";
    }
    else if(ball_color<8)
    {
      ball_color="purple";
    }
    else{
      ball_color="blue";
    }
    var ball = {
      x: (Math.random() * canvas.width),//ekranın hangi x ve y pikselinde çıkacağı randomize edilir
      y: (Math.random() * canvas.height),
      radius: 30,
      color: ball_color
    };
    balls.push(ball);
  }
  
  function removeBall(ball) {
    var index = balls.indexOf(ball);//kaldırılacak olan topun indexi
    if (index > -1) {//eğer index -1 sayısını döndürseydi dizinin içinde o top yok anlamına gelicekti. Eğer index değeri -1 den büyükse bu topu .splice ile çıkarıyoruz
      balls.splice(index, 1);
    }
  }
  
  function drawBalls() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var highestScore = localStorage.getItem('highestScore') || 0;//highest score localstorage'dan çekilemezse değeri 0 olarak atanır.Varsa localstorage'dan 
    for (var i = 0; i < balls.length; i++) {
      var ball = balls[i];
      if (ball.radius <= 0) {//topun yarıçapı 0'a eşit olursa top siliniyor
        removeBall(ball);
      }
      else {//değilse topun rengine göre yarıçapının skora göre azalma oranı belirlenir
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        if (ball.color == "red") {
          if(score<100){
            ball.radius -= 0.2;
          }
          else if(score>100 && score<200){
            ball.radius -= 0.25;
            console.log("score 100 den fazla");
          }
          else if(score>200 && score<300){
            ball.radius -=0.30;
          }
          else if(score>300 && score<400){
            ball.radius -= 0.35;
          }
          else if(score>400 && score<500){
            ball.radius -=0.38;
          }
          else if(score>500 && score<600){
            ball.radius -=0.42;
          }
          else if(score>600 && score<700){
            ball.radius -=0.45;
          }
          else{
            ball.radius -= 0.48;
          }
          ctx.fillStyle = "red";
        } else if (ball.color == "purple") {
          if(score<100){
            ball.radius -= 0.3;
          }
          else if(score>100 && score<200){
            ball.radius -= 0.35;
          }
          else if(score>200 && score<300){
            ball.radius -=0.4;
          }
          else if(score>300 && score<400){
            ball.radius -= 0.45;
          }
          else if(score>400 && score<500){
            ball.radius -=0.48;
          }
          else if(score>500 && score<600){
            ball.radius -=0.52;
          }
          else if(score>600 && score<700){
            ball.radius -=0.55;
          }
          else{
            ball.radius -= 0.58;
          }
          ctx.fillStyle = "purple";
        } else if (ball.color == "blue") {
          if(score<100){
            ball.radius -= 0.4;
          }
          else if(score>100 && score<200){
            ball.radius -= 0.45;
            console.log("score 100 den fazla");
          }
          else if(score>200 && score<300){
            ball.radius -=0.5;
          }
          else if(score>300 && score<400){
            ball.radius -= 0.55;
          }
          else if(score>400 && score<500){
            ball.radius -=0.58;
          }
          else if(score>500 && score<600){
            ball.radius -=0.62;
          }
          else if(score>600 && score<700){
            ball.radius -=0.65;
          }
          else{
            ball.radius -= 0.68;
          }
          ctx.fillStyle = "blue";
        }
        ctx.fill();
      }
    }
    
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Score: " + score, 10, 30);
    // Doğruluk yüzdesi hesaplama işlemi
    var accuracy;
    if(totalClicks == 0) {
      accuracy = 0;
    } 
    else{
      accuracy = Math.round(correctClicks / totalClicks * 100);
    }
    
    //canvas ile doğruluk yüzdesini yazdırma işlemi
    ctx.fillStyle = "#000000";
    ctx.font = "20px Arial";
    ctx.fillText("Doğruluk Yüzdesi: " + accuracy + "%", 10, 60);

    if (balls.length == 0) {
      isRestart=true;//ekranda top kalmadığında bu değişkeni true yaparak oyunun tekrar oyna menüsüne gelmesi sağlanmaktadır
      if (score > highestScore) {
        localStorage.setItem('highestScore', score); // Yeni highest score'u local storage'a kaydeder
        highestScore = score;
        document.getElementById('highest-scoree').innerHTML = "Yeni En Yüksek Skor:"+highestScore;
        document.getElementById("accuracy").innerHTML = "Doğruluk Yüzdesi:"+accuracy+"%";
        toggleScreen("highest-scoree",true);
        toggleScreen("accuracy",true);
        NewHighestScoreSound.play();
        console.log(highestScore);
      }
      else if(score<highestScore){//yeni en yüksek skor yapılmadıysa düz skor yazdırılır
        console.log(score);
        document.getElementById('score').innerHTML = "Skorun:"+score;
        document.getElementById("accuracy").innerHTML = "Doğruluk Yüzdesi:"+accuracy+"%";
        toggleScreen("score",true);
        toggleScreen("accuracy",true);
      }
      else{
        console.log("brrrrrrrr");
      }
    }
    if(isRestart==true){//tekrar oyna menüsüne geçişi sağlar
      toggleScreen('canvas',false);
      isRestart=false;
      toggleScreen('restart-screen',true);
    }
  }
  
  restartGame.addEventListener('click', () => {//tekrar oyna butonuna basılırsa pencere yenilenir ve oyna menüsüne geçilir
    window.location.reload();
  });
  
  function clickHandler(event) {//Ekranda olan toplara tıklanmılmış mı tıklanılmamış mı diye kontrol eden fonksiyon
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;
    for (var i = 0; i < balls.length; i++) {
      var ball = balls[i];
      var dx = ball.x - mouseX;
      var dy = ball.y - mouseY;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < ball.radius) {
        if (ball.color == "red") {
          score += 5;
        } else if (ball.color == "purple") {
          score += 10;
        } else if (ball.color == "blue") {
          score += 15;
        }
        removeBall(ball);
        if (EfectSound==true) {
          popSound.currentTime = 0;
          popSound.play();
        }
        addBall();
        correctClicks++; // Topa tıklanan deger
      }
    }
    totalClicks++; // Toplam tıklama sayısını tutan deger
  }
  
  for (var i = 0; i < numBalls; i++) {//Oyuna kaç tane topla başlanılacağı belirlenir
    addBall();
  }
  
  canvas.addEventListener("click", clickHandler);//canvasa clickHandler eklenir
  
  setInterval(drawBalls, 30);
}


