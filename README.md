![Real-Time-Notifications-Logo](https://cloud.githubusercontent.com/assets/12782508/26573221/99fd8eb8-4525-11e7-8ffb-6e93c6c80561.jpg)

# Overview
Real Time Notifications is a microservice
It built to be a part of an application - responsible only for notifications

Some reasons you might want to use Real-Time-Notifications:
* Easy to deploy
* Light weight
* Configurable


## Requirements
* [NodeJS](https://nodejs.org/en/download/) 6, 7
* [MongoDB Server](https://www.mongodb.com/download-center) 3.4

## Installation

* Clone or download the project
   
        git clone https://github.com/ozbarshalom/Real-Time-Notifications-Service.git

* Install required node modules

        npm install
    
* Create a new collection named `notification` in your MongoDB database
    
## Deploy

use `npm` or `node`:

    node index.js
    OR
    npm start
    
## Basic Usage

When the service is up and running with your configuration there are few basic methods that you will use:
* Clients - every client that will connect to the websocket <br>
on `wss://HOST:PORT` is a potential notification receiver
* Create and send new notification via `POST` to `http://HOST:PORT/notifications` <br>
with the data as configured in the [Notification Schame](#notification-schema). <br>
when creating new notification, it will send in real time to the client if he already connected to the websocket

## Mandatory Configurations

Real Time Notifications have many configurations that available for your app
But, there are few that are mandatory

Configuration file is located in `config/defaults.json`

* `mongodb.url` - MongoDB connection URL
* `auth` see [authentication](#authentication)

## Notification Schema

The default notification schema is:
* title
* body
* date `auto now`
* seen `default: false`
* user

That schema can be changed,
If you would like to, please change the schema in `server/mongodb/notificationSchema.js` and edit the `create` function in `server/mongodb/notifications.js`

## Authentication
There are 2 options for managing Real Time Notifications:
* non-auth - notifications will send or everyone
* auth - every notification is related and will be send to specific user

Default: `auth`

When using `auth` you must specify `authModule` configurations.
Basic example exists in the configuration file and `server/authentication/token.js`
<br><b> If you use `auth` you have to change the `authModule` </b>

## Configurations

The defaults configurations file is located in `config/default.json`

* `server.port` - listening port (http and websocket) <br>
* `mongodb.url` - MongoDB connection URL
* `notifications.auth` - Boolean, if `true` each notification will send to specific user. (In that case, you must set `notifications.authModule` configurations) <br>
if `false` each notification will be sent for everyone (who connected to the websocket)
* `notifications.authModule` - Only if `notifications.auth` is set to `true`. <br>
Set `name` and `path` to your authentication class

### environment variables
will replace defaults configurations if set

* PORT - `server.port`
* MONGODB_URL = `mongodb.url`
* USE_AUTH = `notifications.auth` (boolean)
* AUTH_MODULE_NAME = `notifications.authModule.name`
* AUTH_MODULE_PATH = `notifications.authModule.path`