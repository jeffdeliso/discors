# DISCORS

[Live Site](https://discors.herokuapp.com/#/)

![alt text](https://s3.amazonaws.com/discors-dev/discors.jpg)

## Overview

[Discors](https://discors.herokuapp.com/#/) is a clone of the popular chat app [Discord](https://discordapp.com/). Users are able to create and join servers, send and accept/reject friend requests, upload custom avatars and server icons, create text channels and voice channels within servers, and message each other through text channels or through direct messaging.

The majority of [Discors](https://discors.herokuapp.com/#/) was designed and built within a span of 10 days.

## Technologies

Discors was built using React/Redux for the frontend and Ruby on Rails and PostgreSQL for the backend. ActionCables were used to implement the live chat features and notifications. WebRTC was used in conjunction with ActionCables to create voice channels. User avatars and server icons are uploaded to [AWS S3](https://aws.amazon.com/s3/) through Active Storage.

## Features

#### Servers
  - Users can create a new server (the user is then the admin of that server)
  - Users can upload a custom server icon when creating a server
  - Servers are created with default "general" voice and text channels
  - Users can join an existing server
  - Users can unsubscribe from a server
  - Users can delete a server if they are the admin
  - Users can see all the other members in a server

#### Text Channels
  - Users can create text channels in servers they are members of
  - Only the server admin can delete channels
  - Server members can chat with each other inside of text channels. All new messages will be sent to all users of that text channel in real time

#### Voice Channels
  - Users can talk to other members inside of voice channels
  - If you are behind a symetric NAT or certain firewalls WebRTC may not be able to create a peer to peer connect with your computer. The solution to this would be to implement a TURN relay server, however, these are expensive to operate.
  
#### Friends & Friend Requests
  - Users can send a friend request by clicking on a users avatar of username
  - Friend requests are sent in real time
  - Users can cancel outgoing friend requests
  - Users can accept or ignore incoming friend requests
  - Users can remove friends from their friends list
  - Users can see who is online/offline
  
#### Direct Messaging
  - Users can send direct messages by clicking on a users avatar of username
  - Users can remove direct messages without losing their message history
  - Users recieve direct message notifications
  
#### Bot
  - When a new user is created a bot will send them a direct message
  - Users can instruct the bot to send a friend request or a delayed message (to test notifications)
  - The bot can provide useful information about the site

Please see the [wiki](https://github.com/jeffdeliso/discors/wiki) for more detailed information.
