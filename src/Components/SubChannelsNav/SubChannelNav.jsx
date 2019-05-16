import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { grabSubChannels } from "./../../Ducks/subChannelReducer"
import SubChannelConstructor from "./SubChannelConstructor"
import Search from '../Search/Search';

import './SubChannelNav.scss';

function SubChannelNav(props) {
  useEffect(() => {
    props.grabSubChannels(props.channel_id);
  }, [props.channel_id]);

  const [search, setSearch] = useState('');

  const onChange = (e) => {
    const {value} = e.target;
    
    setSearch(value);
  };

  return (
    <>
    <div className="sub-nav-search">
      <Search placeholder="Search for a channel" onChange={onChange} />
    </div>

      {props.subChannels.map((subChannel, i) => {
        console.log(subChannel)
        return <SubChannelConstructor key={i} subChannel={subChannel} />
      })}
    </>
  )
}

const mapStateToProps = reduxState => reduxState.subChannelReducer

export default connect(
  mapStateToProps,
  { grabSubChannels }
)(SubChannelNav)
