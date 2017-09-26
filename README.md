# A site seed

## Introduction:

This repo attempts to give a sensible basis for building a website using:

 * Docker containers for hosting
 * nginx for serving static files and proxying
 * webpack for building client-side assets
 * node/express for serving dynamic content
 * Container orchestration using Docker compose

## Pre-reqs:

 * git - to get this repo
 * Docker client
 * in bash 'dot source' the commands setup: `. ./init` to setup the path for the shell commands and ls the list of commands you can run in the shell (this will have to be run for each new shell as we don't want to pollute your system more than we have to)
 * in bash: `sudo hosts` to add the local dns entry (only needs to be run once ever on each system)

## Running the app

 * `build` - creates the production nginx and node server containers
 * `run` - runs the production nginx and node server containers (nginx serving static/bundle assets + node express - primed for SSR)
 * or `run-dev` - runs the dev server (TODO: this ain't working yet)
 * browse to [https://local.nickmeldrum.com/](https://local.nickmeldrum.com/)
 * `stop` - gracefully shuts down the server

## How it works

### For production:

#### build:

The static folder holds files that should be downloaded to the browser 'as is', the assets folder is for generated files that will be downloaded to the browser. No other folder should be available to the browser.

Firstly the `build` script must be run. This builds:

 1. the nginx image build:
  1. sets up the ssl certs
  2. sets up the nginx config so that the static assets (and generated bundle files) are served from disk AND all other requests are sent to the node server (assumed to be requests for index.html which will be ssr'd)
  3. copies static assets from the `/static` folder into the root of the web app
  4. runs webpack (via `yarn build`) to generate the static production bundle files into the `/assets` folder in the web app

 2. the node server image build:
  1. installs dependencies using `yarn`
  2. copies the whole src into the app ready for execution of the node express server

#### Run:

Execute the `run` script which simply does a `docker-compose up` and runs both the nginx and node containers described above in the build step.

 1. the nginx container will now serve up static files and proxy any other requests to the node web server
 2. the node server runs express (via `yarn start`) which will run SSR to serve up the index.html

## Next steps:

 * fix ssl
 * create a node api server?
 * look at how yarn can use it's cache when build is happening in a docker image build
 * create a dev version of the docker compose - using volumes for updating of files from host
 * rationalise the inheritance of the dockerfiles - make 1 extend the other
 * as part of compilation - create a .zip artefact for the prod container to use?
 * get webpack-dev-server behind the dev version
 * how do we ensure the site stays up? if nginx/node hangs - how do they automatically restart - something in docker?
 * add pm2 for any reason?

## Defects/debt:

 * have added the webpack build into the nginx dockerfile - but there is a better approach described in the answer here that we should move to: [https://stackoverflow.com/questions/46191955/how-to-structure-an-nginx-docker-container-and-the-build-of-the-assets-it-serves/46195926#46195926](https://stackoverflow.com/questions/46191955/how-to-structure-an-nginx-docker-container-and-the-build-of-the-assets-it-serves/46195926#46195926)
 * the nginx prod config - it should only allow serving static files from /assets and /static - is that happening?
 * get self-signed cert creation/installation instructions correct [https://www.hackzine.org/using-https-with-self-signed-certificate-in-nginx.html](https://www.hackzine.org/using-https-with-self-signed-certificate-in-nginx.html)
   * problem is our current one isn't trusted from a trusted CA authority I think?
 * get domain name put into env var
   * remove cert from repo and create script as described in [https://www.hackzine.org/using-https-with-self-signed-certificate-in-nginx.html](https://www.hackzine.org/using-https-with-self-signed-certificate-in-nginx.html)
   * variables the hosts.sh script
   * look at what we can do in server.conf server_name value???
