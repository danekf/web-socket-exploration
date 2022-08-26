//This example shows how axios can be used to make a request to a website.
const axios = require('axios');

const getThisRepo = () =>{
  axios
  // .get is the code to tell axios what to ask the server it is connected to for. Here we are just asking for a web page. In this case, the main page for the repository.
    .get('https://github.com/danekf/web-socket-exploration#What%20is%20a%20web%20socket?')
    .then(res => {
      console.log(`statusCode: ${res.status}`);
      console.log(res);
    })
    .catch(error => {
      console.error(error);
    });
}
