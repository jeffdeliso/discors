import React from "react";
import UserPopup from "../modal/user_popup_container";
import { withRouter } from 'react-router-dom';
import moment from 'moment-timezone';

class Message extends React.Component {
  parseDate() {
    const time = moment(this.props.time).tz('America/New_York');
    return time.calendar();
  }

  transition() {
    const popUp = document.getElementsByClassName('popup-content');
    popUp[0].style.transform = 'translate(-10px, 0)';
  }

  parseLinks(body) {
    const lines = body.split('\n');
    return lines.map((line, j) => {
      const words = line.split(/\s/);
      const content = [];

      words.map((word, i) => {
        let separator = i < (words.length - 1) ? ' ' : '';

        if (word.match(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i)) {
          content.push(
            <span key={i}>
              <a href={word} target="_blank">
                <img src={word} />
              </a>
            </span>
          );

          content.push(<br key={i + 999} />);
        } else if (word.match('^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$')) {
          content.push(
            <span key={i}>
              <iframe
                src={word.replace("watch?v=", "embed/")}
                allowFullScreen></iframe>
            </span>
          );

          content.push(<br key={i + 999} />);
        } else if (word.match(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/)) {
          content.push(<a key={i} href={word} target="_blank">{word}{separator}</a>);
        } else {
          content.push(word + separator);
        }
      });

      if (typeof content[content.length - 1] === 'string' && j < lines.length - 1) {
        return content.concat(<br key={j + 499} />);
      } else {
        return content;
      }
    })
  }

  render() {
    return (
      <div className="message">
        <UserPopup component={
          <div className="user-image" style={this.props.user.image_url ? { backgroundImage: `url(${this.props.user.image_url})` } : {}}></div>
        }
          user={this.props.user}
          position={'right center'}
          offsetX={2}
          offsetY={60}
          onOpen={this.transition}
        />
        <div className="username-message">
          <div className="username-time">
            <UserPopup component={
              <h4>{this.props.user.username}</h4>
            }
              user={this.props.user}
              position={'right center'}
              offsetX={2}
              offsetY={72}
              onOpen={this.transition}
            />
            <h5>{this.parseDate()}</h5>
          </div>
          <div className="message-p-wrapper">
            <p>{this.parseLinks(this.props.message)}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Message);