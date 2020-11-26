# React Project with Docker CICD

## Run React Project with Docker

### Creat seed react project with npx.
Having issue while creating project with `npx`, seems a conflict problem with `yarn`

### Build project docker image and host with docker container

Build `Dockerfile.dev` for non-prod env.

> $ docker build -f Dockerfile.dev

Run image at localhost

> $ docker run -it -p 3000:3000 {image_name}

**Note**: Cannot run without `-it` tag due to latest updates with react app.

### Use Docker Volumes to host application without rebuild image while developing on local

Earlier when we try to build a docker image and run docker image, we always make use of the file system snapshot to support our app. However, while developing at local, when we make changes our code, it will not directly reflect on the container image unless when rebuild the image with `docker build`. And `Docker Volume` is the solution that we can make use of to resolve this problem.

`Docker Volume` is kind of making a reference from your docker image fs snapshot to your local project folder/files, that way whenever you make changes to your code, with the same reference it will reflect your changes directly to your app.

We can try `-v` withint `docker run` to use volumes:

> $ docker run -it -p 3000:3000 -v $(pwd):/app {image_id}

If you wish to use the `node_module` dependencies within the container instead of your working dir, you can bookmark the node_modules:

> $ docker run -it -p 3000:3000 -v /app/node_modules -v $(pwd):/app {image_id}

For the `:` within the `-v` content,
- if we add the `:` like this: `$(pwd):/app`, basicallly we are saying that we want to map whatever form our current directory to `/app` folder
- if we don't add the `:`, such as this: `'v /app/node_modules`, we are not expecting any mapping there, we will just use it as it is on that folder/dir.
