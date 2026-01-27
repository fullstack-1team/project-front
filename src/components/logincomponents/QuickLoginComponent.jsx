import React from "react";
import * as S from '../../pages/loginandjoin/style';
import KakaoLoginComponent from "./KakaoLoginComponent";
import NaverLoginComponent from "./NaverLoginComponent";
import AppleLoginComponent from "./AppleLoginComponent";

const QuickLoginComponent = () => {



  return (
    <S.QuickContainer>
      <S.StyledLoginFieldset>
        <S.LoginLegend align="center">&nbsp;간편 로그인&nbsp;</S.LoginLegend>
        <S.QuickIconBox>
          <KakaoLoginComponent/>
          <NaverLoginComponent/>
          <AppleLoginComponent/>
        </S.QuickIconBox>
      </S.StyledLoginFieldset>
    </S.QuickContainer>
  );
};

export default QuickLoginComponent;
