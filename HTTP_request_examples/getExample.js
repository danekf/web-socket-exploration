//This example shows how axios can be used to make a request to a website.
const axios = require('axios');

const getThisRepo = () =>{
  axios
    .get('https://github.com/danekf/web-socket-exploration#What%20is%20a%20web%20socket?')
    .then(res => {
      console.log(`statusCode: ${res.status}`);
      console.log(res);
    })
    .catch(error => {
      console.error(error);
    });
}
