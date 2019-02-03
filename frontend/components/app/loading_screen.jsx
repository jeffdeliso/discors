import React from 'react';

const LoadingScreen = (props) => {
  return (
    <div className={`loading-screen ${props.classText}`}>
      <video height="200" width="200" autoPlay loop muted>
        <source src="https://s3.amazonaws.com/discors-dev/Main/loading.webm" type="video/webm" />
        <source src="https://s3.amazonaws.com/discors-dev/Main/loading.mp4" type="video/mp4" />
        <img alt="" src="https://s3.amazonaws.com/discors-dev/Main/loading.png" />
      </video>
      <h5>{props.text}</h5>
    </div>
  )
}

export default LoadingScreen;

