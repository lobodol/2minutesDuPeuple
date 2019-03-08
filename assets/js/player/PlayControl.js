import Control from './Control';

/**
 * Special class for play/pause button
 */
export default class PlayControl extends Control {

	play() {
		this.element.classList.remove('Control--paused');
	}

	pause() {
		this.element.classList.add('Control--paused');
	}
}
