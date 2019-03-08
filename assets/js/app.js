import Utils  from './Utils';
import Player from './player/Player';
import Search from './Search';

const utils  = new Utils;
const player = new Player(utils);
const search = new Search(player, document.querySelector('#SearchForm'));

player.init(
	document.querySelector('.Control-play'),
	document.querySelector('.Control-next'),
	document.querySelector('.Control-prev'),
	document.querySelector('.Control-shuffle'),
	document.querySelector('.Control-loop')
);

search.init();
