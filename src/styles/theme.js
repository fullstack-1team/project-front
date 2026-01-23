// UI / UX 가이드에 따른 스타일 정의 
const theme = {
  // 1. 컬러 팔레트: 그레이스케일 순서 및 용도 정리
  PALLETE: {
    primary: {
      main: "#ff4e37",
      sub: "#fff2e8",
    },
    secondary: "#018264",
    white: "#ffffff",
    gray: {
      100: "#f2f2f2",
      200: "#e6e6e6",
      300: "#d9d9d9",
      400: "#cccccc",
      500: "#c0c0c0",
      600: "#b3b3b3",
      700: "#a6a6a6",
      800: "#999999",
      900: "#8d8d8d",
      footerMenu: "#c4c4c4", 
      footerSub: "#666666",  
    },
    error: "#ff0000",
    background: {
      white: "#ffffff",
      gray: "#f2f2f2"
    },
    mainblack: "#000000",
    hederandfooter : "#262626"
  },

  // 2. 폰트 사이즈: h1부터 h8까지 정의
  FONT_SIZE: {
    h1: "48px",
    h2: "36px",
    h3: "32px",
    h4: "28px",
    h5: "24px",
    h6: "20px",
    h7: "16px",
    h8: "12px",
  },

  // 3. 폰트 굵기
  FONT_WEIGHT: {
    PRETENDARD: {
      THIN: "100",
      EXTRALIGHT: "200",
      LIGHT: "300",
      REGULAR: "400",
      MEDIUM: "500",
      SEMIBOLD: "600",
      BOLD: "700",
      EXTRABOLD: "800",
      BLACK: "900",
    },
    GIANTS: {
      REGULAR: "400",
      BOLD: "700",
    },
  },

  // 4. 행간(Line-Height): 글자 크기의 약 1.5배로 가독성 확보 및 h8 추가
  FONT_LINE: {
    h1: "72px",
    h2: "54px",
    h3: "48px",
    h4: "42px",
    h5: "36px",
    h6: "30px",
    h7: "24px",
    h8: "18px",
  }
};

export default theme;