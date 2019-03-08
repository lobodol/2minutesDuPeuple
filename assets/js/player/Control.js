/**
 * A control button of the player
 */
export default class Control {

	/**
	 * Control constructor
	 *
	 * @param {Element} element
	 */
	constructor(element) {
		this.element = element;
	}

	/**
	 * Syntactic sugar to bind a click event on the DOM element
	 *
	 * @param {function} callback
	 */
	click(callback) {
		this.element.addEventListener('click', ev => callback(ev));
	}

	/**
	 * Simple method to toggle status of the control button (enabled/disabled)
	 */
	toggleEnabled() {
		this.element.classList.toggle('Control--disabled');
	}
}
