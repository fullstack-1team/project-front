import React from 'react';
import { Link } from 'react-router-dom';

const RecommendRecipe = () => {
  return (
    <div>
      <h1>상세 레시피 페이지</h1>
      <Link to={"/foodrecommendation"}>추천 요리로 복귀</Link> | 
      <Link to={"/foodrecommendation/foodcomplete"}>요리 완성 페이지</Link>
    </div>
  );
};

export default RecommendRecipe;