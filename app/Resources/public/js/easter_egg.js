/**
 * Easter egg.
 */
var EasterEgg = {

    /**
     * Counter for click on main logo.
     *
     * {number}
     */
    clickCounter: 0,

    /**
     * Initialize easter egg.
     */
    init: function () {
        $('#logo').click(function() {
            EasterEgg.clickCounter++;

            if (EasterEgg.clickCounter >= 10) {
                // Reset click counter.
                EasterEgg.clickCounter = 0;

                // Then, magic begins...
                EasterEgg._doMagicStuff();

            }
        });
    },

    /**
     * All magic happens here !
     * TODO
     *
     * @private
     */
    _doMagicStuff: function() {
        alert("Bravo tu as découvert l'easter egg !");
    }
};