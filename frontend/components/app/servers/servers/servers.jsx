import React from 'react';
import { NavLink } from 'react-router-dom';
import Server from '../server';
import Modal from 'react-modal';
import CreateServerForm from '../create_server_form';
import JoinServerForm from '../join_server_form';
import Tooltip from '../../modal/tooltip';
import DmNotification from '../dm_notification';
import SearchServersForm from '../search_servers_form';

class Servers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showSearchModal: false,
      content: ''
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenSearchModal = this.handleOpenSearchModal.bind(this);
    this.handleCloseSearchModal = this.handleCloseSearchModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
    setTimeout(() => this.setState({ content: '' }), 150);
    this.props.removeServerErrors();
  }

  handleOpenSearchModal() {
    this.setState({ showSearchModal: true });
  }

  handleCloseSearchModal() {
    this.setState({ showSearchModal: false });
  }

  updateContent(type) {
    this.setState({ content: type });
  }

  render() {
    const dmNotifications = this.props.dmNotifications.map((notification, idx) => {
      return <DmNotification
        key={idx}
        notification={notification}
        user={this.props.users[idx]}
      />;
    })

    const servers = this.props.servers.map((server, idx) => {
      return <Server key={idx} server={server} />
    });

    Modal.setAppElement('#root');
    let content;

    if (this.state.content === "create") {
      content = <CreateServerForm
        createServer={this.props.createServer}
        closeModal={this.handleCloseModal}
        errors={this.props.errors} />;
    } else if (this.state.content === "join") {
      content = <JoinServerForm
        joinServer={this.props.joinServer}
        closeModal={this.handleCloseModal}
        errors={this.props.errors} 
        currentUserId={this.props.currentUser.id}
      />;
    } else {
      content = (
        <div className="server-modal-content-wrapper">
          <div className="server-modal-content">
            <h3 className="create-server-header">OH, ANOTHER SERVER HUH?</h3>
            <div className="modal-create-join">
              <div className="modal-create-server" onClick={() => this.updateContent('create')}>
                <h4>CREATE</h4>
                <p>Create a new server and invite your friends. It's free!</p>
                <div></div>
                <button className="modal-create-button">Create a server</button>
              </div>
              <div className="modal-join-server" onClick={() => this.updateContent('join')}>
                <h4>JOIN</h4>
                <p>Enter a server name and join your friends server.</p>
                <div></div>
                <button className="modal-join-button">Join a server</button>
              </div>
            </div>
          </div>
          <div className="or">or</div>
        </div>
      )
    }

    return (
      <div className="side-bar">
        <Tooltip component={
          <NavLink to='/channels/@me' className="home-icon" activeClassName="serverSelected">
            <div className="server-active-icon"></div>
          </NavLink>
        }
          position="right center"
          text="Home"
        />
        <div className="friends-online">{`${this.props.onlineCount} Online`}</div>
        {dmNotifications}
        <div className="separator"></div>
        <div className="side-scroll-container">
          {servers}
          <button className="create-server"
            type="button"
            onClick={this.handleOpenModal}
          ><span>+</span></button>
          <Tooltip component={
            <button className="create-server"
              type="button"
              onClick={this.handleOpenSearchModal}
            ><svg className="server-search" width="24" height="24" viewBox="0 0 18 18"><g fill="none" fillRule="evenodd"><path fill="currentColor" d="M3.60091481,7.20297313 C3.60091481,5.20983419 5.20983419,3.60091481 7.20297313,3.60091481 C9.19611206,3.60091481 10.8050314,5.20983419 10.8050314,7.20297313 C10.8050314,9.19611206 9.19611206,10.8050314 7.20297313,10.8050314 C5.20983419,10.8050314 3.60091481,9.19611206 3.60091481,7.20297313 Z M12.0057176,10.8050314 L11.3733562,10.8050314 L11.1492281,10.5889079 C11.9336764,9.67638651 12.4059463,8.49170955 12.4059463,7.20297313 C12.4059463,4.32933105 10.0766152,2 7.20297313,2 C4.32933105,2 2,4.32933105 2,7.20297313 C2,10.0766152 4.32933105,12.4059463 7.20297313,12.4059463 C8.49170955,12.4059463 9.67638651,11.9336764 10.5889079,11.1492281 L10.8050314,11.3733562 L10.8050314,12.0057176 L14.8073185,16 L16,14.8073185 L12.2102538,11.0099776 L12.0057176,10.8050314 Z"></path></g></svg></button>
          }
            position="right center"
            text="Server Discovery"
          />
        </div>
        <Modal
          closeTimeoutMS={150}
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              zIndex: 99,
            },
            content: {
              height: '420px',
              width: '540px',
              padding: 0,
              borderRadius: '5px 5px 5px 5px',
              margin: 'auto',
              background: 'rgb(255, 255, 255)',
              boxSizing: 'border-box',
            }
          }}
        >
          {content}
        </Modal>
        <Modal
          isOpen={this.state.showSearchModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseSearchModal}
          closeTimeoutMS={150}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              zIndex: 99,
            },
            content: {
              height: '382px',
              width: '440px',
              padding: 0,
              borderRadius: '5px',
              margin: 'auto',
              boxShadow: '0 0 0 1px rgba(32,34,37,.6), 0 2px 10px 0 rgba(0,0,0,.2)',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#36393f',
              border: 'none'
            }
          }}
        >
          <SearchServersForm
            closeModal={this.handleCloseSearchModal}
          />
        </Modal>
      </div>
    )
  }
}

export default Servers;