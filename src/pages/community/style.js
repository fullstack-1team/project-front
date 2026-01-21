import style, { styled } from "styled-components";
import { flexBetweenRow, flexCenter } from "../../styles/common";
import { FONT_STYLE } from "../../styles/common";

export const Page = styled.main`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
`

export const Container = styled.div`
  max-width: 1420px; // 1920 기준 가운데 본문 폭
  margin: 0 auto; 
  padding: 24px 0 80px;

  @media (max-width: 1920px) {
    width: 100%;
    padding: 24px 20px 80px;
  } // 1920보다 화면이 작으면 생기는 가로 스크롤 방지
`

// 커뮤니티 상단 영역
export const HeaderSection = styled.section`
  width: 100%;
  margin-top: 68px;
  padding-bottom: 24px;

  /* 좌우 여백 추가 */
  padding-left: 130px;
  padding-right: 130px;

`
// 타이틀
export const Title = styled.h6`
  ${FONT_STYLE.GIANTS.H6_REGULAR};
  color: #333;
  margin-bottom: 16px;
`
// 검색줄
export const SearchRow = styled.div`
  ${flexBetweenRow};
  gap: 20px;
`
// 검색 인풋
export const SearchInput = styled.input`
  width: 1028px;
  height: 40px;

  padding: 0 16px;

  border-radius: 5px;
  border: none;

  background-color: #fafafa;

  ${FONT_STYLE.PRETENDARD.H8_REGULAR};

  &::placeholder {
    color: #a9a9a9;
  };

  &:focus {
  border-color: #ff4e37;
  };
`
// 필터 버튼
export const FilterButton = styled.button`
  height: 40px;
  width: 106px;

  ${flexCenter}
  gap: 6px;


  border-radius: 5px;
  border: 1px solid #e5e5e5;
  background-color: #ffffff;

   ${FONT_STYLE.PRETENDARD.H8_REGULAR};

   cursor: pointer;

   
`
export const FilterIcon = styled.img`
  width: 23px;
  height: 23px;
`

export const FullDivider = styled.div`
  width: 100%; 
  height: 1px;
  margin: 70px 0 0;
  background-color: #f0f0f0;

  
`