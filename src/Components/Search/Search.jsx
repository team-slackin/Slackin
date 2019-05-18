import React from 'react';
import {Input} from '@material-ui/core/';

import './Search.scss';

function Search(props) {
  const {placeholder, name, type='text', onChange} = props;
  return (
    <div className="sub-nav-search-bar" >{/* The Search bar */}
      <Input placeholder={placeholder} name={name} type={type} onChange={onChange} />
    </div>
  );
};

export default Search;
