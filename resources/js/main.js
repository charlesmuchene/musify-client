$(() => {
    const mainUrl = 'http://localhost:8080/musify_war_exploded';
    $.get(mainUrl + '/songs')
    .done(displaySongs)
    .fail(function() {
        console.log("We couldn't fetch your songs!");
    })

    const audio = document.getElementById('audio');

    function displaySongs(songs) {
        
        const $songsDiv = $('#playlist-div');

        for(const song of songs) {
            const $control = $('<input>', {
                'type':'radio',
                'name': 'songs',
                'value': song.title,
                'data-url': song.url,
                'data-songid': song.id,
                'data-songtitle': song.title
            });

            $control.on('click', function() {
                const url = $(this).data('url');
                const id = $(this).data('songid');
                const title = $(this).data('songtitle');
                playSong(url);
                trackSongPlay(id, title);
            });

            const $li = $('<li>', {'text': song.title});
            $li.prepend($control);

            $songsDiv.append($li);

        }
    }

    function playSong(url) {
        audio.src = url;
        audio.play();
    }

    function trackSongPlay(id, title) {
        $.post(mainUrl + "/play/" + id)
        .done(function() {
            console.log("Tracked song: " + title + " with id " + id);
        })
        .fail(function() {
            console.log("Error tracking song " + title + " with id " + id);
        });
    }
});