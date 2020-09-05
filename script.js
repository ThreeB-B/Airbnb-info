import http from 'k6/http';

export let options = {
  vus: 100,
  duration: '180s',
};

export default function() {
  http.get(`http://localhost:3002/listings/${Math.floor(Math.random() * 10000000) + 1}`);
}