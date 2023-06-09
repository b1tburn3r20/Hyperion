const clientId = "69fcf10c73494a8ab4d6dc0d26e23047";
const clientSecret = "b1607be32c954efb9956f55993fa2f33";
const playlistIds = ["7AgjraE8aZYVRmPh2rOyZY", "75o0xrk1ZuVPnjyS1lgbvi", "1GC94kkIjKogZ6VciUDa17"];
// Function to fetch an access token
let accessToken; // Define the accessToken variable globally

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
    const track = song.track ? song.track : song; // Updated to handle both cases

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
// Initialize the playlist
(async function initPlaylists() {
  accessToken = await getAccessToken();

  // Fetch and display data for each playlist
  playlistIds.forEach((playlistId, index) => {
    fetchPlaylist(accessToken, playlistId, `#playlist${index + 1}`);
  });
})();

// Search functionality
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");



searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (query) {
    const tracks = await searchTracks(accessToken, query);
    displaySearchResults(tracks); // Replace displaySongs with displaySearchResults
  }
});
searchInput.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      const tracks = await searchTracks(accessToken, query);
      displaySearchResults(tracks);
    }
  }
});



async function searchTracks(accessToken, query) {
  const apiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&market=US&limit=10`;

  const response = await fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });

  const data = await response.json();
  return data.tracks.items; // Return track items instead of album items
}
// New function to display search results in the results-feed div
const resultsHeading = document.querySelector(".results-h2");
resultsHeading.style.display = "none"; // Hide the heading initially

// Show the heading when search results are displayed
function displaySearchResults(songs) {
  resultsHeading.style.display = "block";
  const resultsFeed = document.querySelector(".results-feed");
  resultsFeed.innerHTML = ""; // Clear the feed

  songs.forEach((song) => {
    const track = song.track ? song.track : song; // Updated to handle both cases

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

    resultsFeed.appendChild(songDiv);
  });
}