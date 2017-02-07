/**
 * Player du peuple.
 */
var Player = {

    /**
     * Instance of the HTML5 player object.
     *
     * @type {Object}
     */
    player: null,

    /**
     * List of episode numbers. Episodes are played in that order.
     */
    playlist: [],

    /**
     * Loop mode : TRUE if activated, FALSE otherwise.
     *
     * @type {boolean}
     */
    loop: true,

    /**
     * A DOM object representing the current episode.
     *
     * @type {Object}
     */
    current: null,

    /**
     * If TRUE, play automatically next episode when current is ended.
     *
     * @type {boolean}
     */
    autoplay: true,

    /**
     * Initialize player.
     */
    init: function () {
        Player._initPlaylist();
        Player._initAudioPlayer();
        Player._initControls();
    },

    /**
     * Play an episode identified by its data-nb.
     *
     * @param {Number} nb
     */
    playEpisodeNb: function(nb) {
        // Find episode in playlist.
        var index = Player.playlist.indexOf(nb);

        if (index != -1) {
            var episode = $('.EpisodeItem[data-nb=' + nb + ']');

            // And play it.
            Player._playEpisode(episode);
        }
    },

    /**
     * Initialize audio player object.
     * TODO: auto play episode when using anchor (share link).
     *
     * @private
     */
    _initAudioPlayer: function () {
        // By default, load first episode.
        Player.current = $('.EpisodeItem').first();
        Player.player = new Audio(Player.current.attr('data-mp3'));

        // Listeners for progress bar and timing.
        Player.player.addEventListener('loadedmetadata', function () {
            $('#Player-maxTime').text(Player._timeToString(Player.player.duration));
        });

        // Each time duration is updated, update progress bar and timing.
        Player.player.addEventListener('timeupdate', function () {
            // Convert duration time to percent.
            var percent = Math.round((Player.player.currentTime / Player.player.duration) * 100);

            $('#Player-duration').css('width', percent + "%");
            $('#Player-currentTime').text(Player._timeToString(Player.player.currentTime));
        }, false);

        // Listener for autoplay.
        Player.player.addEventListener('ended', function () {
            if (Player.autoplay) {
                Player._nextTrack();
            }
        });
    },

    /**
     * Initialize playlist.
     *
     * @private
     */
    _initPlaylist: function() {
        Player.playlist = [];

        $('.EpisodeItem').each(function (index, item) {
            var nb = $(item).attr('data-nb');

            if (typeof nb != 'undefined') {
                Player.playlist.push(nb);
            }
        })
    },

    /**
     * Play the given episode.
     *
     * @param {Object} episode : a DOM object representing an episode.
     * @private
     */
    _playEpisode: function (episode) {
        if ($('#PlayerControls-playpause').hasClass('play')) {
            $('#PlayerControls-playpause').removeClass('play').addClass('pause');
        }

        $('.EpisodeItem').removeClass('active');
        $(episode).addClass('active');

        Player._updatePageTitle(episode);

        Player.player.src = $(episode).attr('data-mp3');
        Player.player.load();
        Player.player.play();
        Player.current = episode;

        // If new episode is not in the visible area, scroll to it.
        if (!isScrolledIntoView(episode)) {
            var scrollValue = $(episode).offset().top - 100;

            $('html, body').animate({
                scrollTop: scrollValue + "px"
            }, 200);
        }
    },

    /**
     * Extract information from current episode and update page's title.
     *
     * @param {Object} episode : the episode object.
     * @private
     */
    _updatePageTitle: function(episode) {
        var pageTitle = $(episode).children('.EpisodeItem-title').html();

        if ($(episode).children('.EpisodeItem-category').length) {
            pageTitle += ' - ' + $(episode).children('.EpisodeItem-category').html();
        }

        // Update page's title.
        $('title').html(pageTitle);
        $('#Player-currentEpisode').html(pageTitle);
    },

    /**
     * Initialize player's controls.
     *
     * @private
     */
    _initControls: function () {
        // Play/Pause.
        $('#PlayerControls-playpause').click(function() {
            if (Player.player.paused) {
                $(this).removeClass().addClass('pause');

                Player.player.play();
            } else {
                $(this).removeClass().addClass('play');

                Player.player.pause();
            }
        });

        // Previous Track.
        $('#PlayerControls-prev').click(function() {
            if ($('#PlayerControls-playpause').hasClass('play')) {
                $('#PlayerControls-playpause').removeClass().addClass('pause');
            }

            Player._previousTrack();
        });

        // Next Track.
        $('#PlayerControls-next').click(function() {
            if ($('#PlayerControls-playpause').hasClass('play')) {
                $('#PlayerControls-playpause').removeClass().addClass('pause');
            }

            Player._nextTrack();
        });

        // Enable/disable shuffleMode mode.
        $('#PlayerControls-shuffleMode').click(function() {
            $(this).toggleClass('random');

            if ($(this).hasClass('random')) {
                Player.playlist = shuffle(Player.playlist);
            } else {
                Player._initPlaylist();
            }
        });

        // Enable/disable loop mode.
        $('#PlayerControls-loop').click(function() {
            Player.loop = !Player.loop;

            $(this).removeClass();

            if (Player.loop) {
                $(this).addClass("loop");
            }
        });

        // Jump to time.
        $('#Player-progressBar').click(function(e) {
            var offset   = $(this).offset();
            var position = e.pageX - offset.left;
            var percent  = (position / $(this).width());

            Player.player.currentTime = Math.floor(percent * duration);
        });

        // Directly click on an episode.
        $('.EpisodeItem').click(function() {
            Player._playEpisode($(this));
        });
    },

    /**
     * Format a duration in seconds into a string like xx:yy.
     *
     * @param {Number} time : a duration in seconds.
     * @returns {string}
     * @private
     */
    _timeToString: function (time) {
        if (isNaN(time)) {
            return '';
        }

        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time - minutes * 60);

        seconds = (seconds.toString().length <= 1) ? "0" + seconds : seconds;

        return minutes + ":" + seconds;
    },

    /**
     * Find the net episode and play it.
     *
     * @private
     */
    _nextTrack: function () {
        // Find current episode in playlist.
        var index = Player.playlist.indexOf(Player.current.attr('data-nb'));

        // By default, get the first episode of the playlist.
        var nb = Player.playlist[0];

        if (index != -1 && typeof Player.playlist[index+1] != 'undefined') {
            nb = Player.playlist[index+1];
        }

        var next = $('.EpisodeItem[data-nb=' + nb + ']');

        // And play it.
        Player._playEpisode(next);
    },

    /**
     * Find the previous episode and play it.
     *
     * @private
     */
    _previousTrack: function () {
        // Find current episode in playlist.
        var index = Player.playlist.indexOf(Player.current.attr('data-nb'));

        // By default, get the last episode of the playlist.
        var nb = Player.playlist[Player.playlist.length - 1];

        if (index != -1 && typeof Player.playlist[index-1] != 'undefined') {
            nb = Player.playlist[index-1];
        }

        var prev = $('.EpisodeItem[data-nb=' + nb + ']');

        // And play it.
        Player._playEpisode(prev);
    }

};