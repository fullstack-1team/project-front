import React from "react";
import IngredientCard from "./IngredientCard";
import S from "../../pages/myfridge/style";

const IngredientList = ({ items, deleteMode, selectedIds, onToggle }) => {
  return (
    <S.GridWrapperStyle>
      <S.GridStyle>
        {items.map((item) => (
          <IngredientCard
            key={item.fridgeId}
            name={item.name}
            icon={item.icon}
            quantity={item.quantity}
            expiredAt={item.expiredAt}
            active={deleteMode && selectedIds.includes(item.fridgeId)}
            onClick={() => deleteMode && onToggle(item.fridgeId)}
          />
        ))}
      </S.GridStyle>
    </S.GridWrapperStyle>
  );
};

export default IngredientList;