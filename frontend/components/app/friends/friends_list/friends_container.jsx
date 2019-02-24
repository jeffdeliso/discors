import { connect } from 'react-redux';
import Friends from './friends';
import { deleteFriend } from '../../../../actions/friends_actions';
import { createDmChannel } from '../../../../actions/channel_actions';

const mapStateToProps = (state) => {
  const friends = state.entities.friends.map((id) => {
    return state.entities.users[id] || {};
  }).sort((a, b) => {
    if (a.username < b.username) { return -1; }
    if (a.username > b.username) { return 1; }
    return 0;
  });

  return {
    friends,
    currentUser: state.entities.users[state.session.id],
    servers: state.entities.servers,
    allFriends: true
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFriend: (id) => dispatch(deleteFriend(id)),
    createDmChannel: userId => dispatch(createDmChannel(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);