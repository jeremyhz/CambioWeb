var gameConfig = {
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: window.innerWidth * window.devicePixelRatio,
		height: window.innerHeight * window.devicePixelRatio
	},
	scene: [Boot, Preloader, MainMenu, Story]
}
game = new Phaser.Game(gameConfig);
window.focus();