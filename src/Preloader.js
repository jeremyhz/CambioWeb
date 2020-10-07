class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }
    preload() {
		var background = this.add.sprite(Cambio.world.centerX, Cambio.world.centerY, 'background');
		background.setScale(scaleRatio, scaleRatio);
		var loadingBg = this.add.sprite(Cambio.world.centerX, Cambio.world.centerY+100, 'loading-background');
		loadingBg.setOrigin(0.5, 0.5);

		var progress = this.add.graphics();
		this.load.on('progress', function (value) {
			progress.clear();
			progress.fillStyle(0xffde00, 1);
			progress.fillRect(loadingBg.x-(loadingBg.width*0.5)+20, loadingBg.y-(loadingBg.height*0.5)+10, 540 * value, 25);
		});

		var resources = {
			'image': [
				['title', 'resources/logo.png']
			],
			'spritesheet': [
				['button-start', 'resources/start_button.png', {frameWidth:1060,frameHeight:312}],
				['button-join', 'resources/join_button.png', {frameWidth:1060,frameHeight:312}],
				['loader', 'resources/loader.png', {frameWidth:45,frameHeight:45}]
			]
		};
		for(var method in resources) {
			resources[method].forEach(function(args) {
				var loader = this.load[method];
				loader && loader.apply(this.load, args);
			}, this);
		};
    }
    create() {
		Cambio.fadeOutScene('MainMenu', this);
	}
}