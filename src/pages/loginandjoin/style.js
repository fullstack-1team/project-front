import styled from "styled-components";
import { flexCenter, flexCenterColumn, FONT_STYLE } from "../../styles/common";
import theme from "../../styles/theme";

export const LoginScreen = styled.div`
  width : 100%;
  height: 100%;
  ${flexCenter}
`

export const LoginContainer = styled.div`
  width:360px;
  height: 600px;
`

export const LoginH1 = styled.div`
  ${FONT_STYLE.GIANTS.H3_BOLD};
  ${flexCenter};
  color : ${theme.PALLETE.hederandfooter}
`

export const IdContainer = styled.div`
  ${FONT_STYLE.PRETENDARD.H7_REGULAR};
  margin : 15px;
`
export const PasswordContainer = styled.div`
  ${FONT_STYLE.PRETENDARD.H7_REGULAR};
  margin : 15px;
`

export const LoginInput = styled.input`
  width : 100%;
  height :50px;
  border-radius : 5px;
  border : 1px solid ${theme.PALLETE.gray.footerMenu};
`

export const KeepLoginContainer = styled.label`
  display:flex ;
  margin: 0px 15px 20px 15px;
  gap: 5px;
  align-items: center;
  
`

export const KeepLoginCheck = styled.input.attrs({ type: 'checkbox' })`
  /* 1. 기본 스타일 제거 */
  appearance: none;
  -webkit-appearance: none; /* 사파리 지원 */

  /* 2. 원하는 크기와 배경색 설정 */
  width: 18px;
  height: 18px;
  border: 1px solid ${theme.PALLETE.gray.footerMenu};
  margin: 0px;
  
  /* 3. 라디우스 적용 */
  border-radius: 20%;
  
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    filter: brightness(1.1);
  } 

  /* 4. 체크되었을 때의 스타일 */
  &:checked + span {
    color: ${theme.PALLETE.primary.main};
    border-color:${theme.PALLETE.primary.main};
    font-weight: bold;
  }

  &:checked {
  background-color: ${theme.PALLETE.primary.main};
  border-color:${theme.PALLETE.primary.main};
  }

  /* 5. 체크 표시 (선택사항: 가상 요소로 구현) */
  &:checked::after {
    content: '✔';
    color: white;
    font-size: 16px;
  }
`;

export const LabelText = styled.span`
  color: ${theme.PALLETE.gray.footerMenu}; /* 체크 안 됐을 때 기본 색상 */
  cursor: pointer;
`

export const ButtonContainer = styled.div`
width: 100%;
${flexCenter}
`

export const LoginButton = styled.button`
width: calc(100% - 30px);
height: 60px;
border-radius:8px;
${FONT_STYLE.PRETENDARD.H6_SEMIBOLD}
border: 1px solid ${theme.PALLETE.primary.main};


cursor: pointer;
/* 기본 상태: 배경 흰색, 글씨 파란색 */
  background-color: white;
  color: ${theme.PALLETE.mainblack};

  /* 마우스를 올렸을 때: 배경 파란색, 글씨 흰색 (반전) */
  &:hover {
    background-color: ${theme.PALLETE.primary.sub};
    color: ${theme.PALLETE.mainblack};
  }

  /* 클릭하는 순간: 더 진한 파란색 */
  &:active {
    background-color: ${theme.PALLETE.primary.main};
    border-color: ${theme.PALLETE.primary.main};
    color: white;
  }

`
