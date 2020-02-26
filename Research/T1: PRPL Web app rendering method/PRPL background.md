# Webpage Rendering

## Starting Questions:
- What is Webpage rendering? 
- What is involved in rendering? 
- Steps in webpage rendering?
- How rendering works?
- What can I do to improve rendering?
- What are different rendering methods we can choose for our application
- How to tell whether the rendering method is suitable for us

## Answers Notes

### How web browsers work && How rendering engine works
Web browsers is about requesting resources from the web and display them properly on the screen, generaly it will request Html, css, javascript and image content from server and interpret them based on web-standard and specifications.

7 Key Components of a Web Browser:
1. Browser layout: takes user input
2. Network Layer: it happens behind the scenes and deal with http and ftp request, all network settings like timeouts and handling http status code
3. Rendering Engine: takes HTML, css code and interprets it into what you see visually.
4. User interface: visual presentation of controls in the browser
5. JavaScript Engine: takes Javascript code, parse and executes it, returns the result
6. Storage: local storage, cookie, session storage, used to cache files
7. Operating System interface: close/ maximize/ minimize buttons

Rendering Engine:

It connects between Network content and visual user interface:
1. Parsing Html to construct the DOM tree
2. Render tree construction
   Also parsed css attribute and combined with DOM tree to create a "render tree".
3. Layout of the render tree
   Once the render tree is constructed, the rendering engine recursively goes through the HTML elements in the tree and gifure out where they should be placed
4. Paint the render tree
   Each node of the render tree is drawn out on the screen by communicating with OS interface

## Rendering Methods

### Client Side Rendering

With CSR, you redirect the request to a single HTML file and server will deliver without any content(or with a loading screen content), until you fetche all the javascript and let the browser compile everything before rendering the content.

No Content Html first -> Javascript download, compile and execute -> Render content under Js instruction on the screen

The whole process, if under good and stable network connection, can be good. But still can be a lot better.

### Server Side Rendering

SSR is rendering a normally clinet-side SPA on the server and then sending a fully rendered page to the client. The client's JavaScript bundle can then take over and SPA can operate as normal.

Server compiles the initial route and quickly render on the browser, it works better than CSR when encountering **slow internet connection** or when user is using an older generation mobile device. Plus, SSR works better with search engines, and when sharing your site link under CSR, neither the title nor the thumbnail icon will show properly.

### Pre-rendering

Pre-render can be really good choice for small web applications, especially those have only a few different routes. It lets you deliver a really fast first paint.

It just directly sends a static file on the first request, no user data no javascript, just static file. Kind of like a loading template skeleton. Once you have user specific data ready, you can load it up to replace the static skeleton there.

Still, for different routes you need different skeleton html files to be loaded and then let the Js framework rehydrate it with actual data. This will need you redirect your routes to the specific statis skeleton file:

- https://local/ -> redirect to the index.html file
- https://local/about -> redirect to about/index.html file

And this is exactly why it only works for small application, it would be painful if you have handreds of pages.


## PRPL Pattern
PRPL pattern is actually not a rendering method, it is a pattern or strategy that we can follow to make our web application load faster.

Google developed web applicaiton pattern that works exceptionally well on smartpones and other devices with unreliable network connections.

PRPL stands for:
- **Push** critical resources for the initial URL route using `<link preload>` and Http/2
- **Render** initial route
- **Pre-cache** remaining routes
- **Lazy-load** and create remaining routes on demand

To do this, the server needs to be able to know what resouce is required by which app routes.Instead of bundling the resources into a single unit for download, it uses Http2 push to deliver the individual resources needed to render the requested route.




Preload

HTTP Push: it's coming from http/2 as a core feature, it allows you to send site assets to the user before they've even asked for them.


## References 
[1] [What does it mean to "render" a page?][https://www.pathinteractive.com/blog/design-development/rendering-a-webpage-with-google-webmaster-tools/]

[2] [Whats server side rendering and do I need it][https://medium.com/@baphemot/whats-server-side-rendering-and-do-i-need-it-cb42dc059b38]

[3] [clent side vs server side vs pre-render][https://www.toptal.com/front-end/client-side-vs-server-side-pre-rendering]

[4] [Apply instant loading with the PRPL pattern][https://web.dev/apply-instant-loading-with-prpl/]

[5] [Guide http2 server push][https://www.smashingmagazine.com/2017/04/guide-http2-server-push/]