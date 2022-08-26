<a name="readme-top"></a>
<h1 align="center">Web Sockets, a mystery to be solved.</h3>
<br>

<a name="Intro"></a>

<p>As developers, we need to remain aware of the use cases and limitations of the communication protocols we use. Each protocol will have its own pros/cons. Differences include, but are not limited to, how a protocol handles encoding, confirmation of receipt, error handling, flow control, queuing, etc...

As web developpers we deal mostly with the client-server model. And we are most familiar with HTTP protocol. However there is another option that is favoured when a site requires specific features such as integrated chat. That protocol is called Web Socket.

This repository aims to explore web sockets on a high level through explanation and demonstration.

<br>

<!--Table of Contents -->
<details>
  <Summary>Table of Contents</summary>
    <ul>
      <li><a href= "#Intro">Introduction</a></li>
      <li><a href= "#What is the client/server model?">What is the client/server model?</a></li>
      <li><a href= "#How does an HTTP request function?">How does an HTTP request function?</a></li>
      <li><a href= "#What is a web socket?">What is a web socket?</a></li>
    </ul>
</details>

<br>

## What is the client/server model?
<p>Prior to diving into Web Socket, it is important to briefly go over how a client/server model functions on a high level.</p>
<p>In this model, data is stored and managed by a server. This data could be login information,a database of products, a database of client information, web pages, or any other information that someone might want to access.</p>
<p>The client is the end user who wants to access or modify this data.</p>

<br>
<p>In order to use that data the client will make a request to the server, and the server will respond withthe formatted data. The major difference between an HTTP request and a web socket is with how exactly this communication is established.</p>

<br>

## How does an HTTP request function?
<p>An HTTP request functions as a SINGLE interaction between a client and a server. The client reaches out to the server and will generally ask for data to be given to it (a GET request) or to modify data on the server with supplied information (a PUT request).</p>

<p>Below is an example of a request from a client using axios, which is a module to simplify requests for JavaScript.</p>

```sh
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
```

<p>In this example, the ".get" shows that the client is requesting a website from the server. If we were pushing data to the server, a ".put" could be used. The server will then repond with all the data required to render and run the webpage.</p>

Alternatively we could make a request using the command line command CURL.
<br>

``sh
curl https://github.com/danekf/web-socket-exploration#What%20is%20a%20web%20socket?
``

<br>

## What is a web socket?

