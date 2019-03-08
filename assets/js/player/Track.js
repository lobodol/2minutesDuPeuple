export default class Track {

	/**
	 * Track constructor
	 *
	 * @param {Element} track
	 */
	constructor(track) {
		this.file     = track.getAttribute('data-file');
		this.id       = track.getAttribute('data-id');
		this.title    = track.querySelector('.TrackItem-title').innerHTML;
		this.category = track.querySelector('.TrackItem-category').innerHTML;
		this.element  = track;
	}

	/**
	 * Set this track as current one
	 */
	setCurrent() {
		this.element.classList.add('TrackItem--current');
	}

	/**
	 * Unset this track as current one
	 */
	unsetCurrent() {
		this.element.classList.remove('TrackItem--current');
	}
}
