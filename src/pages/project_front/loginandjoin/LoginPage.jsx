import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
      <h1>로그인 페이지</h1>
      <Link to={"/join"}>회원가입</Link>
    </div>
  );
};

export default LoginPage;