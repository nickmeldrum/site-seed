# A site seed

## Introduction:

This repo attempts to give a sensible basis for building a website using:

 * Docker containers for hosting
 * nginx for serving static files and proxying
 * node/express for serving dynamic content
 * Container orchestration using Docker compose

## Pre-reqs:
 * git - to get the repo obviously
 * Docker client
 * node+npm (just for hosts script)

## Installation
 * in bash: `sudo ./build/hosts.sh`
 * docker-compose up --build
 * browse to https://local.nickmeldrum.com/

## Next steps:
 * fix ssl
 * create a node api server?
 * create a dev version of the docker compose - using volumes for updating of files from host
 * get webpack build behind the prod version
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
