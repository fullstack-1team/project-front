import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const CommunityMain = () => {
  return (
    <div>
      <h1>커뮤니티 메인 페이지</h1>
      <Outlet/> {/*팝업 게시물 자리*/}
      <div>
        <Link to={"/communitymain/post/:postId"}>게시물</Link>
      </div>
    </div>
  );
};

export default CommunityMain;