'use strict';

import Control from './Control';
import PlayControl from './PlayControl';
import Track from './Track';

export default class Player {

	/**
	 * Player constructor
	 *
	 * @param {Utils} utils
	 */
	constructor(utils) {
		this.utils    = utils;
		this.playlist = [];
		this.current  = null;
		this.player   = null;
		this.autoplay = true;
		this.shuffle  = false;
	}

	/**
	 * Initialize Player
	 *
	 * @param {Element} play    Play/pause button
	 * @param {Element} next    Next track button
	 * @param {Element} prev    Previous track button
	 * @param {Element} shuffle Shuffle button
	 * @param {Element} loop    Loop button
	 */
	init(play, next, prev, shuffle, loop) {
		let playControl    = new PlayControl(play);
		let nextControl    = new Control(next);
		let prevControl    = new Control(prev);
		let shuffleControl = new Control(shuffle);
		let loopControl    = new Control(loop);

		this._initPlaylist();
		this._initMediaSession();
		this._initAudioPlayer(playControl);
		this._initControls(playControl, nextControl, prevControl, shuffleControl, loopControl);
	}

	/**
	 * Initialize playlist
	 *
	 * @private
	 */
	_initPlaylist() {
		this.playlist = [];

		document.querySelectorAll('.TrackItem').forEach(item => {
			let track = new Track(item);
			item.addEventListener('click', () => this.playTrack(track));
			this.playlist.push(track);
		});
	}

	/**
	 * Initialize audio player
	 *
	 * @param {PlayControl} play
	 * @private
	 */
	_initAudioPlayer(play) {
		this._loadFirstTrack();
		this.player = new Audio(this.current.file);

		// Listener for timing
		this.player.addEventListener('loadedmetadata', () => document.querySelector('.MaxTime').innerText = this._timeToString(this.player.duration));

		// Each time duration is updated, update progress bar and timing
		this.player.addEventListener('timeupdate', () => {
			// Convert duration time to percent
			let percent = Math.round((this.player.currentTime / this.player.duration) * 100);

			document.querySelector('.CurrentDuration').style.width = percent + '%';
			document.querySelector('.Tooltip').style.left          = percent + '%';
			document.querySelector('.CurrentTime').innerText       = this._timeToString(this.player.currentTime);
		}, false);

		// Listener for autoplay.
		this.player.addEventListener('ended', () => {
			if (this.autoplay) {
				this._nextTrack();
			}
		});

		// Listener for pause.
		this.player.addEventListener('pause', () => play.pause());

		// Listener for play.
		this.player.addEventListener('play', () => play.play());

		// Listener for errors.
		this.player.addEventListener('error', () => alert('Ukulele ma guitare ? Impossible de lire cet épisode...'));
	}

	/**
	 * @private
	 */
	_initMediaSession() {
		if ('mediaSession' in navigator) {
			navigator.mediaSession.metadata = new MediaMetadata({
				title: null,
				album: null,
				artwork: [
					{ src: 'https://dummyimage.com/512x512', sizes: '512x512', type: 'image/png' }
				]
			});

			navigator.mediaSession.setActionHandler('play', this.player.play);
			navigator.mediaSession.setActionHandler('pause', this.player.pause);
			navigator.mediaSession.setActionHandler('previoustrack', this._previousTrack);
			navigator.mediaSession.setActionHandler('nexttrack', this._nextTrack);
		}
	}

	/**
	 * Load first track
	 *
	 * @private
	 */
	_loadFirstTrack() {
		let url = window.location.href;

		// Extract track ID from URL
		let trackId = url.substr(url.indexOf('#') + 1);

		// Search for it in the playlist
		let track = this.playlist.find(item => {
			return item.id === trackId;
		});

		// If track exists
		if (track) {
			// Load it
			this.current = track;
			this.utils.scrollTo(track.element);
		} else {
			// By default, load first track of the playlist
			this.current = this.playlist[0];
		}

		this.current.setCurrent();
	}

	/**
	 * Initialize controls of the player
	 *
	 * @param {Control} play    Play/pause button
	 * @param {Control} next    Next track button
	 * @param {Control} prev    Previous track button
	 * @param {Control} shuffle Shuffle button
	 * @param {Control} loop    Loop button
	 * @private
	 */
	_initControls(play, next, prev, shuffle, loop) {
		// Play/pause button
		play.click(() => this.player.paused ? this.player.play() : this.player.pause());

		// Previous track
		prev.click(() => this._previousTrack());

		// Next track
		next.click(() => this._nextTrack());

		// Shuffle button
		shuffle.click(() => {
			this.shuffle = !this.shuffle;
			shuffle.toggleEnabled();

			if (this.shuffle) {
				this.playlist = this.utils.shuffle(this.playlist);
			} else {
				// Sort by ID
				this.playlist.sort((a, b) => {
					if (a.id < b.id) return -1;
					if (a.id > b.id) return 1;
					return 0;
				});
			}
		});

		// Loop button
		loop.click(() => {
			this.autoplay = !this.autoplay;
			loop.toggleEnabled();
		});

		// Jump to time
		document.querySelector('.Duration').addEventListener('click', ev => {
			let percent             = this.computePercent(ev);
			this.player.currentTime = Math.floor(percent * this.player.duration);
		});

		// When mouse move over the time line : display a tooltip
		document.querySelector('.Duration').addEventListener('mousemove', ev => {
			let percent = this.computePercent(ev);
			let time    = this._timeToString(Math.floor(percent * this.player.duration));

			ev.currentTarget.classList.add('Duration--tooltiped');
			ev.currentTarget.setAttribute('data-time', time);
			document.styleSheets[0].addRule('.Duration--tooltiped:before', 'left: ' + Math.round(100*percent) + '%;');
		});
		document.querySelector('.Duration').addEventListener('mouseout', ev => ev.currentTarget.classList.remove('Duration--tooltiped'));
	}

	/**
	 *
	 * @param {Event} ev
	 * @return {number}
	 */
	computePercent(ev) {
		let position = ev.pageX - this.utils.offset(ev.currentTarget).left;
		return  (position / ev.currentTarget.offsetWidth);
	}

	/**
	 * Convert given duration into a string like 03:23
	 *
	 * @param {number} time
	 * @return {string}
	 * @private
	 */
	_timeToString(time) {
		if (isNaN(time)) {
			return '0:00';
		}

		let minutes = Math.floor(time / 60);
		let seconds = Math.floor(time - minutes * 60);

		seconds = (seconds.toString().length <= 1) ? '0' + seconds : seconds;

		return minutes + ':' + seconds;
	}

	/**
	 * Find next track and play it
	 *
	 * @private
	 */
	_nextTrack() {
		// Find current episode in playlist
		let index = this.playlist.indexOf(this.current);

		// By default, get the first episode of the playlist
		let track = this.playlist[0];

		if (index !== -1 && typeof this.playlist[index + 1] !== 'undefined') {
			track = this.playlist[index + 1];
		}

		// And play it
		this.playTrack(track);
	}

	/**
	 * Find previous track and play it
	 *
	 * @private
	 */
	_previousTrack() {
		// Find current episode in playlist
		let index = this.playlist.indexOf(this.current);

		// By default, get the last episode of the playlist
		let track = this.playlist[this.playlist.length - 1];

		if (index !== -1 && typeof this.playlist[index - 1] !== 'undefined') {
			track = this.playlist[index - 1];
		}

		// And play it
		this.playTrack(track);
	}

	/**
	 * Play the given track
	 *
	 * @param {Track} track The track to play
	 */
	playTrack(track) {
		track.setCurrent();
		this.current.unsetCurrent();

		this.current    = track;
		this.player.src = track.file;
		this.player.load();
		this.player.play();

		this.utils.scrollTo(track.element);
		this.utils.updatePageTitle(track);
	}
}
