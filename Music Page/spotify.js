const clientId = "69fcf10c73494a8ab4d6dc0d26e23047";
const clientSecret = "b1607be32c954efb9956f55993fa2f33";
const playlistIds = ["7AgjraE8aZYVRmPh2rOyZY", "75o0xrk1ZuVPnjyS1lgbvi", "1GC94kkIjKogZ6VciUDa17"];
// Function to fetch an access token
async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

// Function to fetch playlist data
async function fetchPlaylist(accessToken, playlistId, playlistContainer) {
    const apiUrl = "https://api.spotify.com/v1/playlists/" + playlistId;
  
    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  
    const data = await response.json();
    displaySongs(data.tracks.items, playlistContainer);
  }
  

// Function to display songs on the page
function displaySongs(songs, playlistContainer) {
    const musicFeed = document.querySelector(playlistContainer + " .music_feed");
    musicFeed.innerHTML = ""; // Clear the feed
  
    songs.forEach((song) => {
      const track = song.track;
      const songDiv = document.createElement("div");
      songDiv.className = "music_song";
  
      // Add Spotify Play Button
      const playButton = document.createElement("iframe");
      playButton.src = `https://open.spotify.com/embed/track/${track.id}`;
      playButton.width = "300";
      playButton.height = "80";
      playButton.frameBorder = "0";
      playButton.allowTransparency = "true";
      playButton.allow = "encrypted-media";
      songDiv.appendChild(playButton);
  
      musicFeed.appendChild(songDiv);
    });
  }
  
  

// Initialize the playlist
(async function initPlaylists() {
    const accessToken = await getAccessToken();
  
    // Fetch and display data for each playlist
    playlistIds.forEach((playlistId, index) => {
      fetchPlaylist(accessToken, playlistId, `#playlist${index + 1}`);
    });
  })();
  
