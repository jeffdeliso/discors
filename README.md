# DISCORS

[Live Site](https://discors.herokuapp.com/#/)

![image 2-12-19 at 10 43 am](https://user-images.githubusercontent.com/4982876/52760440-8c526a00-2fdd-11e9-9c6c-96b68f7da4b1.jpg)

## Overview

[Discors](https://discors.herokuapp.com/#/) is a clone of the popular chat app [Discord](https://discordapp.com/). Users are able to create and join servers, send and accept/reject friend requests, upload custom avatars and server icons, create text channels and voice channels within servers, and message each other through text channels or through direct messaging.

The majority of [Discors](https://discors.herokuapp.com/#/) was designed and built within a span of 10 days.

## Technologies

Discors was built using React/Redux for the frontend and Ruby on Rails and PostgreSQL for the backend. ActionCables were used to implement the live chat features and notifications. WebRTC was used in conjunction with ActionCables to create voice channels. User avatars and server icons are uploaded to [AWS S3](https://aws.amazon.com/s3/) through Active Storage.

## Features

#### Users
  - Users can edit change their username and email
  - Users can upload a custom avatar
  - Users can login from multiple devices at the same time
  
![image 2-13-19 at 7 37 pm](https://user-images.githubusercontent.com/4982876/52754009-e8f65a80-2fc6-11e9-899f-670fd9bc3534.jpg)
  
#### Servers
  - Users can create a new server (the user is then the admin of that server)
  - Users can upload a custom server icon when creating a server
  - Servers are created with default "general" voice and text channels
  - Users can join an existing server
  - Users can unsubscribe from a server
  - Users can delete a server if they are the admin
  - Users can see all the other members in a server
  
![image 2-13-19 at 5 46 pm](https://user-images.githubusercontent.com/4982876/52749802-4d5ded80-2fb8-11e9-9293-9aa7d6dd73ac.jpg)

#### Text Channels
  - Users can create text channels in servers they are members of
  - Only the server admin can delete channels
  - Server members can chat with each other inside of text channels. All new messages will be sent to all users of that text channel in real time
  - URLs in messages display as links
  - YouTube and image links show previews and are playable in chat 
  
![image 2-14-19 at 10 11 pm](https://user-images.githubusercontent.com/4982876/52832253-bcfdd680-30a5-11e9-8a27-0545dd846e3f.jpg)

#### Voice Channels
  - Users can talk to other members inside of voice channels
  - If you are behind a symetric NAT or certain firewalls WebRTC may not be able to create a peer to peer connection with your computer. The solution to this would be to implement a TURN relay server, however, these are expensive to operate. A TURN server provides a fallback solution for clients that cannot establish a Peer to Peer connection and acts as a media server proxy between the two peers.
  
#### Friends & Friend Requests
  - Users can send a friend request by clicking on a users avatar of username
  - Friend requests are sent in real time
  - Users can cancel outgoing friend requests
  - Users can accept or ignore incoming friend requests
  - Users can remove friends from their friends list
  - Users can see who is online/offline
  
![image 2-13-19 at 5 56 pm](https://user-images.githubusercontent.com/4982876/52749986-e2f97d00-2fb8-11e9-9a57-ddf26293013e.jpg)
  
#### Direct Messaging
  - Users can send direct messages by clicking on a users avatar of username
  - Users can remove direct messages without losing their message history
  - Users receive direct message notifications
  
#### Bot
  - When a new user is created a bot will send them a direct message
  - Users can instruct the bot to send a friend request or a delayed message (to test notifications)
  - The bot can provide useful information about the site
  
![image 2-13-19 at 5 59 pm](https://user-images.githubusercontent.com/4982876/52750073-2d7af980-2fb9-11e9-984d-67051e492edf.jpg)

## Challenges

#### WebRTC

Working with WebRTC proved to be very challenging. The core of WebRTC is `RTCPeerConnection`. In order to establish peer to peer media exchange, `RTCPeerConnection` provides an API to complete a handshake between two browsers. During this handshake, the browsers share the information necessary to set up their peer-to-peer connection: session descriptions (browser capabilities) and ICE candidates (publicly accessible IP and port information).

The steps are:

1. Browser requests access to User A's media stream.

```javascript
navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
  this.localstream = stream;
}).then(() => this.handleJoinSession());
```

2. User A enters the room.

```javascript
handleJoinSession() {
  const that = this;
  this.voiceSession = App.cable.subscriptions.create(
    { channel: "VoiceChannel", channelId: this.props.channel.id },
    {
      connected: () => {
        this.voiceSession.broadcastData({
          type: JOIN_ROOM,
          from: this.props.currentUserId
        });
      },
      received: data => {
        console.log("received", data);
        if (data.from === this.props.currentUserId) return;
        switch (data.type) {
          case JOIN_ROOM:
            return this.joinRoom(data);
          case EXCHANGE:
            if (data.to !== this.props.currentUserId) return;
            return this.exchange(data);
          case REMOVE_USER:
            return this.removeUser(data);
          default:
            return;
        }
      },
      broadcastData: function (data) { return this.perform("broadcast", { channelId: that.props.channel.id, data }) }
    });
}
```

3. Create a peer connection for User A, then create an offer that will contain their session description (SDP). Set offer as User A’s local description. Then send the offer to User B using Action Cable.

```javascript
createPC(userId, isOffer) {
const ice = { iceServers: [{ urls: "stun:stun1.l.google.com:19302" }, { urls: "stun:stun2.l.google.com:19302" }] };
let pc = new RTCPeerConnection(ice);
this.pcPeers[userId] = pc;
this.localstream.getTracks().forEach(track => pc.addTrack(track, this.localstream));
if (isOffer) {
  pc.createOffer().then(offer => {
    pc.setLocalDescription(offer).then(() => {
      this.voiceSession.broadcastData({
        type: EXCHANGE,
        from: this.props.currentUserId,
        to: userId,
        sdp: JSON.stringify(pc.localDescription)
      });
    });
  }).catch(this.logError);
}
```

4. User B receives the offer and sets it as their remote description. User B then generates an answer to the offer and sets the answer as their local description. Then User B sends their answer to User A using Action Cable.

```javascript
if (data.sdp) {
  const sdp = JSON.parse(data.sdp);
  pc.setRemoteDescription(sdp).then(() => {
    if (sdp.type === "offer") {
      pc.createAnswer().then(answer => {
        pc.setLocalDescription(answer).then(() => {
          this.voiceSession.broadcastData({
            type: EXCHANGE,
            from: this.props.currentUserId,
            to: data.from,
            sdp: JSON.stringify(pc.localDescription)
          });
        });
      });
    }
  }).catch(this.logError);
}
```

5. User A and B will now have local and remote descriptions. Concurrently, we need to send ICE candidates via Action Cable as they become available so that User A and B can connect

```javascript
if (data.candidate) {
  pc.addIceCandidate(new RTCIceCandidate(JSON.parse(data.candidate)))
    .then(() => console.log("Ice candidate added"))
    .catch(this.logError);
}
```

6. When enough candidates have been exchanged for a direct connection to be possible, the peer connection is established

```javascript
pc.onicecandidate = event => {
  if (event.candidate) {
    this.voiceSession.broadcastData({
      type: EXCHANGE,
      from: this.props.currentUserId,
      to: userId,
      candidate: JSON.stringify(event.candidate)
    });
  }
};

pc.ontrack = event => {
  const element = document.createElement("audio");
  element.id = `remoteAudioContainer+${userId}`;
  element.autoplay = "autoplay";
  element.srcObject = event.streams[0];
  this.remoteAudioContainer.current.appendChild(element);
};
```

#### SQL

I also wanted to decrease my initial load times as much as possible, so I worte the following custom query, decreasing my total database queries by 9.

```ruby
@users = User.distinct.select('users.*').left_outer_joins(:friend_requests)
  .left_outer_joins(:incoming_friend_requests).left_outer_joins(:friendships)
  .where("incoming_friend_requests_users.user_id = :current_user_id OR friend_requests.friend_id = :current_user_id OR friendships.friend_id = :current_user_id OR users.id IN (:dm_user_ids)", current_user_id: current_user_id, dm_user_ids: dm_user_ids)
  .includes(:sessions, :server_memberships)
```

Which in SQL would be:

```sql
SELECT DISTINCT 
  users.* 
FROM 
  users
LEFT OUTER JOIN 
  friend_requests 
ON 
  friend_requests.user_id = users.id
LEFT OUTER JOIN 
  friend_requests AS incoming_friend_requests_users 
ON 
  incoming_friend_requests_users.friend_id = users.id
LEFT OUTER JOIN 
  friendships 
ON 
  friendships.user_id = users.id
WHERE 
  incoming_friend_requests_users.user_id = 1040
  OR friend_requests.friend_id = 1040 
  OR friendships.friend_id = 1040 
  OR users.id IN (1040,1054,1041,1052,1051,1053,1046);
```

Please see the [wiki](https://github.com/jeffdeliso/discors/wiki) for more information.
