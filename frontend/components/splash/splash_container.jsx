import { connect } from 'react-redux';
import Splash from './splash';



const mapStateToProps = ({ session }) => {
  return {
    currentUserId: session.id,
  };
};

export default connect(mapStateToProps)(Splash);