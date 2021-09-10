# Node-Docker Final Assignment.

## Description

Convert the existing project into a complete Typescript implementation

#### Installation

In the project directory, you can run:
```
yarn
```
## Local Development Mode

#### To build Docker container
```
task -t ./tasks/Taskfile.dev.yml common:compose-up
```
It will start application in docker containers using nodemon.

> Note: eslint and jest runs everytime before building the docker image.

you can test the APIs in postman open [localhost](http://localhost:11000).

#### To Remove Docker images  and volumes

```
task -t ./tasks/Taskfile.dev.yml common:cleanup-all
```

#### To stop Docker containers
```
task -t ./tasks/Taskfile.dev.yml common:compose-down
```

#### To perform Lint and Run test cases

```
task -t ./tasks/Taskfile.dev.yml common:lint-and-test
```

## Production Mode

### Creating Docker Images in Production mode

- Upload this project on Github, in the Repository settings, set your Docker credentials as `'DOCKERHUB_USERNAME=<Your Username>'` and `'DOCKERHUB_TOKEN=<Your Access Token>'` in secrets section.

- In the Actions Tab, make sure the build succeeds and image is created and uploaded.

#### To build Docker container
```
task -t ./tasks/Taskfile.prod.yml common:compose-up
```
It will start application in docker containers using nodemon.


#### To Remove Docker images  and volumes

```
task -t ./tasks/Taskfile.prod.yml common:cleanup-all
```

#### To stop Docker containers
```
task -t ./tasks/Taskfile.prod.yml common:compose-down
```

## Author

Rushi Nariya (GT-2021)
