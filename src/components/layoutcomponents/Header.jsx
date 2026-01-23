import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  const HeaderContainer = styled.div`
  width: 1920px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  `


  return (
    <HeaderContainer>
        <div><Link to={"/"}>헤더로고</Link></div> |
        <div>
          <Link to={"/myfridge"}>나의 냉장고</Link> |
          <Link to={"/foodrecommendation"}>추천 요리</Link> |
          <Link to={"/communitymain"}>커뮤니티</Link> |
          <Link to={"/levelandbadge"}>레벨&뱃지</Link> |
          <Link to={"/reportandchallenge"}>리포트&챌린지</Link> |
          <Link to={"/login"}>로그인</Link> |
        </div>
        <button>프로필 팝업</button>
    </HeaderContainer>
  );
};

export default Header;