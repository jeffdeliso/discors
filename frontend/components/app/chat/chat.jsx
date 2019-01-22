
import React from 'react';
import { Link } from 'react-router-dom';

class Chat extends React.Component {

  render() {
    return (
      <div className="chat-main">
        <div className="message-wrapper">
          <div className="message-scroll-wrapper">
            <div className="message-list">

              <div className="message">
                <div className="user-image"></div>
                <div className="username-message">
                  <div className="username-time">
                    <h4>deliso346</h4>
                    <h5>Today</h5>
                  </div>
                  <span>Thus is my awrsome message</span>
                </div>
              </div>

            </div>
          </div>
        </div>
        <form className="message-form">
          <textarea rows="1" placeholder="Message #general" tabIndex="1" className="text-area"></textarea>
        </form>
      </div>
    )
  }
}

export default Chat;