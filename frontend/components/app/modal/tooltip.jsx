import React from 'react';
import Popup from 'reactjs-popup';

class Tooltip extends React.Component {
  render() {
    return (
      <Popup trigger={this.props.component}
        position={this.props.position}
        on="hover"
        overlayStyle={{
          width: `auto`,
          backgroundColor: 'black', 
        }}
        arrowStyle={{
          backgroundColor: 'black',
          zIndex: 4,
        }}
        contentStyle={{
          zIndex: 4,
          width: `auto`,
          whiteSpace: 'nowrap',
          fontFamily: 'main3',
          borderRadius: 5,
          color: '#fff',
          backgroundColor: 'black',
          border: 'none',
          fontSize: '14px',
          display: 'flex',
          padding: '8px 10px',
          pointerEvents: 'none',
        }}
      >
        <div>{this.props.text}</div>
      </Popup>
    );
  }
}

export default Tooltip; 