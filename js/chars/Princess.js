const PRINCESS = {
    imageURL: 'img/princess.png',
    frames: [
        {
            name: 'frame-1',
            rect: [0, 0, 52, 96]
        },
        {
            name: 'frame-2',
            rect: [52, 0, 52, 96]
        }
    ],
    animations: [
        {
            name: 'anim',
            frameLen: 0.2,
            frames: [
                'frame-1',
                'frame-2',

            ]
        }
    ]
};

function loadPrincess() {
    return loadSpriteSheet(PRINCESS)
        .then(createPrincessFactory);
}


class BehaviorPrincess extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        them.run.speed = 0;
        script();
        return;
       }

       update() {

       }
}


function createPrincessFactory(sprite) {
    const standAnim = sprite.animations.get('anim');

    function routeAnim(princess) {
        return standAnim(princess.lifetime);
    }

    function drawPrincess(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createPrincess() {
        const princess = new Entity();
        princess.size.set(64, 96);
        princess.offset.x = -300;

        princess.addTrait(new Physics());
        princess.addTrait(new Solid());
        princess.addTrait(new BehaviorPrincess());

        princess.draw = drawPrincess;

        return princess;
    };
}
