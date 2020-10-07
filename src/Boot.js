class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }
    preload() {
        this.load.image('background', 'resources/poker_table.jpg');
        this.load.image('loading-background', 'resources/loading-background.png');
    }
    create() {
        Cambio.world = {
            width: this.cameras.main.width,
            height: this.cameras.main.height,
            centerX: this.cameras.main.centerX,
            centerY: this.cameras.main.centerY
        };
        Cambio.Lang.updateLanguage('en');
        Cambio.text = Cambio.Lang.text[Cambio.Lang.current];
        this.scene.start('Preloader');
    }
}