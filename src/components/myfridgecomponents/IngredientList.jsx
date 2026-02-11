import React from "react";
import IngredientCard from "./IngredientCard";
import { GridStyle, GridWrapperStyle } from "../../pages/myfridge/style";

const IngredientList = ({ items, deleteMode, selectedIds, onToggle }) => {
  return (
    <GridWrapperStyle>
      <GridStyle>
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
      </GridStyle>
    </GridWrapperStyle>
  );
};

export default IngredientList;
