import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ChallengeList from './components/ChallengeList';
import ChallengeCompleteModal from './components/ChallengeCompleteModal';

const ReportAndChallenge = () => {
  return (
    <div>
      <h1>리포트&챌린지 페이지</h1>
      <Outlet/> {/* 게시물 팝업 자리 */}
      <Link to={"/reportandchallenge/post/:postId"}>게시물 팝업</Link>
      <ChallengeList/>
      <ChallengeCompleteModal/>
      <p>컴포넌트</p>
      <p>컴포넌트</p>
      <p>컴포넌트</p>
      <p>컴포넌트</p>
      <p>컴포넌트</p>
    </div>
  );
};

export default ReportAndChallenge;