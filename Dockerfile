##### Cache image #####
## Create image based on the official Node image from dockerhub
FROM node:10.16.0 as cache-image
WORKDIR /usr/src/app

## Build node_modules
COPY package.json *package-lock.json /usr/src/app/
RUN npm install

## Install package dependencies
RUN apt-get update && apt-get install -y supervisor alien libaio1

## Install Oracle Client
RUN cd /tmp && \
    wget https://download.oracle.com/otn_software/linux/instantclient/193000/oracle-instantclient19.3-basiclite-19.3.0.0.0-1.x86_64.rpm && \
    wget https://download.oracle.com/otn_software/linux/instantclient/193000/oracle-instantclient19.3-devel-19.3.0.0.0-1.x86_64.rpm && \
    wget https://download.oracle.com/otn_software/linux/instantclient/193000/oracle-instantclient19.3-sqlplus-19.3.0.0.0-1.x86_64.rpm && \
    alien -i oracle-instantclient19.3-*.rpm

RUN echo "export LD_LIBRARY_PATH=/usr/lib/oracle/19.3/client64/lib/${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}" >> ~/.profile && \
    echo "export ORACLE_HOME=/usr/lib/oracle/19.3/client64" >> ~/.profile

## Setup supervisor
# COPY ops/config/supervisord.conf /etc/supervisord.conf
# RUN mkdir /etc/supervisor.d

##### Deploy image #####
FROM cache-image as deploy-image
ARG ENV
ENV ENV=${ENV}
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

CMD [ "npm", "start" ]