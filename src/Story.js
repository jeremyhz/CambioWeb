class Story extends Phaser.Scene {
    constructor() {
        super('Story');
    }

    create ()
    {
        var background = this.add.sprite(Cambio.world.centerX, Cambio.world.centerY, 'background');
        background.setScale(scaleRatio, scaleRatio);

        //  Create a stack of random cards
        var frames = this.textures.get('cards').getFrameNames();

        var x = 100;
        var y = 100;

        for (var i = 0; i < 64; i++)
        {
            var image = this.add.image(x, y, 'cards', Phaser.Math.RND.pick(frames)).setInteractive();
            image.setScale(scaleRatio*2);

            this.input.setDraggable(image);

            x += 4;
            y += 4;
        }

        this.input.on('dragstart', function (pointer, gameObject) {

            this.children.bringToTop(gameObject);

        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        });

        this.cameras.main.fadeIn(250);

    }
}