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

  const {friends} = props;

  // const displayFriends = friends.map((friend, index) => {
  //   const {user_display_name} = friend;
  //   if (user_display_name.includes(search)) {
  //     return <div>{/* THE FRIEND */}</div>
  //   } else {
  //     return;
  //   };
  // });

  return (
    <section className="sub-nav">

      <div className="sub-nav-search">
        <Search placeholder="Search for a friend" onChange={onChange} />
      </div>

      <div className="sub-nav-friends">
        <FriendsList />
      </div>
      
      <UserToolbar />
    </section>
  );
};


const mapStateToProps = reduxState => reduxState.friendReducer;

export default connect(mapStateToProps, {/* No functions to import */})(SubPrivateNav);