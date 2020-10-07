class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
        this.bgFilesLoaded = false;
    }
    create() {
        var background = this.add.sprite(Cambio.world.centerX, Cambio.world.centerY, 'background');
        background.setScale(scaleRatio, scaleRatio);

        this.waitingForSettings = false;
        var centerY = Cambio.world.centerY;
        var height = Cambio.world.height;
        var title = this.add.sprite(Cambio.world.centerX, centerY-height*0.3, 'title');
        title.setOrigin(0.5);
        title.setScale(scaleRatio, scaleRatio);

        this.input.keyboard.on('keydown', this.handleKey, this);

        this.tweens.add({targets: title, angle: title.angle-2, duration: 1000, ease: 'Sine.easeInOut' });
        this.tweens.add({targets: title, angle: title.angle+4, duration: 2000, ease: 'Sine.easeInOut', yoyo: 1, loop: -1, delay: 1000 });

        this.buttonStart = new Button(Cambio.world.centerX, centerY-height*0.025, 'button-start', this.clickStart, this);
        this.buttonStart.setScale(scaleRatio, scaleRatio);
        this.buttonJoin = new Button(Cambio.world.centerX, centerY+height*0.15, 'button-join', this.clickJoin, this);
        this.buttonJoin.setScale(scaleRatio, scaleRatio);

        this.tweens.add({targets: this.buttonStart, x: Cambio.world.centerX, duration: 500, ease: 'Back'});
        this.tweens.add({targets: this.buttonJoin, x: Cambio.world.centerX, duration: 500, ease: 'Back'});

        this.cameras.main.fadeIn(250);

        if(!this.bgFilesLoaded) {
            this.time.addEvent({
                delay: 500,
                callback: function() {
                    this.startPreloadInTheBackground();
                },
                callbackScope: this
            }, this);
        }
    }
    handleKey(e) {
        switch(e.code) {
            case 'KeyS': {
                this.clickStart();
                break;
            }
            case 'KeyJ': {
                this.clickJoin();
                break;
            }
            default: {}
        }
    }
    clickStart() {
        if(this.bgFilesLoaded) {
            if(this.loadImage) {
                this.loadImage.destroy();
            }
            Cambio.fadeOutScene('Story', this);
        }
        else {
            var animationFrames = this.anims.generateFrameNumbers('loader');
            animationFrames.pop();
            this.waitingForStart = true;
            this.buttonStart.setAlpha(0.1);
            var loadAnimation = this.anims.create({
                key: 'loading',
                frames: animationFrames,
                frameRate: 12,
                repeat: -1
            });
            this.loadImage = this.add.sprite(Cambio.world.centerX, Cambio.world.centerY, 'loader').setScale(scaleRatio*3);
            this.loadImage.play('loading');
        }
    }
    clickJoin() {
        if(this.bgFilesLoaded) {
            if(this.loadImage) {
                this.loadImage.destroy();
            }
            // Cambio.fadeOutScene('Story', this);
        }
        else {
            var animationFrames = this.anims.generateFrameNumbers('loader');
            animationFrames.pop();
            this.waitingForJoin = true;
            this.buttonJoin.setAlpha(0.1);
            var loadAnimation = this.anims.create({
                key: 'loading',
                frames: animationFrames,
                frameRate: 12,
                repeat: -1
            });
            this.loadImage = this.add.sprite(Cambio.world.centerX, Cambio.world.centerY, 'loader').setScale(scaleRatio*3);
            this.loadImage.play('loading');
        }
    }
    startPreloadInTheBackground() {
        console.log('[Cambio] Starting background loading...');
        this.load.atlas('cards', 'resources/cards.png','resources/cards.json');
        this.load.once('filecomplete', this.addFiles, this);
        this.load.start();
    }
    addFiles() {
        var resources = {
            // 'image': [
                // ['clickme', 'img/clickme.png'],
                // ['overlay', 'img/overlay.png'],
                // ['button-beer', 'img/button-beer.png'],
                // ['banner-beer', 'img/banner-beer.png'],
                // ['particle', 'img/particle.png']
            // ],
            // 'spritesheet': [
                // ['button-continue', 'img/button-continue.png', {frameWidth:180,frameHeight:180}],
                // ['button-mainmenu', 'img/button-mainmenu.png', {frameWidth:180,frameHeight:180}],
                // ['button-restart', 'img/button-tryagain.png', {frameWidth:180,frameHeight:180}],
                // ['button-achievements', 'img/button-achievements.png', {frameWidth:110,frameHeight:110}],
                // ['button-pause', 'img/button-pause.png', {frameWidth:80,frameHeight:80}],
                // ['button-credits', 'img/button-credits.png', {frameWidth:80,frameHeight:80}],
                // ['button-sound-on', 'img/button-sound-on.png', {frameWidth:80,frameHeight:80}],
                // ['button-sound-off', 'img/button-sound-off.png', {frameWidth:80,frameHeight:80}],
                // ['button-music-on', 'img/button-music-on.png', {frameWidth:80,frameHeight:80}],
                // ['button-music-off', 'img/button-music-off.png', {frameWidth:80,frameHeight:80}],
                // ['button-back', 'img/button-back.png', {frameWidth:70,frameHeight:70}]
            // ]
        };            
        for(var method in resources) {
            resources[method].forEach(function(args) {
                var loader = this.load[method];
                loader && loader.apply(this.load, args);
            }, this);
        };
        this.load.on('complete', function(){
            console.log('[Cambio] All files loaded in the background.');
            this.bgFilesLoaded = true;
            if(this.waitingForJoin) {
                this.clickJoin();
            }
            if(this.waitingForStart) {
                this.clickStart();
            }            
        }, this);
    }
}