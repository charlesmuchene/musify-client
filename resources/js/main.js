$(() => {
    $.get('http://localhost:8080/musify_war_exploded/songs')
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
                'data-url': song.url
            });

            $control.on('click', function() {
                const url = $(this).data('url');
                audio.src = url;
                audio.play();
            });

            const $li = $('<li>', {'text': song.title});
            $li.prepend($control);

            $songsDiv.append($li);

        }
    }
});