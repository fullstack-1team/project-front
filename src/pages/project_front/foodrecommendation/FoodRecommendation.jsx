import React from 'react';
import { Link } from 'react-router-dom';

const FoodRecommendation = () => {
  return (
    <div>
      <h1>추천 요리 페이지</h1>
      <p>컴포넌트</p>
      <p>컴포넌트</p>
      <Link to={"/foodrecommendation/recommendRecipe/:foodId"}>레시피 페이지</Link>
    </div>
  );
};

export default FoodRecommendation;