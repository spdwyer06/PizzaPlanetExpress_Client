let API_URL = '';

switch(window.location.hostname){
    case 'localhost':
    case '127.0.0.1':
        API_URL = 'http://localhost:9000';
        break;
    case 'pizza-planet-express.herokuapp.com':
        API_URL = 'https://pizza-planet-express-server.herokuapp.com';
        break;
}

export default API_URL;