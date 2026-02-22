import React from "react";
import S from "../../pages/myfridge/style";

const IngredientCard = ({ name, icon = "🥬", active, onClick, quantity, expiredAt }) => {
  return (
    <S.CardStyle active={active} onClick={onClick}>
      <S.IconStyle>{icon}</S.IconStyle>
      <S.CardTextStyle>{name}</S.CardTextStyle>

      <S.HoverInfo>
        <p>재료명: {name}</p>
        <p>수량: {quantity ?? 0}</p>
        <p>유통기한: {expiredAt || "-"}</p>
      </S.HoverInfo>
    </S.CardStyle>
  );
};

export default IngredientCard;