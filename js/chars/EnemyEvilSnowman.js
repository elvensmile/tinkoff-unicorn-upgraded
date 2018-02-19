const ENEMY_EVILSNOWMAN = {
    imageURL: 'img/evilsnowman.png',
    frames: [
        {
            name: 'frame-1',
            rect: [0, 0, 64, 111]
        },
        {
            name: 'frame-2',
            rect: [64, 0, 64, 111]
        },
        {
            name: 'frame-3',
            rect: [128, 0, 64, 111]
        },
        {
            name: 'frame-4',
            rect: [192, 0, 64, 111]
        },
        {
            name: 'frame-5',
            rect: [256, 0, 64, 111]
        }
    ],
    animations: [
        {
            name: 'anim',
            frameLen: 0.2,
            frames: [
                'frame-1',
                'frame-2',
                'frame-3',
                'frame-4',
                'frame-5'
            ]
        }
    ]
};

function loadEnemyEvilSnowman() {
    return loadSpriteSheet(ENEMY_EVILSNOWMAN)
    .then(createEnemyEvilSnowmanFactory);
}


class BehaviorEnemyEvilSnowman extends Trait {
    constructor() {
        super('behavior');

    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        them.killable.kill();
    }


}


function createEnemyEvilSnowmanFactory(sprite) {
    const standAnim = sprite.animations.get('anim');

    function routeAnim(enemyEvilSnowman) {
        return standAnim(enemyEvilSnowman.lifetime);
    }

    function drawEnemyEvilSnowman(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createEnemyEvilSnowman() {
        const enemyEvilSnowman = new Entity();
        enemyEvilSnowman.size.set(64, 88);
        enemyEvilSnowman.offset.y = 20;

        enemyEvilSnowman.addTrait(new Physics());
        enemyEvilSnowman.addTrait(new Solid());
        enemyEvilSnowman.addTrait(new BehaviorEnemyEvilSnowman());
        enemyEvilSnowman.addTrait(new Killable());

        enemyEvilSnowman.draw = drawEnemyEvilSnowman;

        return enemyEvilSnowman;
    };
}
