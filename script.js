const searchButton = document.getElementById('searchButton');
searchButton.addEventListener("click", function(){
    const songName = document.getElementById('songName').value;
    // console.log(songName);
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
    .then(res => res.json())
    .then(data => showSearchResult(data))
})

function showSearchResult(data){
    const searchResult = document.getElementById('Result');
    searchResult.innerHTML = "";
    searchResult.classList.add("search-result", "col-md-8", "mx-auto", "py-4")
    for (let i = 0; i < 10; i++) {
        const element = data.data[i];
        const title = element.album.title;
        const artist = element.artist.name;
        const child = ` <div class="single-result row align-items-center my-3 p-3">
                            <div class="col-md-9">
                                <h3 class="lyrics-name">${title}</h3>
                                <p class="author lead">Album by <span>${artist}</span></p>
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                <button onclick="getLyrics('${title}', '${artist}')" class="btn btn-success">Get Lyrics</button>
                            </div>
                        </div>`;
        searchResult.innerHTML += child;
    }
}

function getLyrics(title, artist){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data => {
        const showLyrics = document.getElementById('Lyrics');
        const songLyrics = `<button class="btn go-back">&lsaquo;</button>
                        <h2 class="text-success mb-4">${artist} - ${title}</h2>
                        <pre class="lyric text-white">
${data.lyrics}
                        </pre>`;
        const lyricsFailed = `<h2 class="text-danger mb-4">${data.error}</h2>`
        if(data.error){
            showLyrics.innerHTML = lyricsFailed;
        } else {
            showLyrics.innerHTML = songLyrics;
        }
    })
}