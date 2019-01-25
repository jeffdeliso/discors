import React from 'react';
import Popup from 'reactjs-popup';

const UserPopup = ({ component, position, offsetX, offsetY, user, currentUser, handleClick }) => (
  <Popup trigger={component}
    arrow={false}
    position={position}
    closeOnDocumentClick
    on="click"
    offsetX={offsetX || 0}
    offsetY={offsetY || 0}
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
      backgroundColor: 'black',
      overflow: 'auto',
    }}
  >
    <div className="user-popup">
      <div className="user-popup-top">
        <div className="user-popup-img" style={user.image_url ? { backgroundImage: `url(${user.image_url})` } : {}}></div>
        <h5>{user.username}</h5>
      </div>
      <div className="user-popup-bottom">
        {user.id === currentUser.id ? null : <button id="session-submit"
          style={{ marginBottom: 0 }}
          onClick={handleClick}
        >{`Message @${user.username}`}</button>}
      </div>
    </div>
  </Popup>
);



export default UserPopup; 