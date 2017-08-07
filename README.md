# A site seed

## Introduction:

This repo attempts to give a sensible basis for building a website using:

 * Docker containers for hosting
 * nginx for serving static files and proxying
 * webpack for building client-side assets
 * node/express for serving dynamic content
 * Container orchestration using Docker compose

## Pre-reqs:
 * git - to get the repo obviously
 * Docker client
 * node+npm (just for hosts script)
 * in bash: `sudo ./build/hosts.sh`

## Production build
 * ./build/compile.sh - does the production webpack compilation
 * ./build/run.sh - runs the production server (nginx + node)
 * browse to https://local.nickmeldrum.com/
 * ./build/stop.sh - gracefully shuts down the prod server

## Next steps:
 * fix ssl
 * create a node api server?
 * create a dev version of the docker compose - using volumes for updating of files from host
 * as part of compilation - create a .zip artefact for the prod container to use?
 * get webpack-dev-server behind the dev version
 * how do we ensure the site stays up? if nginx/node hangs - how do they automatically restart - something in docker?
 * add pm2 for any reason?

## Defects/debt:
 * get self-signed cert creation/installation instructions correct (https://www.hackzine.org/using-https-with-self-signed-certificate-in-nginx.html)
   * problem is our current one isn't trusted from a trusted CA authority I think?
 * get domain name put into env var
   * remove cert from repo and create script as described in (https://www.hackzine.org/using-https-with-self-signed-certificate-in-nginx.html)
   * variables the hosts.sh script
   * look at what we can do in server.conf server_name value??? 
