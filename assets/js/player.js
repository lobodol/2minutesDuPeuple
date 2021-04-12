// Declaration of global variables
let default_track = 'mp3/0003.mp3';
let track_id      = new URLSearchParams(window.location.search).get('e')
let track_time    = new URLSearchParams(window.location.search).get('t') || 0

let track = document.getElementById(track_id);
if (null !== track) {
	default_track = track.querySelector('a').href
	document.querySelector('li.active').classList.remove('active')
	track.classList.add('active')
	updateShareLinks(track_id)
	scrollToElement(track_id)
}

let player = new Audio(default_track);
player.currentTime = parseInt(track_time)
let duration;
let playlist = $('#listEpisodes');
let episodes = [];
let lastSearch = '';

$(function () {
	init();
	focusSearch();
});

/**
 * Focus search field when Ctrl+F is typed.
 */
function focusSearch() {
	let ctrlDown = false,
	    ctrlKey  = 17,
	    cmdKey   = 91,
	    fKey     = 70;

	$(document).keydown(function (ev) {
		if (ev.which === ctrlKey || ev.which === cmdKey) {
			ctrlDown = true;
		}

		if (ctrlDown && ev.which === fKey) {
			$('#cherche').focus();
			return false; // Prevent default behavior
		}
	}).keyup(function (ev) {
		if (ev.which === ctrlKey || ev.which === cmdKey) {
			ctrlDown = false;
		}
	});
}

/**
 * Returns TRUE if user agent is mobile
 *
 * @returns {boolean}
 */
function isMobile() {
	let isMobile = false; //initiate as false

	// device detection
	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
		navigator.userAgent)
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
			navigator.userAgent.substr(0, 4))) {
		isMobile = true;
	}

	return isMobile;
}

/**
 * Initialize the player commands
 */
function init() {
	let len = playlist.find('li').length - 1;
	let random = false;
	let loop = true;
	let current = 0;

	// Listeners for progress bar and timing
	player.addEventListener('loadedmetadata', function () {
		duration = player.duration;
		$('#maxTime').text(calculateDuration(duration));
	});

	player.addEventListener('timeupdate', function () {
		let currentTime = player.currentTime;
		updateShareLinks(current, currentTime)
		let percent = Math.round((
			currentTime / duration
		) * 100);

		$('#duration').css('width', percent + "%");
		$('#currentTime').text(calculateDuration(currentTime));
	}, false);

	// Listener for autoplay
	player.addEventListener('ended', function (e) {
		current = next(current, len, random);
	});

	// Listener for tracks in playlist
	playlist.find('a').click(function (e) {
		e.preventDefault();
		link = $(this);
		current = link.parent().index(); // Update the current variable

		if ($('#playpause').hasClass('play')) {
			$('#playpause').removeClass()
				.addClass('pause');

		}

		run(link);
	});

	// Prevent link action if Desktop mode
	if (!isMobile()) {
		$('#loupe').click(function (e) {
			e.preventDefault();
		});
	}

	/************************
	 * Litener for research *
	 ************************/
	$('#cherche').keyup(function (event) {
		// Escape button
		if (event.which == 27) {
			$('#list-results').fadeOut();

			return;
		}

		let fulltext = $.trim($(this).val());

		if (fulltext == "") {
			$('#list-results').html("").hide();
			$('#loupe').show();
			$('#croix').hide();
		}
		else {
			if (!isMobile()) {
				$('#loupe').hide();
			}
			$('#croix').show();
		}

		if (fulltext.length > 3 && fulltext != lastSearch) {
			lastSearch = fulltext;

			startLoading();

			$.ajax({
				url:    'search.php',
				method: 'POST',
				data:   {'fulltext': fulltext}
			}).done(function (json) {
				let data = JSON.parse(json);
				let content = '';

				if (data.length == 0) {
					content = "<li>Aucun résultat pour <i>" + fulltext + "</i></li>";
				}

				// Append results to the result list
				for (let i = 0; i < data.length; i++) {
					let object = data[i];
					content += "<li data-nb='" + object.episode_nr + "'><span>" + object.titre
						+ "</span>";

					if (object.details != "") {
						content += "<span class='details'>" + object.details + "</span>";
					}

					if (object.keywords != "" && object.keywords != null) {
						content += '<span class="keywords">' + object.keywords + '</span>';
					}

					content += "</li>";
				}
				;

				$('#list-results').html(content).show();

				// When a track is selected in the result list
				$('#list-results li').click(function () {
					$('#list-results').hide();
					let nb = formatId($(this).attr('data-nb'));
					let id = $('#listEpisodes li[data-nb=' + nb + ']').attr('id');
					id = parseInt(id) - 1; // Get the track ID just before the wanted one
					let len = playlist.find('li').length - 1;

					current = next(id, len, false);

					if ($('#playpause').hasClass('play')) {
						$('#playpause').removeClass()
							.addClass('pause');

					}
				});
			}).fail(function () {
				displayModale("Une erreur est survenue lors de la recherche rapide");
			}).always(function () {
				stopLoading();
			});
		}
	});

	$('#recherche').focusin(function () {
		let search = $('#cherche').val();

		if (search.length >= 4) {
			$('#list-results').fadeIn();
		}
	});

	$('#recherche').focusout(function () {
		$('#list-results').fadeOut();
	});

	$('#croix').click(function () {
		$('#cherche').val('');
		$(this).hide();
		$('#loupe').show();
	});

	/**************************
	 * Listeners for controls *
	 **************************/
	// Play/Pause
	$('#playpause').click(function () {
		if (player.paused) {
			$(this).removeClass()
				.addClass('pause');

			player.play(function () {
				start = new Date();
			});
		}
		else {
			$(this).removeClass()
				.addClass('play');

			player.pause(function () {
				stop = new Date();
			});
		}
	});

	// Previous Track
	$('#prev').click(function () {
		if ($('#playpause').hasClass('play')) {
			$('#playpause').removeClass()
				.addClass('pause');

		}
		current = previous(current, len, random);
	});

	// Next Track
	$('#next').click(function () {
		current = next(current, len, random);

		if ($('#playpause').hasClass('play')) {
			$('#playpause').removeClass()
				.addClass('pause');

		}
	});

	// Enable/disable shuffle mode
	$('#shuffle').click(function () {
		random = !random;
		$(this).removeClass();

		if (random) {
			episodes = shuffle(initArray(len));
			$(this).addClass("random");
		}
	});

	// Enable/disable loop mode
	$('#loop').click(function () {
		loop = !loop;
		$(this).removeClass();

		if (loop) {
			$(this).addClass("loop");
		}
	});

	// Jump to time track
	$('#progressBar').click(function (e) {
		let offset = $(this).offset();
		let position = e.pageX - offset.left;
		let percent = (
			position / $(this).width()
		);
		let goTo = Math.floor(percent * duration);

		player.currentTime = goTo;
	});

	initMediaSession();
}

/**
 * Init media notifications for Chrome Android.
 * This allow to play/pause/prev/next directly in notification
 */
function initMediaSession() {
	$episode = $('#listEpisodes .active');
	let titre = ''
	let details = ''

	if ($episode.length === 1) {
		titre = $episode.find('span:first-child').html();
		details = $episode.find('.details').html();
	}

	if ('mediaSession' in navigator) {
		navigator.mediaSession.metadata = new MediaMetadata({
			title: titre ? titre : '',
			album: details ? details : ''/*,
				artwork: [
					{ src: 'https://dummyimage.com/512x512', sizes: '512x512', type: 'image/png' }
				]*/
		});

		navigator.mediaSession.setActionHandler('play', function () {
			$('#playpause').trigger('click');
		});

		navigator.mediaSession.setActionHandler('pause', function () {
			$('#playpause').trigger('click');
		});

		navigator.mediaSession.setActionHandler('previoustrack', function () {
			$('#prev').trigger('click');
		});

		navigator.mediaSession.setActionHandler('nexttrack', function () {
			$('#next').trigger('click');
		});
	}
}

/**
 * Return a string mm:ss from a duration in seconds
 *
 * @param integer time : number of seconds to convert
 * @return string
 */
function calculateDuration(time) {
	if (isNaN(time)) {
		return;
	}

	let minutes = Math.floor(time / 60);
	let seconds = Math.floor(time - minutes * 60);

	seconds = (
		seconds.toString().length <= 1
	) ? "0" + seconds : seconds;

	return minutes + ":" + seconds;
}

/**
 * Jump to the next track
 *
 * @param {number}  current : id of the current episode
 * @param {number}  len     : total number of episodes
 * @param {boolean} random  :
 * return integer         : id of the next episode
 */
function next(current, len, random) {
	if (random) {
		if (episodes.length == 0) {
			episodes = shuffle(initArray(len));
		}

		current = episodes[0];
		episodes.splice(0, 1); // Remove the element from the episodes list
	}
	else {
		current++;

		if (current > len) {
			current = 0;
		}

	}

	link = playlist.find('a')[current];
	run($(link));

	return current;
}

/**
 * Jump to the previous track
 *
 * @param integer current : id of the current episode
 * @param integer len     : total number of episodes
 * @param boolean random  :
 * return integer         : id of the next episode
 */
function previous(current, len, random) {
	if (random) {
		if (episodes.length == 0) {
			episodes = shuffle(initArray(len));
		}

		current = episodes[0];
		episodes.splice(0, 1); // Remove the element from the episodes list
	}
	else {
		current--;

		if (current < 0) {
			current = len;
		}
	}

	link = playlist.find('a')[current];
	run($(link));

	return current;
}

/**
 * Scroll to the element identified by the given ID
 *
 * @param {string} id
 */
function scrollToElement(id) {
	let value = $("#" + id).offset().top;
	value -= 100;

	$('html, body').animate({
		scrollTop: value + "px"
	}, 200);
}

/**
 * Play the specified track
 *
 * @param object link   : the link of the track
 */
function run(link) {
	player.src = link.attr('href');
	par = link.parent();
	par.addClass('active')
		.siblings()
		.removeClass('active');

	player.load();
	player.play();

	let id = par.attr('id');
	let element = document.getElementById(id);
	let titre = $('#' + id + ' a span:first-child').html();
	let details = $('#' + id + ' a .details').html();

	// Update media information for Chrome Android.
	if ('mediaSession' in navigator) {
		navigator.mediaSession.metadata.title = titre;
		navigator.mediaSession.metadata.album = details ? details : '';
	}

	if (typeof details !== "undefined") {
		titre += ' - ' + details;
	}

	$('title').html(titre);
	updateShareLinks(id);

	if (!isScrolledIntoView(element)) {
		scrollToElement(id);
	}
}


/**
 * Returns true if an element is visible without scrolling
 * @param object elem : object to check visibility
 */
function isScrolledIntoView(elem) {
	let $elem = $(elem);
	let $window = $(window);

	let docViewTop = $window.scrollTop();
	let docViewBottom = docViewTop + $window.height();

	let elemTop = $elem.offset().top;
	let elemBottom = elemTop + $elem.height();

	return (
		(
			elemBottom <= (
				docViewBottom - 170
			)
		) && (
			elemTop >= docViewTop
		)
	);
}

/**
 * Shuffle an array randomly
 * @param array
 */
function shuffle(o) {
	for (
		let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
	) {
		;
	}

	return o;
}

/**
 * Initialize an array of "len" elements
 *
 * @param integer len
 * @return array
 */
function initArray(len) {
	let tab = [];

	for (let i = 0; i < len; i++) {
		tab[i] = i;
	}

	return tab;
}

/**
 * Update links of share buttons
 *
 * @param {number}           episodeId
 */
function updateShareLinks(episodeId) {
	let baseUrl = "www.les2minutesdupeuple.ml?e=" + episodeId;
	let facebook = "https://www.facebook.com/sharer/sharer.php?u=" + baseUrl;
	let twitter = "https://twitter.com/home?status=" + baseUrl;
	let google = "https://plus.google.com/share?url=" + baseUrl;

	$('#facebookButton').attr('href', facebook);
	$('#twitterButton').attr('href', twitter);
	$('#googleButton').attr('href', google);
}

/**
 * Starts loading animation
 */
function startLoading() {

}

/**
 * Stops loading animation
 */
function stopLoading() {

}

/**
 * Prepends 0 to the ID in order to get a 4 digits ID
 * @param {integer|string} id
 */
function formatId(id) {
	id = String(id);

	for (let i = 4; id.length < 4; i--) {
		id = "0" + id;
	}

	return id;
}

/**
 * Display message in modal
 */
function displayModale(msg) {
	$('#modale span:last-child').html(msg);
	$('#modale').fadeIn();
}
