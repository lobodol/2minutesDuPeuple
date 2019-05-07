export default class Result {
	/**
	 * Result constructor
	 *
	 * @param {Track}  track
	 * @param {string} keywords
	 * @param {string} fulltext Search text used to search for the track
	 */
	constructor(track, keywords, fulltext) {
		this.track    = track;
		this.keywords = keywords;
		this.fulltext = fulltext;
	}

	/**
	 * @return {Element}
	 */
	render() {
		return this._buildElement();
	}

	/**
	 * @return {HTMLElement}
	 * @private
	 */
	_buildElement() {
		let element = document.createElement('li');

		element.classList.add('ResultItem');
		element.setAttribute('data-id', this.track.id);
		element.innerHTML = `
			<span class="ResultItem-title">${this._highlight(this.track.title)}</span>
			<span class="ResultItem-category">${this.track.category ? this._highlight(this.track.category) : ''}</span>
			<span class="ResultItem-keywords">${this.keywords ? this._highlight(this.keywords) : ''}</span>
		`;

		return element;
	}

	/**
	 * Highlight needle if found if haystack
	 *
	 * @param {string} haystack The text to highlight in haystack
	 * @return {string}
	 * @private
	 */
	_highlight(haystack) {
		let index = haystack.toLowerCase().indexOf(this.fulltext.toLowerCase());

		if (index >= 0) {
			haystack = haystack.substring(0,index) + "<span class='highlight'>" + haystack.substring(index, index+this.fulltext.length) + "</span>" + haystack.substring(index + this.fulltext.length);
		}

		return haystack;
	}
}
