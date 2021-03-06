import React, {useState} from 'react';
import {connect} from 'react-redux';

import FriendsList from './../FriendsList/FriendsList';
import Search from '../Search/Search';
import UserToolbar from '../UserToolbar/UserToolbar';

function SubPrivateNav(props) {
  const [search, setSearch] = useState('');
  
  const onChange = (e) => {
    const {value} = e.target;
    setSearch(value)
  };

  return (
    <section className="sub-nav">

      <div className="sub-nav-search">
        <Search placeholder="Search for a User" onChange={onChange} />
      </div>

      <div className="sub-nav-friends">
        <FriendsList search={search} />
      </div>
      
      <UserToolbar />
    </section>
  );
};


const mapStateToProps = reduxState => reduxState.friendReducer;

export default connect(mapStateToProps, {/* No functions to import */})(SubPrivateNav);