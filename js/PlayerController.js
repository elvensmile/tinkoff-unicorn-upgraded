class PlayerController extends Trait {
    constructor() {
        super('playerController');
        this.checkpoint = new Vec2(0, 0);
        this.player = null;
        this.score = 0;
        this.lives = 4;
        this.scoreSelector = document.getElementById('unicorn-score');
        this.livesSelector = document.getElementById('lives');
        //this.sound = new Sound("sound/ice_cavern.ogg");

    }

    setPlayer(entity) {
        for (let i=0; i<this.lives; i++) {
            this.livesSelector.insertAdjacentHTML('afterbegin', '<img src="img/heart.png" id="life">');
        }

        this.player = entity;

        this.player.picker.onPick = () => {

            this.score += 50;


            setTimeout(() => {
                this.scoreSelector.innerHTML = this.score;
            }, 0);
        }
    }

    update(entity, deltaTime, level) {
        if (!level.entities.has(this.player)
           || this.player.pos.y > 1200
           || this.player.pos.x > 11400) {

              if (this.lives>1){
                  this.player.killable.revive();
                  this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
                  level.entities.add(this.player);
                  this.lives = this.lives-1;
                  this.player.run.speed = 13000;
                this.livesSelector.removeChild(document.getElementById('life'));
               // this.sound.play();

              }


          else {
                  this.sound.stop();
                  deathScreen(this.score);

            }

        }
    }


}
