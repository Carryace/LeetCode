# PRPL implementation

## Starting point questions
- What is web server
- What is NgInx, Apache?
- How to allow preload within those web server
- which webserver to choose?
- difference when implementing PRPL
- any other front-end effort required in PRPL?

## Answer notes

### What is web server
Web server refers to hardware or software, or both of them working together:
- For hardware, a web server is a computer that contains web server software and website files(HTML, images, css and js files). And it is connected to the internet
- For software, a web server controls how user access hosted files, at minimum a HTTP server. (HTTP server is a software that understands URLs and Http protocal, it can be accessed through domain names and delivers their content to the end-user device)

Different types of web server:
-  **static web server**, it just sends the hosted files to browser
-  **dynamic web server**, it is software + static web server, software controls what to send to the user, static web server stores the file.

### NgInx and Apache?

They are actually application server, a kind of web server software that controls what to send to the end browser user side.

They have different configurations to enable http2 server push, so that it can push things to the client to match with the preload link resources.

## References
[1] [What is web server][https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server]