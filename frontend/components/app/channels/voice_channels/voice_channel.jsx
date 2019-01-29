import React from 'react';
import { NavLink } from 'react-router-dom';
// import Tooltip from '../../modal/tooltip';
const JOIN_ROOM = "JOIN_ROOM";
const EXCHANGE = "EXCHANGE";
const REMOVE_USER = "REMOVE_USER";

class VoiceChannel extends React.Component {
  constructor(props) {
    super(props);
    this.remoteAudioContainer = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.pcPeers = {};
  }

  handleClick() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      this.localstream = stream;
    }).then(() => this.handleJoinSession());
  }

  handleJoinSession() {
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
        broadcastData: function (data) { return this.perform("broadcast", { channelId: this.props.channel.id, data }) }
      });
  }

  handleLeaveSession() {
    for (let user in this.pcPeers) {
      this.pcPeers[user].close();
    }
    this.pcPeers = {};

    this.voiceSession.unsubscribe();


    this.voiceSession.broadcastData({
      type: REMOVE_USER,
      from: this.props.currentUserId
    });
  }

  removeUser(data) {
    console.log("removing user", data.from);
    let audio = document.getElementById(`remoteAudioContainer+${data.from}`);
    audio && audio.remove();
    delete this.pcPeers[data.from];
  }

  createPC(userId, isOffer) {
    let pc = new RTCPeerConnection();
    this.pcPeers[userId] = pc;
    pc.addStream(this.localstream);
    isOffer &&
      pc
        .createOffer()
        .then(offer => {
          pc.setLocalDescription(offer);
          this.voiceSession.broadcastData({
            type: EXCHANGE,
            from: this.props.currentUserId,
            to: userId,
            sdp: JSON.stringify(pc.localDescription)
          });
        })
        .catch(this.logError);

    pc.onicecandidate = event => {
      event.candidate &&
        this.voiceSession.broadcastData({
          type: EXCHANGE,
          from: this.props.currentUserId,
          to: userId,
          candidate: JSON.stringify(event.candidate)
        });
    };

    pc.onaddstream = event => {
      const element = document.createElement("audio");
      element.id = `remoteAudioContainer+${userId}`;
      element.autoplay = "autoplay";
      element.srcObject = event.stream;
      this.remoteAudioContainer.current.appendChild(element);
    };

    pc.oniceconnectionstatechange = event => {
      if (pc.iceConnectionState == "disconnected") {
        console.log("Disconnected:", userId);
        this.voiceSession.broadcastData({
          type: REMOVE_USER,
          from: userId
        });
      }
    };

    return pc;
  }

  exchange(data) {
    let pc;

    if (!this.pcPeers[data.from]) {
      pc = this.createPC(data.from, false);
    } else {
      pc = this.pcPeers[data.from];
    }

    if (data.candidate) {
      pc
        .addIceCandidate(new RTCIceCandidate(JSON.parse(data.candidate)))
        .then(() => console.log("Ice candidate added"))
        .catch(this.logError);
    }

    if (data.sdp) {
      const sdp = JSON.parse(data.sdp);
      pc.setRemoteDescription(new RTCSessionDescription(sdp)).then(() => {
        if (sdp.type === "offer") {
          pc.createAnswer().then(answer => {
            pc.setLocalDescription(answer);
            this.voiceSession.broadcastData({
              type: EXCHANGE,
              from: this.props.currentUserId,
              to: data.from,
              sdp: JSON.stringify(pc.localDescription)
            });
          });
        }
      })
        .catch(this.logError);
    }
  }

  logError(error) {
    console.warn("Whoops! Error:", error);
  }

  joinRoom(data) {
    this.createPC(data.from, true);
  }

  render() {
    return (
      <div className="channel" onClick={this.handleClick} ref={this.remoteAudioContainer}>
        <svg width="16" height="16" viewBox="0 0 16 16"><path class="foreground-2W-aJk" fill="currentColor" d="M9.33333333,2 L9.33333333,3.37333333 C11.26,3.94666667 12.6666667,5.73333333 12.6666667,7.84666667 C12.6666667,9.96 11.26,11.74 9.33333333,12.3133333 L9.33333333,13.6933333 C12,13.0866667 14,10.7 14,7.84666667 C14,4.99333333 12,2.60666667 9.33333333,2 L9.33333333,2 Z M11,7.84666667 C11,6.66666667 10.3333333,5.65333333 9.33333333,5.16 L9.33333333,10.5133333 C10.3333333,10.04 11,9.02 11,7.84666667 L11,7.84666667 Z M2,5.84666667 L2,9.84666667 L4.66666667,9.84666667 L8,13.18 L8,2.51333333 L4.66666667,5.84666667 L2,5.84666667 L2,5.84666667 Z"></path></svg>
        <div className="channel-name">{this.props.channel.name}</div>
      </div>
    )
  };
};

export default VoiceChannel;