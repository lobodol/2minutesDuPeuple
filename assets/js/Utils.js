export default class Utils {

	/**
	 * Return whether the given element is visible in the current window (no need to scroll to see it)
	 *
	 * @param {object} element
	 * @return {boolean}
	 */
	isScrolledIntoView(element) {
		const pageTop    = window.scrollY;
		const pageBottom = pageTop + window.innerHeight;

		const elementTop    = element.offsetTop;
		const elementBottom = elementTop + element.offsetHeight;

		if (this.isBiggerThanWindow(element)) {
			return elementTop < pageBottom && elementBottom > pageTop;
		}

		return elementTop > pageTop && elementBottom < pageBottom;
	}

	/**
	 * Scroll to the given element if is not into view
	 *
	 * @param {object} element
	 */
	scrollTo(element) {
		if (true || !this.isScrolledIntoView(element)) {
			let scrollValue = element.offsetY - 100;

			window.scroll(0, scrollValue);
		}
	}

	/**
	 * Return whether the given element's height is bigger than window's height
	 *
	 * @param {object} element
	 * @return {boolean}
	 */
	isBiggerThanWindow(element) {
		return element.offsetHeight > window.innerHeight;
	}

	/**
	 * Randomly shuffle the given array
	 *
	 * @param {array} list
	 * @return {*}
	 */
	shuffle(list) {
		for (let j, x, i = list.length; i; j = Math.floor(Math.random() * i), x = list[--i], list[i] = list[j], list[j] = x);

		return list;
	}

	/**
	 * Update page title
	 *
	 * @param {Track} track
	 */
	updatePageTitle(track) {
		let title = track.title + (track.category ? ' - ' + track.category : '');

		document.title = title;

		// Update media information for Chrome.
		if ('mediaSession' in navigator) {
			navigator.mediaSession.metadata.title = title;
			navigator.mediaSession.metadata.album = track.category;
		}
	}

	/**
	 * Compute offset of given element
	 *
	 * @param {Element} element
	 * @return {{top: number, left: number}}
	 */
	offset(element) {
		let rect = element.getBoundingClientRect(), bodyElt = document.body;
		return {
			top: rect.top + bodyElt .scrollTop,
			left: rect.left + bodyElt .scrollLeft
		}
	}
}
