<a name="readme-top"></a>
<h1 align="center">Web Sockets, a mystery to be solved.</h3>
<br>

<a name="Intro"></a>

<p>As developers, we need to remain aware of the use cases and limitations of the communication protocols we interact with. Each protocol will have its own pros/cons. Differences include, but are not limited to, how a protocol handles encoding, confirmation of receipt, error handling, flow control, queuing, etc...

As web developers we deal mostly with the client-server model and are familiar with the HTTP protocol. However there is another option for protocol that is favoured when a site requires specific features that use real time data, such as live chats or data for a multiplayer game. That protocol is called Web Socket.

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
      <li><a href= "#Final-Thoughts">Final Thoughts</a></li>
    </ul>
</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<br>

## What is the client/server model
<p>Prior to diving into Web Socket, it is important to briefly go over how a client/server model functions on a high level.</p>
<p>In this model, data is stored and managed by a server. This data could be login information,a database of products, a database of client information, web pages, or any other information that someone might want to access.</p>
<p>The client is the end user who wants to access or modify this data.</p>

<br>
<p>In order to use that data the client will make a request to the server, and the server will respond with the formatted data. The major difference between an HTTP request and a web socket is with how this communication is established and maintained.</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<br>

## How does an HTTP request function
<p>An HTTP request functions as a SINGLE interaction between a client and a server. The client reaches out to the server and will ask for data to be given to it (a GET request) or to modify data on the server with supplied information (a PUT request). Once the response is sent from the server, and the client has confirmed receipt the connection is closed.(The connection will also close if the client has not confirmed receipt of data within a configured amount of time, this would be a timeout condition.)</p>

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

<p>This example illustrates one way the browser would have reached out to a DNS (Domain Name System) provider to receive THIS github repository. The client formulates a '.get' request and 'then' waits for the response from the server. Once a response is received, the connection is closed and then "doesSomething" with the response. </p>

Alternatively we could make a request using the command line action "CURL". In this example we would get the raw data required to render and run the webpage. This can be run in any modern terminal. 
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

<p>Unfortunately this method of data transfer has its limitations. suppose we wanted to start a chat on a webpage. How would we handle this? We might need a client to check at intervals for new data, but deciding on this interval would end up being complex. We do not want to need to establish a brand new connection every time we need to get or send data. </p>
<p>What if we looked at a more complex situation such as an online multiplayer game where data needs to be sent and received very quickly. Making multiple requests, and closing them each time would be much too intensive and introduce issues where data is not received in time.</p>
<p>It would be ideal to have the client and server remain connected until the interaction reaches its conclusion, regardless of how long that may take. This is the issue that web socket attempts to solve.</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>  
<br>

## What is a web socket
<p>A web socket is a protocol used in the client/server model, much like HTTP, but is a continuous communication between the client and the server. The request begins in a similar way to an HTTP request but the requested address starts with 'ws:' rather than 'http:'. However the protocol is what is defined as a 'framed' protocol. This means that each time data is sent between the client and the server it follows a standard format, with regulated size and use for each 'chunk' of that data. One such example of the standard is the RFC6455 framing protocol,  which <a href = "https://www.rfc-editor.org/rfc/rfc6455#section-5.2">this</a> article covers in great technical detail.</p>


<p>Once the server receives the request, instead of returning an HTTP response, it will return a 'handshake'. This confirms to the client that the request was received and sends the data required to complete the connection.</p>


<p>At this point, the client and server will remain in constant communication until either one chooses to terminate the connection (or the connection is lost). 
<p></p>
<p>Here is an example image, taken from geeksforgeeks.org which illustrates this clearly.</p>
<div align="center">
    <a href= "https://www.geeksforgeeks.org/what-is-web-socket-and-how-it-is-different-from-the-http/">
      <img src="images/WebSocket-Connection.png" width='50%'>
  </a>
</div>
<p>Once the communication is established, both the client and the server can send data to each other in a full duplex manner. This means that they are both able to send data at any point, including when data is being sent by the other. This is a much more ideal protocol for examples such as a live chat, or for an online game since both parties are actively listening at all times.</p>
<p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<br>
<br>


## A Deeper Dive
<p>Now that we have an understanding of what a websocket is, and WHY it exists. The next step is to run through an example of a simple web socket server/client.</p>
<p>The chosen example will use NodeJs and the websocket npm package to create a simple websocket server and client to show the simplicity of establishing a connection.</p>
<a href = https://github.com/danekf/web-socket-exploration/tree/main/Web_Socket_example>Click here to explore my solution</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<br>

## Managed Solution VS Self Hosted Server
<p>When looking at implementing a web socket, on of the final questions to ask ourselves is whether to self host a solution or use a third party managed solution.</p>
<p>For self hosting, popular servers include <a href='https://faye.jcoglan.com/'>FAYE</a> for Ruby or <a href='https://www.npmjs.com/package/websocket'>websocket</a> in NodeJS (as seen with the Deeper Dive example). A self hosted solution, while the most complex solution, is the most flexible. You are able to tailor each step of the process yourself and optimize yourself.</p>
<p>While it is easy to setup a simple web socket server and client, it may be of interest to leverage a managed solution.</p>

<p>A managed solution, such as <a href="">Pusher</a> offers pre-built solutions to lower development time and allows your team to focus on what you want your application to achieve, rather than implementing the web socket. They also have the ability to scale solutions easily as your application use grows, once again lowering the development burden. For a smaller team this is a very attractive prospect and is well worth considering when you want to focus your team's attention on other features. A pre-built solution also allows for easier addition of realtime data later into development, when a smaller subset of realtime features is required.</p>
<p align="right">(<a href="#readme-top">back to top</a>)</p>
<br>

## Final Thoughts
<p>While web socket is very flexible and useful when sending data, it is more complex to setup and its power might not be worth the extra development time for simple requests. A best practice would be to set out your requirements, if your application requires frequent back and forth data, such as realtime updates, then consider a web socket for that element.</p>

<p>Otherwise it would seem best to implement a more simple HTTP request. Should the need arise to get some real time data, it is possible to implement at a later date, whether it is a custom solution or a third party one. </p>
<p align="right">(<a href="#readme-top">back to top</a>)</p>
<br>

## References :
<ul>
<li></li>
<li></li>
<li>https://www.wallarm.com/what/a-simple-explanation-of-what-a-websocket-is</li>
<li>https://betterprogramming.pub/sending-type-safe-http-requests-with-go-eb5bd1f91558</li>
<li>https://www.geeksforgeeks.org/what-is-web-socket-and-how-it-is-different-from-the-http/</li>
<li>https://pusher.com/tutorials/build-a-realtime-stock-ticker-with-ruby-and-pusher-channels/</li>
<li>https://sookocheff.com/post/networking/how-do-websockets-work/</li>
<li>https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API</li>


</ul>