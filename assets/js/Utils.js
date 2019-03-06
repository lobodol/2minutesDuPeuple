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
}
