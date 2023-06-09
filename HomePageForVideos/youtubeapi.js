const apiKey = 'AIzaSyDli9flxzGchlW_d2kZLyc9lO7NNqi8nDc';

// Static video display
const videoIds = [
  '2apFAwOwlBc',
  'XqDy1V7PM8s',
  'ZA9K0JMrbWg',
  'OE2NPmqZ9nM',
  'A--rMdBSHmU',
  '56uSDQECrRQ',
  'OYIKrTW8Huo'];
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
      <div class="video-container">
        <iframe src="https://www.youtube.com/embed/${video.id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
  `;

  videoDivs[index].appendChild(videoElement);
  resizeIframe(videoElement.querySelector('iframe'));
}


function resizeIframe(iframe) {
  if (window.innerWidth <= 768) {
    iframe.style.width = '100%';
    iframe.style.height = '100%';
  } else {
    iframe.style.width = '560px';
    iframe.style.height = '315px';
  }
}

window.addEventListener('resize', () => {
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach((iframe) => resizeIframe(iframe));
});


window.addEventListener('resize', () => {
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach((iframe) => resizeIframe(iframe));
});


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
