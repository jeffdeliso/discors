import React from 'react';
import Tooltip from '../../modal/tooltip';

class Header extends React.Component {
  render() {
    return (
      <header className="chat-header">
        <div style={{ display: 'flex', paddingBottom: '2px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" color="#72767d" className="hash">
            <path className="foreground-2W-aJk" fill="currentColor" d="M2.27333333,12 L2.74666667,9.33333333 L0.08,9.33333333 L0.313333333,8 L2.98,8 L3.68666667,4 L1.02,4 L1.25333333,2.66666667 L3.92,2.66666667 L4.39333333,0 L5.72666667,0 L5.25333333,2.66666667 L9.25333333,2.66666667 L9.72666667,0 L11.06,0 L10.5866667,2.66666667 L13.2533333,2.66666667 L13.02,4 L10.3533333,4 L9.64666667,8 L12.3133333,8 L12.08,9.33333333 L9.41333333,9.33333333 L8.94,12 L7.60666667,12 L8.08,9.33333333 L4.08,9.33333333 L3.60666667,12 L2.27333333,12 L2.27333333,12 Z M5.02,4 L4.31333333,8 L8.31333333,8 L9.02,4 L5.02,4 L5.02,4 Z"
              transform="translate(3 4)"></path>
          </svg>
          <span className="username">{this.props.channel.name}</span>
        </div>
        <Tooltip component={
          <span tabIndex="0" className="hide-members" role="button" onClick={this.props.toggleShowMembers}><svg
            width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" fillRule="evenodd">
              <polygon points="0 0 24 0 24 24 0 24"></polygon>
              <path className="iconForeground-3y9f0B" fill="currentColor" d="M19 19L23 19 23 16.5C23 14.17 18.33 13 16 13 15.71 13 15.38 13.02 15.03 13.05 15.2979181 13.2440097 15.5471657 13.4534892 15.7720754 13.6791778 17.5922944 14.6769857 19 16.1183086 19 18L19 19zM14.3335577 10.4967128C14.8098529 10.8147627 15.3828086 11 16 11 17.66 11 18.99 9.66 18.99 8 18.99 6.34 17.66 5 16 5 15.3827845 5 14.8098082 5.18525173 14.3335019 5.5033244 14.7574619 6.23791814 15 7.09053797 15 8.00006693 15 8.90955601 14.7574832 9.76214095 14.3335577 10.4967128zM9 12C6.79 12 5 10.21 5 8 5 5.79 6.79 4 9 4 11.21 4 13 5.79 13 8 13 10.21 11.21 12 9 12zM9 14C11.67 14 17 15.34 17 18L17 20 1 20 1 18C1 15.34 6.33 14 9 14z"></path>
            </g>
          </svg></span>
        }
          position="bottom right"
          text="Member List"
        />
      </header >
    )
  }
}

export default Header;
