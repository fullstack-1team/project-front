import React from "react";
import { AddButton } from "../../pages/myfridge/style";

const AddIngredientModal = ({ onNext }) => {
  return (
    <>
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/fridge.png`}
        alt="냉장고"
        style={{ width: 200, marginBottom: 24 }}
      />

      <AddButton onClick={onNext}>
        냉장고를 채워볼까요?
      </AddButton>
    </>
  );
};

export default AddIngredientModal;
