import React from 'react';
import Chat from '../chat/chat/chat_container';
import MeHeader from '../header/me_header/me_header_container';

class MeMain extends React.Component {
  render() {
    return (
      <>
        <div className="chat-container">
          <MeHeader />
          <div className="chat-main-container">
            <Chat />
          </div>
        </div>
      </>
    )
  }
}

export default MeMain;