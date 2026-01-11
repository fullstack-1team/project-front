import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>
        <h1><Link to={"/"}>헤더로고</Link></h1>
        <Link to={"/myfridge"}>나의 냉장고</Link> | 
        <Link to={"/foodrecommendation"}>추천 요리</Link> |
        <Link to={"/communitymain"}>커뮤니티</Link> |
        <Link to={"/levelandbadge"}>레벨&뱃지</Link> |
        <Link to={"/reportandchallenge"}>리포트&챌린지</Link> |
        <Link to={"/login"}>로그인</Link> |
        <button>프로필 팝업</button>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>푸터</footer>
    </div>
  );
};

export default Layout;
