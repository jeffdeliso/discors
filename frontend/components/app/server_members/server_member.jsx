import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { withRouter } from 'react-router-dom';

class ServerMember extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    // this.state = { open: false };
    // this.openModal = this.openModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
  }

  // openModal() {
  //   this.setState({ open: true });
  // }

  // closeModal() {
  //   this.setState({ open: false });
  // }

  handleClick() {
    this.props.createDmChannel(this.props.user.id).then((action) => this.props.history.push(`/channels/@me/${action.channel.id}`));
  }

  render() {
    return (
      <Popup trigger={
        <div className="server-member">
          <div className="server-member-img" style={this.props.user.image_url ? { backgroundImage: `url(${this.props.user.image_url})` } : {}}></div>
          <span>{this.props.user.username}</span>
        </div>
      }
        arrow={false}
        position="left center"
        closeOnDocumentClick
        on="click"
        // open={this.state.open}
        // onClose={this.closeModal}
        // offsetY={165}
        offsetX={-15}
        // overlayStyle={{
        //   width: `auto`,
        //   backgroundColor: 'black',
        // }}
        // arrowStyle={{
        //   backgroundColor: 'black',
        //   zIndex: 4,
        // }}
        contentStyle={{
          borderRadius: '5px',
          boxShadow: '0 2px 10px 0 rgba(0, 0, 0, .2), 0 0 0 1px rgba(32, 34, 37, .6)',
          overflow: 'hidden',
          width: '250px',
          whiteSpace: 'nowrap',
          fontFamily: 'main3',
          color: '#fff',
          border: 'none',
          fontSize: '14px',
          display: 'flex',
          padding: '0',
          display: 'flex',
          flexDirection: 'column',

        }}
      >
        <div className="user-popup">
          <div className="user-popup-top">
            <div className="user-popup-img" style={this.props.user.image_url ? { backgroundImage: `url(${this.props.user.image_url})` } : {}}></div>
            <h5>{this.props.user.username}</h5>
          </div>
          <div className="user-popup-bottom">
            <button id="session-submit" 
              style={{marginBottom: 0}}
              onClick={this.handleClick}
            >{`Message @${this.props.user.username}`}</button>
          </div>
        </div>
      </Popup>
    )
  }
}

export default withRouter(ServerMember);