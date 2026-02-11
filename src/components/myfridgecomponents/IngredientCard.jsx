import React from "react";
import { CardStyle, CardTextStyle, HoverInfo, IconStyle } from "../../pages/myfridge/style";

const IngredientCard = ({ name, icon = "🥬", active, onClick, quantity, expiredAt }) => {
  return (
    <CardStyle active={active} onClick={onClick}>
      <IconStyle>{icon}</IconStyle>
      <CardTextStyle>{name}</CardTextStyle>

      <HoverInfo>
        <p>재료명: {name}</p>
        <p>수량: {quantity ?? 0}</p>
        <p>유통기한: {expiredAt || "-"}</p>
      </HoverInfo>
    </CardStyle>
  );
};

export default IngredientCard;
