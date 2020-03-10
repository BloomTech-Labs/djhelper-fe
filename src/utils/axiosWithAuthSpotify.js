import axios from 'axios';
import URLSearchParams from '@ungap/url-search-params';

export const axiosWithAuthSpotify = () => {
    let data = new URLSearchParams({
    'grant_type': 'client_credentials'
    });

    return axios.create({
        baseURL: 'https://accounts.spotify.com',
        headers: {
            Authorization: "Basic OGZlMzYxN2QxMjc0NGY2YmI3YzRmZGFmNWMwMjJlMDI6YzMzYWZkNjY1NTI5NDE4YjgwZTkyZTYyOGM5MTQwMGE=",
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    })
}

export const axiosWithAuthSpotifySearch = () => {
  return axios.create({
    baseURL: `https://api.spotify.com/v1/search`,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('spotifyAccessToken')
    }
  });
};

export default axiosWithAuthSpotify;
