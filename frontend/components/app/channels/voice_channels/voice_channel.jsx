import React from 'react';
import Tooltip from '../../modal/tooltip';

const JOIN_ROOM = "JOIN_ROOM";
const EXCHANGE = "EXCHANGE";
const REMOVE_USER = "REMOVE_USER";

class VoiceChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.pcPeers = {};
    this.remoteAudioContainer = React.createRef();

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleMouseEnter() {
    if (this.props.channel.name !== 'General' && this.props.currentUserId === this.props.server.admin_id) {
      this.setState({ active: true });
    }
  }

  handleMouseLeave() {
    if (this.props.channel.name !== 'General' && this.props.currentUserId === this.props.server.admin_id) {
      this.setState({ active: false });
    }
  }

  handleDelete(e) {
    e.stopPropagation();
    if (this.voiceSession) this.handleLeaveSession();
    this.props.leaveVoiceChannel();
    this.props.deleteVoiceChannel();
  }

  handleClick() {
    this.props.selectVoiceChannel();
  }

  componentDidMount() {
    if (this.props.select) {
      navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
        this.localstream = stream;
      }).then(() => this.handleJoinSession());
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected && !this.props.selected) {
      if (this.voiceSession) this.handleLeaveSession();
    } else if (!prevProps.selected && this.props.selected) {
      if (this.voiceSession) this.handleLeaveSession();

      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        this.localstream = stream;
      }).then(() => this.handleJoinSession());
    }
  }

  componentWillUnmount() {
    if (this.voiceSession) this.handleLeaveSession();
  }

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
      }
    );
  }

  handleLeaveSession() {
    for (let user in this.pcPeers) {
      this.pcPeers[user].close();
    }
    this.pcPeers = {};

    this.voiceSession.unsubscribe();

    this.localstream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    this.voiceSession.broadcastData({
      type: REMOVE_USER,
      from: this.props.currentUserId
    });
  }

  removeUser(data) {
    let audio = document.getElementById(`remoteAudioContainer+${data.from}`);
    if (audio) audio.remove();
    delete this.pcPeers[data.from];
  }

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
      });
    }

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

    pc.oniceconnectionstatechange = event => {
      if (pc.iceConnectionState == "disconnected") {
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
      pc.addIceCandidate(new RTCIceCandidate(JSON.parse(data.candidate)));
    }

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
      });
    }
  }

  logError(error) {
    console.warn(error);
  }

  joinRoom(data) {
    this.createPC(data.from, true);
  }

  render() {
    return (
      <div
        className={this.props.selected ? "channel voice-selected" : "channel"}
        onClick={this.handleClick} ref={this.remoteAudioContainer}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <svg width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M9.33333333,2 L9.33333333,3.37333333 C11.26,3.94666667 12.6666667,5.73333333 12.6666667,7.84666667 C12.6666667,9.96 11.26,11.74 9.33333333,12.3133333 L9.33333333,13.6933333 C12,13.0866667 14,10.7 14,7.84666667 C14,4.99333333 12,2.60666667 9.33333333,2 L9.33333333,2 Z M11,7.84666667 C11,6.66666667 10.3333333,5.65333333 9.33333333,5.16 L9.33333333,10.5133333 C10.3333333,10.04 11,9.02 11,7.84666667 L11,7.84666667 Z M2,5.84666667 L2,9.84666667 L4.66666667,9.84666667 L8,13.18 L8,2.51333333 L4.66666667,5.84666667 L2,5.84666667 L2,5.84666667 Z"></path></svg>
        <div className="channel-name">{this.props.channel.name}</div>
        {this.state.active ?
          (<Tooltip component={
            <button className="delete-channel-button" onClick={this.handleDelete}></button>
          }
            position="top center"
            text="Delete Channel"
          />) : null}
      </div>
    )
  };
};

export default VoiceChannel;