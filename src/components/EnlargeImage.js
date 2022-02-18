import React from "react";
 
const EnlargeImage = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <img src={props.url}></img>
      </div>
    </div>
  );
};
 
export default EnlargeImage;