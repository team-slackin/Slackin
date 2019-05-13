import React from 'react';
import {Link} from 'react-router-dom';

function PrivateMessagesConstructor(props) {
  return (
    <Link>{/* The links with the friends img to show your conversations with said friend */}
      <h1>Private Message Constructor</h1>
    </Link>
  );
};

export default PrivateMessagesConstructor;