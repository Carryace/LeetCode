# Create and Deploy NodeJS App to Web

## Frequent Problems with Docker builds

1. `npm not found`: with the first version of docker file, we did not install npm(node package manager) with cmd and the base image `alpine` does not contain npm. 
   
    So while developing, we have two ways to avoid it:
    1. to have a base image that pre-installed it
    2. to write cmds within our dockerfile to install it to our container itself. Sometimes, it could be hard if we choose this way.

2. Cannot install proper packages for project while running `npm install`, This is because we did not copy our project from our hard drive to the our running container itself. To resolve this, we will need to copy our project with `COPY` intstruction:

    > $ COPY {Path to folder} {Place to save inside container}
  
3. After correctly serving the nodeJs app from container, we still cannot access the app through browser at `localhost:[PORT]`
   
    This is because by default, you are accessing your local machine's localhost network, which is not routed to the docker container's localhost network. Container has it's own piece of network and hardware, you have to set a port mapping from your local network to some port inside docker container.

    > $ docker run -p {Incoming request Port}:{container's Port} {image id}

    eg.
    > $ docker run -p 5000:8080 {image id}

    Then you can access your app through `localhot:5000` within your browser.

## Avoid unnecessary package install process

While initiating this project to fix the problem #2, we made changes to **dockerFile** to copy our project files to the container by using `COPY` instruction within dockerFile. However, if we copy the whole project right before we run

> $ npm install

Then, every time we made some changes within our project(non dependecy changes), we will need to re-install depenedencies again while `docker build` because docker detects changes within 

> $ COPY ./ ./

And will execute all the rest of cmd again withou using docker cache.

To avoid running `npm install` everytime and use cache as much as possible, we can split the `COPY` instruction into two parts:
1. copy only `package.json` first and before `npm install` to have docker determine whether we need to reinstall dependenecies.
     > $ COPY ./package.json ./

2. copy the rest of project to docker container after `npm install` to have our project code ready
     > $ COPY ./ ./
