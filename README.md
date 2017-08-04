# A site seed

## Introduction:

This repo attempts to give a sensible basis for building a website using:

 * Docker containers for hosting
 * nginx for serving static files and proxying
 * node/express for serving dynamic content

## Pre-reqs:
 * git - to get the repo obviously
 * Docker client
 * node+npm (just for hosts script)

## Installation
 * in bash: `sudo ./build/hosts.sh`
 * docker-compose up --build
 * browse to https://local.nickmeldrum.com/

## Next steps:
 * get node/express working in a docker container
 * get nginx proxying calls to node/express
 * add pm2 for any reason?
 * how do we ensure the site stays up? if nginx/node hangs - how do they automatically restart - something in docker?

## Defects/debt:
 * get self-signed cert creation/installation instructions correct (https://www.hackzine.org/using-https-with-self-signed-certificate-in-nginx.html)
   * problem is our current one isn't trusted from a trusted CA authority I think?
 * get domain name put into env var
   * remove cert from repo and create script as described in (https://www.hackzine.org/using-https-with-self-signed-certificate-in-nginx.html)
   * variables the hosts.sh script
   * look at what we can do in server.conf server_name value??? 
