import Utils from './Utils';
import Player from './Player';

const utils = new Utils;
const player = new Player(utils);

player.init(
	document.querySelector('.Control-play'),
	document.querySelector('.Control-next'),
	document.querySelector('.Control-prev'),
	document.querySelector('.Control-shuffle'),
	document.querySelector('.Control-loop')
);
