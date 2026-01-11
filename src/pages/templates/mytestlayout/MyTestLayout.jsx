import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MyTestLayout = () => {
  return (
    <div>
      <header>헤더</header>
      <main>
        <Outlet />
      </main>
      <footer>푸터</footer>
    </div>
  );
};

export default MyTestLayout;