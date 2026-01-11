import React from 'react';
import { Link } from 'react-router-dom';

const MyTestMainContainer = () => {
  return (
    <div>
      <h1>메인 컨테이너</h1>
      <div>
        <Link to={"/docs"}>documentation</Link>
      </div>
    </div>
  );
};

export default MyTestMainContainer;