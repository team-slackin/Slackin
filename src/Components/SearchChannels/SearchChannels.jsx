import React, { useEffect, useState } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { grabChannelsWithQuery } from "./../../Ducks/channelReducer";
import { login } from "./../../Ducks/userReducer";

function SearchChannels(props) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = e => {
    e.preventDefault();
    const { value } = e.target;
    setSearchInput(value);
  };

  const submitSearchInput = e => {
    e.preventDefault();
    props.grabChannelsWithQuery(searchInput, props.userReducer.user.user_id);
    setSearchInput("");
  };

  return (
    <div>
      <form
        onSubmit={e => {
          submitSearchInput(e);
        }}
      >
        <input
          value={searchInput}
          name="searchInput"
          onChange={e => {
            handleSearchInput(e);
          }}
        />
      </form>
    </div>
  );
}

const mapStateToProps = reduxState => ({
  channelReducer: reduxState.channelReducer,
  userReducer: reduxState.userReducer
})

export default connect(
  mapStateToProps,
  { grabChannelsWithQuery, login }
)(SearchChannels);
