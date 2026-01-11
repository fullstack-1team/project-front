import React from 'react';
import { Link } from 'react-router-dom';

const MyFridge = () => {
  return (
    <div>
      <h1>나의 냉장고</h1>
      <Link to={"/foodrecommendation"}>추천 요리 보기</Link>
      <p>컴포넌트</p>
      <p>컴포넌트</p>
      <p>컴포넌트</p>
    </div>
  );
};

export default MyFridge;