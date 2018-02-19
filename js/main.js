let gameEnded = 1;
const timer = new Timer(1/60);

function startGame(level) {

    const LEVEL = level;

    const canvas = document.getElementById('screen');
    main(canvas, LEVEL);

}

    async  function main(canvas, LEVEL) {


    const context = canvas.getContext('2d');
    const charsFactory = await loadChars();
    const loadLevel = await createLevelLoader(charsFactory);
    const level = await loadLevel(levelData[LEVEL]);
    const camera = new Camera();
    const unicorn = charsFactory.unicorn();
    const playerEnv = createPlayerEnv(unicorn);



    level.entities.add(playerEnv);

    if(level.entities.add(playerEnv)) {

     document.getElementById("game").style.visibility = "visible";
     document.getElementById("startScreen").style.display = "none"; }


    ['keydown', 'keyup'].forEach(eventName => {
        window.addEventListener(eventName, event => {
        if (event.code === 'Space') {
        const keyState = event.type === 'keydown' ? 1 : 0;

        if (keyState > 0) {
            unicorn.jump.start();


        } else {
            unicorn.jump.cancel();
        }
    } else {
        unicorn.jump.cancel();
    }
});
});


    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        camera.pos.x = Math.max(0, unicorn.pos.x - 100);
        level.comp.draw(context, camera);
    }




    timer.start();


}


function loadChars() {
    const entityFactories = {};

    function addFactory(name) {
        return factory => entityFactories[name] = factory;
    }


    return Promise.all([

        loadEnemyBug().then(addFactory('enemyBug')),
        loadEnemyEvilSnowman().then(addFactory('enemyEvilSnowman')),
        loadRainbow().then(addFactory('rainbow')),
        loadUnicorn().then(addFactory('unicorn')),
        loadIceBomb().then(addFactory('iceBomb')),
        loadPrincess().then(addFactory('princess'))

    ])
    .then(() => entityFactories);
}

function createPlayerEnv(playerEntity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkpoint.set(0, 60);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}

