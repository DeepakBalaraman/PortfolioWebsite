fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${config.ytps}&maxResults=1&key=${config.ytda}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        window.location = 'https://youtube.com/watch?v=' + data["items"][0].snippet.resourceId.videoId;
    })