import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function MainChannelConstructor(props) {
  return (
    <Link to={`/landingpage/${props.name}`}>
      <div>
        <img src={props.image} alt="" />
        <h1>{props.name}</h1>
      </div>
    </Link>
  );
};

export default MainChannelConstructor;
