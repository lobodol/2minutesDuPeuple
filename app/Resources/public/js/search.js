var SearchEngine = {

    /**
     * Text of the last search query.
     *
     * @type {string}
     */
    lastSearch: '',

    /**
     * Initialize event listeners.
     */
    init: function () {
        $('#searchField').keyup(function (ev) {
            // Escape button
            if (event.which == 27) {
                $('#ResultWrapper').fadeOut();

                return;
            }

            var fulltext = $.trim($(this).val());

            if (fulltext == "") {
                return $('#ResultWrapper').html('').hide();
            }

            if (fulltext.length > 3 && fulltext != SearchEngine.lastSearch) {
                SearchEngine.lastSearch = fulltext;
                SearchEngine._apiCall(fulltext);
            }

        });
    },

    /**
     * Make a call to API to get episodes matching given string.
     *
     * @param {string} fulltext : the string to look for.
     * @private
     */
    _apiCall: function (fulltext) {
        $.ajax({
            method: 'GET',
            contentType: 'application/json',
            timeout: 2000,
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
        var content = '';


        for (var i = 0; i < results.length; i++) {
            var episode = results[i];
            content += "<li class='ResultItem' data-nb='" + episode.number + "'><span>" + episode.title + "</span>";

            if (episode.category != "") {
                content += "<span class='details'>" + episode.category.name + "</span>";
            }

            if (episode.keywords != "" && episode.keywords != null) {
                content += '<span class="keywords">'+ episode.keywords +'</span>';
            }

            content += "</li>";
        }

        $('#ResultWrapper').html(content).show();

        // When click on an episode in the result list.
        $('.ResultItem').click(function() {
            var nb = $(this).attr('data-nb');

            Player.playEpisodeNb(nb);
        });
    }
};