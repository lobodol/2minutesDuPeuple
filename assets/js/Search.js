/**
 * Search component
 */
export default class Search {

	/**
	 * Search constructor
	 *
	 * @param {Player} player
	 * @param {Element} searchForm
	 */
	constructor(player, searchForm) {
		this.searchField = searchForm.querySelector('input[type="search"]');
		this.searchForm  = searchForm;
		this.lastSearch  = null;
		this.player = player;
	}

	/**
	 * Initialize search component
	 */
	init() {
		this.searchForm.addEventListener('submit', ev => {
			ev.preventDefault(); // Do not really submit form
			this._quickSearch(this.searchField.value.trim());
		});
		this.searchField.addEventListener('keyup', ev => this._quickSearch(this.searchField.value.trim()));
		this.searchField.addEventListener('change', ev => this._quickSearch(this.searchField.value.trim()));
	}

	/**
	 * Forge HTTP request to search endpoint and display results
	 *
	 * @param {string} fulltext
	 * @private
	 */
	_quickSearch(fulltext) {
		if (fulltext !== this.lastSearch && fulltext.length >= 4) {
			this.lastSearch = fulltext;
			let xhr         = new XMLHttpRequest();

			xhr.onreadystatechange = () => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status === 200) {
						this._displayResults(JSON.parse(xhr.responseText));
					}
					else if (xhr.status === 400) {
						alert('There was an error 400');
					}
					else {
						alert('something else other than 200 was returned');
					}
				}
			};

			xhr.open(this.searchForm.getAttribute('method'), this.searchForm.getAttribute('action'), true);
			xhr.send(new FormData(this.searchForm));
		}
	}

	/**
	 * TODO
	 * Display result
	 *
	 * @param {array} results
	 * @private
	 */
	_displayResults(results) {
		results.forEach(result => {
			let element = new Element();

			element.addEventListener('click', () => {
				// Search for it in the playlist
				let track = this.player.playlist.find(item => {
					return item.id === result.id;
				});

				if (track) {
					this.player.playTrack(track);
				}
			});
		});
	}
}

/*
$( document ).ready(function() {

	$('#SearchForm').on('submit', function(ev) {
		ev.preventDefault();
	});

	$('#SearchForm input[name="fulltext"]').on('keyup', function() {
		let $form = $(this).parent();

		search($form, appendResults);
	});

	function search($form, callback)
	{
		if (!$form.children('input[name="fulltext"]').val().trim()) {
			return;
		}

		$.ajax({
			url: $form.attr('action'),
			method: $form.attr('method'),
			headers: {
				'Content-Type': 'application/json'
			},
			data: $form.serialize()
		}).done(function(data) {
			callback(data.episodes, data.fulltext);
		}).fail(function(data, status) {
			console.log(data, status);
		});
	}

	function appendResults(results, fulltext)
	{
		let $wrapper = $('#SearchResults');
		let $tpl = $wrapper.children('.ResultItem').first();

		console.log(results, $tpl);

		$wrapper.html('');
		$wrapper.append($tpl);

		if (!results.length) {
			$tpl.clone()
				.children('.ResultItem-title')
				.html('Aucun résultat')
				.appendTo($wrapper);

			return;
		}

		for (let i = 0; i < results.length; i++) {
			console.log(results[i]);
			let $obj = $tpl.clone();
			let obj = results[i];

			$obj.children('.ResultItem-title').html(highlight(obj.title, fulltext));
			$obj.children('.ResultItem-category').html(highlight(obj.category.name, fulltext));
			$obj.children('.ResultItem-keywords').html(highlight(obj.keywords, fulltext));

			$obj.click(function() {
				console.log('Play episode : ' + obj.title);
			});

			$wrapper.append($obj);
		}
	}

	function highlight(string, haystack)
	{
		let highlight = '';

		if (string === null) {
			return '';
		}

		let index = string.toLowerCase().indexOf(haystack.toLowerCase());

		if (index !== -1) {
			// Get possible chars before search terms.
			highlight += string.substr(0, index);

			// Highlight search terms.
			highlight += '<span class="highlight">' + string.substr(index, haystack.length) + '</span>';

			// Get possible chars after search terms.
			highlight += string.substr(index + haystack.length);
		}

		if (highlight === '') {
			return string;
		}

		return highlight;
	}
});
*/
