import React from "react";
import S from "../../pages/myfridge/style";

const AddIngredientModal = ({ onNext }) => {
  return (
    <>
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/fridge.png`}
        alt="냉장고"
        style={{ width: 200, marginBottom: 24 }}
      />

      <S.AddButton onClick={onNext}>
        냉장고를 채워볼까요?
      </S.AddButton>
    </>
  );
};

export default AddIngredientModal;