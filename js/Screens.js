function displayLevels() {

    const targetDiv = document.getElementById('display-levels');


    for (let i = 0; i < levelData.length; i++) {


        targetDiv.insertAdjacentHTML('afterbegin',`<div class = "level" id = level-${i}><img src="${levelData[i].thumbnail}" onclick="startGame(${i})"><p>${levelData[i].name}</p></div>`);


    }


}
displayLevels();

function deathScreen(score) {

    const finalScore = score;
    document.getElementById("death-screen").style.display= "block";


    document.getElementById('screen').getContext('2d').clearRect(0, 0, document.getElementById('screen').width, document.getElementById('screen').height);

    document.getElementById("game").style.display = "none";

    gameEnded = 0;

    document.getElementById("final-score").insertAdjacentHTML('afterbegin', finalScore);




}

function script() {

    gameEnded = 2;
    document.getElementById("script").style.display= "flex";
    document.getElementById("begging").innerHTML = scriptText.text;


}

function finalCall(answer) {

    const lastSong = new Sound(answer);
    lastSong.play();
    document.getElementById("button1").disabled = true;
    document.getElementById("button2").disabled = true;





}


