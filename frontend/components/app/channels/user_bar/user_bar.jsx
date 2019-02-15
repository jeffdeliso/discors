import React from 'react';
import Modal from 'react-modal';
import Tooltip from '../../modal/tooltip';
import EditUserForm from '../edit_user_form';

class UserBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showUserModal: false };
    this.handleOpenUserModal = this.handleOpenUserModal.bind(this);
    this.handleCloseUserModal = this.handleCloseUserModal.bind(this);
  }

  handleOpenUserModal() {
    this.setState({ showUserModal: true });
  }

  handleCloseUserModal() {
    this.setState({ showUserModal: false });
    this.props.removeErrors();
  }

  render() {
    return (
      <>
        <div className="user-actions">
          <div className="icon-name-wrapper">
            <Tooltip component={
              <div className="user-icon" style={{ backgroundImage: `url(${this.props.currentUser.image_url})` }} onClick={this.handleOpenUserModal}>
                <div
                  className="server-member-status-indicator"
                  style={this.props.currentUser.online ? { backgroundColor: '#43b581' } : { backgroundColor: '#747f8d' }}
                ></div>
              </div>
            }
              position="top center"
              text="Update Profile"
            />
            <div className="actions-username">{this.props.currentUser.username}</div>
          </div>
          <Tooltip component={
            <button className="gear" onClick={() => this.props.logout()}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          }
            position="top center"
            text="Logout"
          />
        </div>
        <Modal
          isOpen={this.state.showUserModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseUserModal}
          closeTimeoutMS={150}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 99,
            },
            content: {
              height: '271px',
              width: '500px',
              padding: 0,
              borderRadius: '5px',
              margin: 'auto',
              boxShadow: '0 0 0 1px rgba(32,34,37,.6), 0 2px 10px 0 rgba(0,0,0,.2)',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#37393f',
              border: 'none',
            }
          }}
        >
          <EditUserForm
            closeModal={this.handleCloseUserModal}
            errors={this.props.errors}
            currentUser={this.props.currentUser}
            editUser={this.props.editUser}
          />
        </Modal>
      </>
    )
  }
}

export default UserBar;
