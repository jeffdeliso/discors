import React from 'react';
import { connect } from 'react-redux';
import { joinServer, fetchServers } from '../../../actions/server_actions';
import SearchServerItem from './search_server_item';

class SearchServersForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', servers: [] };
  }

  componentDidMount() {
    this.props.fetchServers();
    this.nameInput.focus();
  }

  componentDidUpdate() {
    this.nameInput.focus();
  }

  update() {
    return e => {
      const name = e.currentTarget.value;
      let servers;

      if (name) {
        servers = this.props.servers.filter(server => {
          return server.name.match(new RegExp(`^.*${name}.*$`, 'i'));
        });
      } else {
        servers = [];
      }

      this.setState({ name, servers });
    };
  }

  render() {
    let servers;
    if (this.state.servers.length === 0 && this.state.name) {
      servers = <div className="server-search-empty">{`No servers match "${this.state.name}"`}</div>;
    } else {
      servers = this.state.servers.map((server, idx) => {
        return <SearchServerItem
          server={server}
          key={idx}
          closeModal={this.props.closeModal}
          joinServer={this.props.joinServer}
          currentUserId={this.props.currentUserId}
        />;
      });
    }

    return (
      <section className="create-channel-form" onSubmit={this.handleSubmit}>
        <header>
          <h4 style={{ marginBottom: '4px' }}>Server Discovery</h4>
          <input type="text"
            placeholder={`Try searching for a server like "westeros"`}
            value={this.state.name}
            onChange={this.update()}
            className='session-input'
            ref={(input) => { this.nameInput = input; }}
            id="search-input"
          />
        </header>
        <main className="search-results">
          <ul>
            {servers}
          </ul>
        </main>
        <div className="create-channel-form-bottom" id="search-bottom">
          <button type="button" className="create-channel-cancel" onClick={this.props.closeModal}>Cancel</button>
        </div>
      </section >
    )
  }
}


const mapStateToProps = state => {
  const currentUserId = state.session.id

  // const currentUserServers = state.entities.users[currentUserId].servers;
  // const servers = Object.values(state.entities.servers).filter(server => {
  //   return !currentUserServers.includes(server.id);
  // });

  const servers = Object.values(state.entities.servers)

  return {
    servers,
    currentUserId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    joinServer: (server, userId) => dispatch(joinServer(server, userId)),
    fetchServers: (server, userId) => dispatch(fetchServers(server, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchServersForm);