import React, {useState} from 'react';
import {connect} from 'react-redux';

import Search from '../Search/Search';


function SubPrivateNav(props) {
  const [search, setSearch] = useState('');
  const onChange = (e) => {
    const {value} = e.target;
    setSearch(value)
  };

  const {friends} = props;

  const displayFriends = friends.map((friend, index) => {
    const {user_display_name} = friend;
    if (user_display_name.includes(search)) {
      return <div>{/* THE FRIEND */}</div>
    } else {
      return;
    };
  });

  return (
    <section className="sub-nav">{/* see SubChannelNav.scss */}
      <div className="sub-nav-search">
        <Search placeholder="Search for a friend" onChange={onChange} />
      </div>
      {/* based of of the search value display the friends names / group chat names */}
    </section>
  );
};


const mapStateToProps = reduxState => reduxState.friendReducer;

export default connect(mapStateToProps, {/* No functions to import */})(SubPrivateNav);