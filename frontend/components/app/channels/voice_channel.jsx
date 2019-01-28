import React from 'react';
import { NavLink } from 'react-router-dom';
import Tooltip from '../modal/tooltip';
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

    this.voiceSession = App.cable.subscriptions.create("VoiceChannel", {
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
      broadcastData: function (data) { return this.perform("broadcast", {data}) }
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
        {/* <audio  volue="true" autoPlay></audio> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="colorDefaultText-oas-QM icon-sxakjD">
          <path className="foreground-2W-aJk" fill="currentColor" d="M2.27333333,12 L2.74666667,9.33333333 L0.08,9.33333333 L0.313333333,8 L2.98,8 L3.68666667,4 L1.02,4 L1.25333333,2.66666667 L3.92,2.66666667 L4.39333333,0 L5.72666667,0 L5.25333333,2.66666667 L9.25333333,2.66666667 L9.72666667,0 L11.06,0 L10.5866667,2.66666667 L13.2533333,2.66666667 L13.02,4 L10.3533333,4 L9.64666667,8 L12.3133333,8 L12.08,9.33333333 L9.41333333,9.33333333 L8.94,12 L7.60666667,12 L8.08,9.33333333 L4.08,9.33333333 L3.60666667,12 L2.27333333,12 L2.27333333,12 Z M5.02,4 L4.31333333,8 L8.31333333,8 L9.02,4 L5.02,4 L5.02,4 Z"
            transform="translate(1.333 2)"></path>
        </svg>
        <div className="channel-name">Voice</div>
      </div>
    )
  };
};

export default VoiceChannel;