import React from 'react';
import { NavLink } from 'react-router-dom';
import Server from './server';
import Modal from 'react-modal';
import CreateServerForm from './create_server_form';
import JoinServerForm from './join_server_form';
import Tooltip from '../modal/tooltip';

class Servers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, content: '' };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchServers();
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false, content: '' });
    this.props.removeServerErrors();
  }

  updateContent(type) {
    this.setState({ content: type });
  }

  render() {
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
        errors={this.props.errors} />;
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
        <div className="separator"></div>
        <div className="side-scroll-container">
          {servers}
          <button className="create-server"
            onClick={this.handleOpenModal}
            onKeyDown={(e) => e.preventDefault()}
          ><span>+</span></button>
        </div>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          style={{
            overlay: {
              backgroundColor: 'rgb(0, 0, 0, 0.85)',
              zIndex: 99,
            },
            content: {
              height: '420px',
              width: '540px',
              padding: 0,
              borderRadius: '5px 5px 5px 5px',
              margin: 'auto',
              background: 'rgb(255, 255, 255, 1)',
              boxSizing: 'border-box',
            }
          }}
        >
          {content}
        </Modal>
      </div>
    )
  }
}

export default Servers;