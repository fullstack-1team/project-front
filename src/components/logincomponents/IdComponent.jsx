import React from "react";
import * as S from "../../pages/loginandjoin/style";
const IdComponent = () => {
  return (
    <div>
      <S.IdContainer>
        <p>아이디</p>
        <S.LoginInput type="text" placeholder="    아이디: 이메일 형식" />
      </S.IdContainer>
    </div>
  );
};

export default IdComponent;
