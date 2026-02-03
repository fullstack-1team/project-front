import styled from "styled-components";
import { flexCenter, flexCenterColumn, FONT_STYLE } from "../../styles/common";
import theme from "../../styles/theme";
import { Link } from "react-router-dom";

export const LevelAndBadgeScreen = styled.div`
  width: 1920px;
  ${flexCenterColumn};
`;

export const BannerWraper = styled.div`
  width: 1920px;
  position: relative;
  height: 578px;
`;

export const BaseImage = styled.img`
  position: relative;
  width: 100%;
  display: block;
`;

export const OverlayImg = styled.img`
  position: absolute;
  object-fit: cover;
  top: ${(props) => props.top || "0"}px;
  left: ${(props) => props.left || "0"}px;
  z-index: ${(props) => props.zIndex || "1"};
`;

export const TochallengeWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 750px;
  height: 520px;
  zindex: 3;

  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(0.5px);
  box-shadow: 0 0 0 10px rgb(0, 0, 0) inset 15px 5px 50px 0 rgb(0, 0, 0);
  border-radius: 110px;

  ${flexCenterColumn}
  gap:20px;
`;

export const BannerH1 = styled.h1`
  ${FONT_STYLE.GIANTS.H1_REGULAR};
  color: ${theme.PALLETE.hederandfooter};
`;
export const BannerP = styled.p`
  ${FONT_STYLE.PRETENDARD.H5_MEDIUM};
`;

export const ToChallengeLink = styled(Link)`
  border: 1px solid #3385ff;
  width: 270px;
  height: 65px;
  background-color: white;
  border-radius: 5px;
  ${FONT_STYLE.PRETENDARD.H6_MEDIUM};
  color: ${theme.PALLETE.mainblack};
  ${flexCenter};
`;

// ---------------------------------------------------

export const MyLevelWrap = styled.div`
  width: 100%;
  height: 600px;
  ${flexCenter}
`;

export const MyLevelField = styled.fieldset`
  width: 1420px;
  height: 350px;
`;

export const MyLevelLegend = styled.legend`
  ${FONT_STYLE.GIANTS.H5_REGULAR};
  color: ${theme.PALLETE.headerandfooter};
`;

export const MyLevelProgressWrap = styled.div`
  width: 100%;
  height: 300px;
  margin: 1rem 0;
  border: 1px solid ${theme.PALLETE.gray[50]};
  background-color: ${theme.PALLETE.gray[50]};
  border-radius: ${theme.RADIUS.md};
  display: flex;
`;

export const MyLevelProgressContainer = styled.div`
  width: 820px;
  height: 20px;
  background-color: ${theme.PALLETE.gray[300]};
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  margin: 15px 0 15px 0 ;
`;

export const MyLevelProgress = styled.div`
  height: 100%;
  background: #009BFF;
  width: ${(props) => props.width}%;
  transition: width 0.4s ease-out; /* 나중에 데이터 바뀔 때 슥 차오름 */
`;

export const ExpText = styled.div`
  ${FONT_STYLE.PRETENDARD.H7_BOLD};
  color: ${theme.PALLETE.headerandfooter};
  width : calc(100%-600px);
  text-align: right;
`;

export const MyLevelProfileWrap = styled.div`
position:relative;
width: 300px;
height: 100%;
${flexCenter};
`

export const MyLevelProfileContainer = styled.img`
position:absolute;
width: 165px;
z-index:2;
`

export const MyLevelProfileImg = styled.img`
position:absolute;
border-radius:9999px;
width: 145px;
z-index:1;
top: 88px;
`



export const LevelLabel = styled.div`
  ${FONT_STYLE.PRETENDARD.H5_BOLD};
  color: ${theme.PALLETE.headerandfooter};
`

export const LevelCurrent = styled.div`
width:130px;
height: 40px;
border: 1px solid ${theme.PALLETE.primary.main};
border-radius: 20px;
color: ${theme.PALLETE.mainblack};
${FONT_STYLE.PRETENDARD.H6_BOLD};
${flexCenter};
`

export const LevelInfoWrap = styled.div`
width: calc(100%-600px);
display: flex;
align-items:center;
gap: 15px;
`

export const LevelProgressContainer = styled.div`
display: flex;
flex-direction:column;
justify-content:center;
`

export const LevelNextMedal = styled.img`
width:145px;
`

export const NextMedalInfo = styled.div`
${FONT_STYLE.PRETENDARD.H6_MEDIUM};
color: ${theme.PALLETE.gray[900]};
`

export const MedalWrap = styled.div`
position:relative;
width: 300px;
height: 100%;
${flexCenterColumn};
`