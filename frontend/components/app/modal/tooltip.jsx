import React from 'react';
import Popup from 'reactjs-popup';

function Tooltip(props) {
  return (
    <Popup trigger={props.component}
      position={props.position}
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
      <div>{props.text}</div>
    </Popup>
  );
}

export default Tooltip; 