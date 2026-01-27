import React from "react";
import * as S from "../../pages/loginandjoin/style";

const AppleLoginComponent = () => {
  // 팝업 창의 크기와 위치 설정
  const openAppleLogin = () => {
    const width = 450;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    // 애플 로그인 API 주소
    const APPLE_AUTH_URL = ``;

    window.open(
      APPLE_AUTH_URL,
      "AppleLoginPopup",
      `width=${width},height=${height},left=${left},top=${top},resizable=no`,
    );
  };

  return (
    <div>
      <S.QuickIconImg
        src="\assets\icons\apple_button.png"
        onClick={openAppleLogin}
        alt="애플 로그인"
      />
    </div>
  );
};

export default AppleLoginComponent;
