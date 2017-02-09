var SearchEngine = {

    /**
     * Text of the last search query.
     *
     * @type {string}
     */
    lastSearch: '',

    /**
     * A jQuery object representing the search field.
     *
     * @type {object}
     */
    searchField: null,

    /**
     * Initialize event listeners.
     */
    init: function () {
        SearchEngine.searchField = $('#searchField');

        // When typing something in search field.
        SearchEngine.searchField.keyup(function (event) {
            // Escape button
            if (event.which == 27) {
                Player.expend();
                // Hide result without clearing result list.
                return SearchEngine.hideResults(false);
            }

            var fulltext = $.trim($(this).val());

            if (fulltext == "") {
                Player.expend();
                return SearchEngine.hideResults(true);
            }

            // If user typed enough chars and search terms are different from the last search.
            if (fulltext.length > 3 && fulltext != SearchEngine.lastSearch) {
                Player.reduce();
                SearchEngine.lastSearch = fulltext;
                SearchEngine._apiCall(fulltext);
            }

        });

        // When search field loses focus.
        SearchEngine.searchField.focusout(function() {
            Player.expend();

            // Hide result without clearing result list.
            SearchEngine.hideResults(false);
        });

        // Display last search's results when sibling search field.
        SearchEngine.searchField.focusin(function() {
            Player.reduce();
            SearchEngine.showResults();
        });
    },

    /**
     * Hide result wrapper.
     *
     * @param {boolean} clearContent : clear results if TRUE (optional).
     */
    hideResults: function (clearContent) {
        var wrapper = $('#ResultWrapper');

        wrapper.removeClass('opened');

        if (typeof clearContent == 'boolean' && clearContent == true) {
            wrapper.html('');
        }
    },

    /**
     * Show result wrapper.
     */
    showResults: function () {
        $('#ResultWrapper').addClass('opened');
    },

    /**
     * Make a call to the API to get episodes matching given search terms.
     *
     * @param {string} fulltext : the string to look for.
     * @private
     */
    _apiCall: function (fulltext) {
        $.ajax({
            method: 'GET',
            contentType: 'application/json',
            timeout: 2000,
            // url: Routing.generate('app.api.episodes.get', {fulltext: fulltext}),
            url: '/api/v1/episodes',
            data: {
                fulltext: fulltext,
            }
        }).done(function (data) {
            SearchEngine._displayResult(data);
        }).fail(function (data) {
            Modal.open("Désolé, le système à quité inopinément suite à une erreur numéro 72");
            console.log(data);
        });
    },

    /**
     * Display results got from API call.
     *
     * @param {Array} results : the list of results.
     * @private
     */
    _displayResult: function (results) {
        var content = $('<ul>', {id: 'ResultList'});

        for (var i = 0; i < results.length; i++) {
            // Episode item.
            var episode = results[i];

            var item = $('<li>', {
                'class': 'ResultItem',
                'data-nb': episode.number,
            }).append($('<span>', {
                class: 'ResultItem-title',
                html: SearchEngine._highlightString(episode.title),
            }));

            // Episode's category.
            if (typeof episode.category != 'undefined') {
                item.append($('<span>', {
                    class: 'ResultItem-category',
                    html: SearchEngine._highlightString(episode.category.name),
                }));
            }

            // Episode's keywords.
            if (episode.keywords != "" && episode.keywords != null) {
                var highlight = SearchEngine._highlightKeywords(episode.keywords);

                item.append($('<span>', {
                    class: 'ResultItem-keywords',
                    html: highlight,
                }));
            }

            // Event listener when click on a result item.
            item.click(function () {
                var nb = $(this).attr('data-nb');

                Player.playEpisodeNb(nb);

                $('#ResultWrapper').removeClass('opened');
            });

            content.append(item);
        }

        if (!results.length) {
            content.append($('<li>', {
                html: 'Aucun résultat pour <i>' + SearchEngine.lastSearch + '</i>',
            }));
        }

        $('#ResultWrapper').html(content).addClass('opened');
    },

    /**
     * Highlight search terms in the given string.
     * None case sensitive.
     *
     * @param {string} string
     * @returns {string}
     * @private
     */
    _highlightString: function(string) {
        var highlight = '';

        var index = string.toLowerCase().indexOf(SearchEngine.lastSearch.toLowerCase());

        if (index != -1) {
            // Get possible chars before search terms.
            highlight += string.substr(0, index);

            // Highlight search terms.
            highlight += '<span class="highlight">' + string.substr(index, SearchEngine.lastSearch.length) + '</span>';

            // Get possible chars after search terms.
            highlight += string.substr(index + SearchEngine.lastSearch.length);
        }

        if (highlight == '') {
            return string;
        }

        return highlight;
    },

    /**
     * Highlight search terms in the given string and truncate result string adding ellipsis before and after.
     * None case sensitive.
     *
     * @param {string} keywords : the full string containing all keywords of an episode.
     * @returns {string}
     * @private
     */
    _highlightKeywords: function (keywords) {
        // Total length of the sentence.
        var totalLength = 50;

        // Nb of chars before the fulltext string.
        var charsBefore = 10;

        // Find index of the fulltext string in keywords.
        var index = keywords.toLowerCase().indexOf(SearchEngine.lastSearch.toLowerCase());

        var highlight = '';

        // Take few chars before and after the fulltext string.
        if (index != -1) {
            var rest = totalLength - charsBefore - SearchEngine.lastSearch.length;

            if (rest < 0) {
                rest = 0;
            }

            // Prepend ellipsis.
            highlight += '...';

            // Get few chars before the fulltext string.
            highlight += keywords.substr(index - charsBefore, charsBefore);

            // Highlight the fulltext string.
            highlight += '<span class="highlight">' + keywords.substr(index, SearchEngine.lastSearch.length) + '</span>';

            // Get few chars after the fulltext string.
            highlight += keywords.substr(index + SearchEngine.lastSearch.length, rest);

            // Append ellipsis.
            highlight += '...';
        }

        return highlight;
    },
};