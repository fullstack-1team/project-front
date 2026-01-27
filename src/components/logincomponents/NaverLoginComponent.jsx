import React from "react";
import * as S from "../../pages/loginandjoin/style";

const NaverLoginComponent = () => {
  // 팝업 창의 크기와 위치 설정
  const openNaverLogin = () => {
    const width = 450;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    // 네이버 로그인 API 주소
    const NAVER_AUTH_URL = ``;

    window.open(
      NAVER_AUTH_URL,
      "NaverLoginPopup",
      `width=${width},height=${height},left=${left},top=${top},resizable=no`,
    );
  };

  return (
    <div>
      <S.QuickIconImg
        src="\assets\icons\naver_button.png"
        onClick={openNaverLogin}
        alt="네이버 로그인"
      />
    </div>
  );
};

export default NaverLoginComponent;
