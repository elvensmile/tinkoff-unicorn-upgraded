const ICE_BOMB = {
    imageURL: 'img/icebomb.png',
    sound: "sound/ice.wav",
    frames: [
        {
            name: 'spark-1',
            rect: [0, 0, 83, 93]
        },
        {
            name: 'spark-2',
            rect: [83, 0, 83, 93]
        },
        {
            name: 'spark-3',
            rect: [166, 0, 83, 93]
        },
        {
            name: 'spark-4',
            rect: [249, 0, 83, 93]
        },
        {
            name: 'spark-5',
            rect: [332, 0, 83, 93]
        },
        {
            name: 'spark-6',
            rect: [415, 0, 83, 93]
        }
        ,
        {
            name: 'explode-1',
            rect: [498, 0, 83, 93]
        },
        {
            name: 'explode-2',
            rect: [581, 0, 83, 93]
        },
        {
            name: 'explode-3',
            rect: [664, 0, 83, 93]
        },
        {
            name: 'explode-4',
            rect: [747, 0, 83, 93]
        },
        {
            name: 'explode-5',
            rect: [830, 0, 83, 93]
        }
    ],
    animations: [
        {
            name: 'spark',
            frameLen: 0.2,
            frames: [
                'spark-1',
                'spark-2',
                'spark-3',
                'spark-4',
                'spark-5',
                'spark-6'
            ]
        },
        {
            name: 'explode',
            frameLen: 0.6,
            frames: [
                'explode-1',
                'explode-2',
                'explode-3',
                'explode-4',
                'explode-5'
            ]
        },

    ]
};

function loadIceBomb() {
    return loadSpriteSheet(ICE_BOMB)
        .then(createIceBombFactory);
}

class BehaviorIceBomb extends Trait {
    constructor() {
        super('behavior');
       // this.sound = sound;
    }

    collides(us, them) {
        if (us.pickable.picked) {

            us.sound.play();
            them.run.speed = 0;
            setTimeout(() => {
                them.killable.kill();
        }, 500);

            return;
        }

        us.pickable.pick();


    }
}


function createIceBombFactory(sprite) {
    const sparkAnim = sprite.animations.get('spark');
    const explodeAnim = sprite.animations.get('explode');
    const sound = new Sound("sound/ice.wav");

    function routeAnim(iceBomb) {
        if (iceBomb.pickable.picked) {
            return explodeAnim(iceBomb.lifetime);
        }
        return sparkAnim(iceBomb.lifetime);
    }

    function drawIceBomb(context) {
        sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
    }

    return function createIceBomb() {
        const iceBomb = new Entity();
        iceBomb.sound = sound;
        iceBomb.size.set(83, 93);

        iceBomb.addTrait(new Physics());
        iceBomb.addTrait(new Solid());
        iceBomb.addTrait(new Pickable());
        iceBomb.addTrait(new BehaviorIceBomb());

        iceBomb.draw = drawIceBomb;

        return iceBomb;
    };
}