const apiKey = 'AIzaSyDli9flxzGchlW_d2kZLyc9lO7NNqi8nDc';

// Static video display
const videoIds = [
    'Y9-MLgHxQGs',
    'H_3z30Wusew',
    '_84gBlRZwO0',
    'J-fXTRHApRc',
    'p2qFjQ6rmKs',
    '_a60JIImVCc',
    'OeYnX9NwB1k'];
const videoDivs = [
  document.querySelector('.home_video1'),
  document.querySelector('.home_video2'),
  document.querySelector('.home_video3'),
  document.querySelector('.home_video4'),
  document.querySelector('.home_video5'),
  document.querySelector('.home_video6'),
  document.querySelector('.home_video7')
];

videoIds.forEach((videoId, index) => {
  fetchVideoDetails(videoId, index);
});

async function fetchVideoDetails(videoId, index) {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`);
  const data = await response.json();

  displayVideo(data.items[0], index);
}

function displayVideo(video, index) {
  const videoElement = document.createElement('div');
  videoElement.innerHTML = `
      <h3>${video.snippet.title}</h3>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `;

  videoDivs[index].appendChild(videoElement);
}

// YouTube search query
const searchBtn = document.getElementById('searchBtn');
const searchQuery = document.getElementById('searchQuery');
const resultsDiv = document.getElementById('results');

searchBtn.addEventListener('click', () => {
  searchVideos(searchQuery.value);
});

async function searchVideos(query) {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apiKey}&maxResults=10`);
  const data = await response.json();

  displayResults(data.items);
}

function displayResults(videos) {
  resultsDiv.innerHTML = '';

  videos.forEach(video => {
    const videoElement = document.createElement('div');
    videoElement.innerHTML = `
        <h3>${video.snippet.title}</h3>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;

    resultsDiv.appendChild(videoElement);
  });
}
