import axios from 'axios';
import API_KEY from '../api/youtubeApi';

const YOUTUBE_END_PINT = 'https://www.googleapis.com/youtube/v3/search';
const NUMBER_OF_VIDEO_RESULTS = 50;

const searchYoutube = (term, calbackFunction) => {
  const order = ['date', 'relevance', 'rating', 'title', 'viewCount'];
  const choosedOrger = order[Math.floor(Math.random() * order.length)];
  const duration = ['any', 'long', 'medium', 'short'];
  const choosedDuration = duration[Math.floor(Math.random() * duration.length)];
  axios
    .get(`${YOUTUBE_END_PINT}?part=id,snippet&q=${term}&type=video&key=${API_KEY}&maxResults=${NUMBER_OF_VIDEO_RESULTS}&videoEmbeddable=true&videoCategoryId=15&order=${choosedOrger}&videoDuration=${choosedDuration}`)
    .then((response) => {
      const results = response.data.items;
      for (let i = results.length - 1; i > 0; i -= 1) {
        const r = Math.floor(Math.random() * (i + 1));
        const tmp = results[i];
        results[i] = results[r];
        results[r] = tmp;
      }
      calbackFunction(results);
    });
};

export default searchYoutube;
