/**
 * Shuffle an array randomly.
 *
 * @param {Array} o
 */
function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);

    return o;
}

/**
 * Returns TRUE if an element is visible without scrolling, FALSE otherwise.
 *
 * @param {Object} elem : object to check visibility
 * @return {boolean}
 */
function isScrolledIntoView(elem) {
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= (docViewBottom - 170)) && (elemTop >= docViewTop));
}