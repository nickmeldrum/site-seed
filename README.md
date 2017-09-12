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
 * in bash 'dot source' the commands setup: `. ./commands` to setup the path for the shell commands and ls the list of commands you can run in the shell (this will have to be run for each new shell as we don't want to pollute your system more than we have to)
 * in bash: `sudo hosts` to add the local dns entry (only needs to be run once ever on each system)

## Running the app

 * `compile` - does the production webpack compilation
 * `run` - runs the production server (nginx serving static/bundle assets + node express - primed for SSR)
 * or `run-dev` - runs the dev server ()
 * browse to [https://local.nickmeldrum.com/](https://local.nickmeldrum.com/)
 * `stop` - gracefully shuts down the server

## How it works

### The prod build:

#### Compile:

The static folder holds files that should be downloaded to the browser 'as is', the assets folder is for generated files that will be downloaded to the browser. No other folder should be available to the browser.

Firstly the `compile` script must be run. This runs webpack to generate the static production bundle files and saves them to disk in the assets folder.

The compile script operates by building a docker image that simply does an `npm install` then an `npm run build-assets` which in turn runs webpack to spit out the bundle assets into the assets folder (which is volume mounted so it will appear on the host machine.)

The 'compile' docker image will be built, and the container run and exit on completion of webpack.

TODO: We want to generate the prod images/containers in the compile stage and not run them. the containers are the artefacts we want to know about and push to a server to run the prod server.

#### Run:

The 'prod' docker containers are twofold:

 1. an nginx container that sets up the ssl certificates and runs nginx with a prod config that allows for static files to be picked up (by only copying the static and assets folders into the containers app folder) (TODO: have it forward the html requests to the webserver only)

 2. a node webserver container that runs the node express server purely for generating the html (server side rendering)

## Next steps:

 * make it so nginx is forwarding any requests for the html to the node express server and have the webserver return the index.html (or generated html)
 * fix ssl
 * create a node api server?
 * create a dev version of the docker compose - using volumes for updating of files from host
 * rationalise the inheritance of the dockerfiles - make 1 extend the other
 * as part of compilation - create a .zip artefact for the prod container to use?
 * get webpack-dev-server behind the dev version
 * how do we ensure the site stays up? if nginx/node hangs - how do they automatically restart - something in docker?
 * add pm2 for any reason?

## Defects/debt:

 * the nginx prod config - it should only allow serving static files from /assets and /static - is that happening?
 * get self-signed cert creation/installation instructions correct [https://www.hackzine.org/using-https-with-self-signed-certificate-in-nginx.html](https://www.hackzine.org/using-https-with-self-signed-certificate-in-nginx.html)
   * problem is our current one isn't trusted from a trusted CA authority I think?
 * get domain name put into env var
   * remove cert from repo and create script as described in [https://www.hackzine.org/using-https-with-self-signed-certificate-in-nginx.html](https://www.hackzine.org/using-https-with-self-signed-certificate-in-nginx.html)
   * variables the hosts.sh script
   * look at what we can do in server.conf server_name value???
