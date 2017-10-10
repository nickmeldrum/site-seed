# A site seed

## Motivation:

I got fed up with (mostly React) starter kits being little more than a demo project - not truly ready to go to production and actually quite lacking in a decent dev environment (lots of react/webpack bells and whistles but little true infrastructure meat.) This attempts to address this and by way of building the application on top of docker utilising nginx in front of node servers should provide a sound basis for a truly reliable dev AND PRODUCTION ready web application.

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
 * in bash set the "SITESEEDDOMAIN" environment variable to the local domain name you want to run the site under with the command: `SITESEEDDOMAIN="local.somewhere.com"; export SITESEEDDOMAIN`
 * in bash run: `sudo -E hosts` to add the local dns entry (only needs to be run once ever on each system unless you change the `SITESEEDDOMAIN` environment variable)
 * in bash run: `import-certs` to add the self-signed root certs into your keychain (so the site self-signed certificate can be trusted)

## Running the app

### Production mode:

 * `build` - creates the production nginx and node ssr server images
 * `run` - runs the production nginx and node ssr server containers (nginx serving static/bundle assets + node express - primed for SSR) (no volume mounting - so containers are completely self contained)
 * browse to [https://$SITESEEDDOMAIN/](https://$SITESEEDDOMAIN/)
 * `stop` - gracefully shuts down the servers

### Development mode:

 * `build-dev` - creates the developent nginx, dev ui server and node ssr server images
 * `run-dev` - runs the development nginx, dev ui server and node ssr server containers (nginx serving static assets, dev ui server running webpack dev server for autoreloading ui assets + node express - primed for SSR - watching file changes and reloading routes) (all 3 containers are volume mounted so able to respond to host filesystem changes)
  to [https://$SITESEEDDOMAIN/](https://$SITESEEDDOMAIN/)
 * `stop-dev` - gracefully shuts down the servers

## How it works

### For production:

#### Build:

The static folder holds files that should be downloaded to the browser 'as is', the assets folder is for generated files that will be downloaded to the browser. No other folder should be available to the browser.

Firstly the `build` script must be run. This script sets up template files that need the domain name injected in, then creates the certificates for the chosen domain name. Then it builds the 2 prod images (nginx proxy server and node ssr server) by doing a `docker-compose build` against the `prod.docker-compose.yml` file.

The nginx image build:

  1. copies the certs into the right location
  2. sets up the nginx config so that the static assets (and generated bundle files) are served from disk AND all other requests are sent to the node server (assumed to be requests for index.html which will be ssr'd)
  3. copies static assets from the `/src/static` folder into the root of the web app
  4. runs webpack (via `yarn ui`) to generate the static production bundle files into the `/assets` folder in the web app

The node server image build:

  1. installs dependencies using `yarn`
  2. copies the whole src into the app ready for execution of the node express server (via the `yarn ssr` command)

#### Run:

Execute the `run` script which simply does a `docker-compose up` against the `prod.docker-compose.yml` compose file which runs both the nginx and node containers described above in the build step.

 1. the nginx container will now serve up static files and proxy any other requests to the node web server
 2. the node server runs express (via `yarn start`) which will run SSR to serve up the index.html

#### Stop:

Execute the `stop` script which simply does a `docker-compose down` against the `prod.docker-compose.yml` compose file, therefore stopping the 2 docker containers: proxy and ssrserver.

### For development:

#### Build:

Execute the `build-dev` script which sets up template files that need the domain name injected in, the creates the certificates for the chosen domain name. Then it builds the 3 dev images (nginx proxy server, node ui assets server and node ssr server) by doing a `docker-compose build` against the `dev.docker-compose.yml` file.

#### Run:

Execute the `run-dev` script which simply does a `docker-compose up` against the `dev.docker-compose.yml` compose file which runs the nginx, the ui server and ssr server described above in the build step.

 1. the nginx container will now serve up static files (volume mounted so will respond to changes in the files on the host machine)
 2. the nginx container will forward and requests to `/assets` to the ui server container for `webpack-dev-server` to serve up - which is listening via volume mounting to the host machine and recompiling on demand the bundle assets
 3. the nginx container will also forward any hot module replacement requests to the ui server to enable HMR
 and proxy any other requests to the node web server
 4. the nginx container will then forward all other requests to the ssr server assuming anything else is a request for an `index.html`
 4. the node ssr server runs express (via `yarn dev-ssr`) which will run SSR to serve up the `index.html` and is listening to file changes (via volume mounting) and will reload routes on a file change

#### Stop:

Execute the `stop-dev` script which simply does a `docker-compose down` against the `dev.docker-compose.yml` compose file, therefore stopping the 3 docker containers: proxy, uiserver and ssrserver.

## Next steps:

 * creating a dev build:
   * instead of using nodemon that requires a server restart - watcher will re-require the app modules: https://medium.com/@kevinsimper/dont-use-nodemon-there-are-better-ways-fc016b50b45e
   * (get React in place and get RHL in?)

 * fix dev ssl 
  * get CA and IA setup to be trusted by home mbp
  * remove CA and IA certs from repo and have them autogenerated from scripts (update docs)
  * possibly make the domainname file replacemenets and create-cert part of the `build` script part of the dockerfile?

 * create a node api server?
 * look at how yarn can use it's cache when build is happening in a docker image build
 * rationalise the inheritance of the dockerfiles - make 1 extend the other
 * as part of compilation - create a .zip artefact for the prod container to use?
 * how do we ensure the site stays up? if nginx/node hangs - how do they automatically restart - something in docker?
 * add pm2 for any reason?
 * fix prod ssl

## Defects/debt:

 * have added the webpack build into the nginx dockerfile - but there is a better approach described in the answer here that we should move to: [https://stackoverflow.com/questions/46191955/how-to-structure-an-nginx-docker-container-and-the-build-of-the-assets-it-serves/46195926#46195926](https://stackoverflow.com/questions/46191955/how-to-structure-an-nginx-docker-container-and-the-build-of-the-assets-it-serves/46195926#46195926)
 * the nginx prod config - it should only allow serving static files from /assets and /static - is that happening?
 * are any of the container webserver accessibly on port 80 from host (shouldn't be as the node servers should only be accessible from the nginx proxy server and nginx should be available only from 443)
