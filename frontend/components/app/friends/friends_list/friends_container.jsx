import { connect } from 'react-redux';
import Friends from './friends';
import { fetchFriends, deleteFriend } from '../../../../actions/friends_actions';


const mapStateToProps = (state, ownProps) => {
  const friends = state.entities.friends.map((id) => {
    return state.entities.users[id] || {};
  });

  return {
    friends,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFriends: () => dispatch(fetchFriends()),
    deleteFriend: (id) => dispatch(deleteFriend(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);