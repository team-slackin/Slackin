import React from 'react';
import {Input} from '@material-ui/core/';

function Search(props) {
  const {placeholder, name, type='text', onChange} = props;
  return (
    <>{/* The Search bar */}
      <Input placeholder={placeholder} name={name} type={type} onChange={onChange} color="white" />
    </>
  );
};

export default Search;
