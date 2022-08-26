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
      <li><a href= "#What-is-the-client/server-model">What is the client/server model?</a></li>
      <li><a href= "#How-does-an-HTTP-request-function">How does an HTTP request function?</a></li>
      <li><a href= "#What-is-a-web-socket">What is a web socket?</a></li>
      <li><a href= "#A-Deeper-Dive">A Deeper Dive</a></li>
      <li><a href= "#Managed-Solution-VS-Self-Hosted-Server">Managed Solution VS Self Hosted Server</a></li>
      <li><a href= "#Final Thoughts">Final Thoughts</a></li>
    </ul>
</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<br>

## What is the client/server model
<p>Prior to diving into Web Socket, it is important to briefly go over how a client/server model functions on a high level.</p>
<p>In this model, data is stored and managed by a server. This data could be login information,a database of products, a database of client information, web pages, or any other information that someone might want to access.</p>
<p>The client is the end user who wants to access or modify this data.</p>

<br>
<p>In order to use that data the client will make a request to the server, and the server will respond withthe formatted data. The major difference between an HTTP request and a web socket is with how exactly this communication is established.</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<br>

## How does an HTTP request function
<p>An HTTP request functions as a SINGLE interaction between a client and a server. The client reaches out to the server and will generally ask for data to be given to it (a GET request) or to modify data on the server with supplied information (a PUT request). Once the response is sent from the server, and confirmed received (or times out) the connection is closed.</p>

<p>Below is an example of a request from a client using axios, which is a module to simplify requests for JavaScript.</p>

```sh
#This example shows how axios can be used to make a request to a website in JavaScript
const axios = require('axios');

const getThisRepo = () =>{
  axios
    .get('https://github.com/danekf/web-socket-exploration#What%20is%20a%20web%20socket?')
    .then(response => {
      #Do something is a placeholder function to show where axios could do something with the received response.
      doSomething(response);
    })
}
```

<p>This example illustrates one way the browser would have reached out to a DNS provider to receive THIS github repository. The client formulates a '.get' request and 'then' waits for the response from the server. Once a response is received, the connection is closed and then "doesSomething" with the response. </p>

Alternatively we could make a request using the command line command CURL. In this example we would just get the raw data required to render and run the webpage. This can be run in any modern terminal. 
<br>

```
curl https://github.com/danekf/web-socket-exploration#What%20is%20a%20web%20socket?
```

<p>In either case, this example demonstrates that a request is made, the server processes the request and then sends the data to the client. At this point the connection is closed. In order for the client to receive more data the client must make a new request to the server.<p>
<p>The image below, taken from betterprogramming, illustrates this interaction clearly.
<div align="center">
  <a href= 'https://betterprogramming.pub/sending-type-safe-http-requests-with-go-eb5bd1f91558'>
    <img src="images/HTTP Request.png" width='50%' >
    </a>
</div>

<p>Unfortunately this method of data transfer has its limitations. suppose we wanted to start a chat on a webpage. How would we handle this?We might need a client to check at intervals for new data but how would we set this interval? Do we really want to establish a brand new connection every time we need to get or send data? </p>
<p>What if we looked at a more complex situation such as an online multiplayer game where data needs to be sent and received very quickly. Making multiple requests, and closing them each time would be much too intensive and introduce issues where data is not received in time.</p>
<p>It would be ideal to ahve the client and server remain connected until the interaction reaches its conclusion, regardless of how long that may take. This is the issue that web socket attempts to solve.</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>  
<br>

## What is a web socket
<p>A web socket is a protocol used in the client/server model, much like HTTP, but is a continous communication between the client and the server. The request begins much in the same way as an HTTP request but the requested address starts with 'ws:' rather than 'http:'.</p>

<p>An example connection request from a client will include a line such as this:</p>

```sh
# 8080 is an example dev port
ws://examplewebsite.com:8080/serverToInteractwith.php
```
<p>Once the server receives the request, instead of returning an HTTP response, it will returns a 'handshake' instead. This confirms to the client that the request was received and sends the data required to complete the connection.</p>
<p>At this point, the client and server will remain in constant communication until either one chooses to terminate the connection (or the connection is lost). 
<p></p>
<p>Here is an example image, taken from geeksforgeeks.org which illustrates this clearly.</p>
<div align="center">
    <a href= "https://www.geeksforgeeks.org/what-is-web-socket-and-how-it-is-different-from-the-http/">
      <img src="images/WebSocket-Connection.png" width='50%'>
  </a>
</div>
<p>Once the communication is established, both the client and the server can send data to each other in a full duplex manner. This means that they are both able to send data at any point, including when data is being sent by the other. This is a much more ideal protocol for examples such as a live chat, or for an online game.</p>
<p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<br>

## A Deeper Dive
<p>Now that we have an understanding of what a websocket is, and WHY it exists. The next step is to run through an example of a simple web socket server/client.</p>
<p>The chosen example will use NodeJs and the websocket npm package to create a simple websocket server and client.</p>
<a href = https://github.com/danekf/web-socket-exploration/tree/main/Web_Socket_example>Click here to explore my solution</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<br>

## Managed Solution VS Self Hosted Server
<p>When looking at implementing a web socket, the question final question is whether to self host a solution or use a third party managed solution.</p>
<p>For self hosting, popular servers include <a href='https://faye.jcoglan.com/'>FAYE</a> for Ruby or <a href='https://www.npmjs.com/package/websocket'>websocket</a> in NodeJS (as seen with the Deeper Dive example). A self hosted solution, while the most complex solution, is the most flexible. You are able to tailor each step of the process yourself and optimize yourself.</p>
<p>However, while it is easy to setup a simple web socket server and client, it may be of interest to leverage a managed solution.</p>

<p>A managed solution, such as <a href="">Pusher</a> offer pre-built solutions to lower development time and allows your team to focus on what you want your application to achieve, rather than implementing the web socket. They also have the ability to scale solutions easily as your application use grows, once again lowering the development burden. For a smaller team this is a very attractive prospect and is well worth considering when you want to focus your teams attention to other features.</p>
<p align="right">(<a href="#readme-top">back to top</a>)</p>
<br>

## Final Thoughts

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<br>