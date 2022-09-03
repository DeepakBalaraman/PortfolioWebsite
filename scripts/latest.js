fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${config.ytps}&maxResults=1&key=${config.ytda}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        let a = document.getElementById('link');
        a.href = 'https://youtube.com/watch?v=' + data["items"][0].snippet.resourceId.videoId;
        a.click();
    })