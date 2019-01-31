import { connect } from 'react-redux';
import Friends from './friends';
import { fetchFriends, deleteFriend } from '../../../../actions/friends_actions';
import { createDmChannel } from '../../../../actions/channel_actions';


const mapStateToProps = (state, ownProps) => {
  const friends = state.entities.friends.map((id) => {
    return state.entities.users[id] || {};
  }).filter((friend) => {
    return friend.online;
  });

  return {
    friends,
    currentUser: state.entities.users[state.session.id],
    servers: state.entities.servers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFriends: () => dispatch(fetchFriends()),
    deleteFriend: (id) => dispatch(deleteFriend(id)),
    createDmChannel: userId => dispatch(createDmChannel(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);