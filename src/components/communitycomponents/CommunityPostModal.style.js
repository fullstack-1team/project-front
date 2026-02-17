// CommunityPostModal.style.js
import styled from "styled-components";
import { FONT_STYLE } from "../../styles/common";
import { flexBetweenRow } from "../../styles/common";

/* ---------- modal ---------- */

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;

  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 28px;
`;

export const Modal = styled.div`
  width: 100%;
  max-width: 920px;

  background: ${({ theme }) => theme.PALLETE.white};
  border-radius: 20px;
  overflow: hidden;

  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.22);
`;

export const Hero = styled.div`
  position: relative;
  height: 330px;
  overflow: hidden;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const HeroPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${FONT_STYLE.PRETENDARD.H6_REGULAR};
  color: ${({ theme }) => theme.PALLETE.gray[700]};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 7;

  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.9;
  }
`;

export const CloseIcon = styled.img`
  width: 22px;
  height: 22px;
`;

export const NavControls = styled.div`
  position: absolute;
  inset: 0;
  z-index: 6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  pointer-events: auto;
`;

export const NavButtonLeft = styled.button`
  position: absolute;
  left: 22px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 7;

  width: 56px;
  height: 56px;
  border-radius: 999px;

  border: none;
  background: rgba(255, 255, 255, 0.95);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    background: ${({ theme }) => theme.PALLETE.gray[100]};
  }
`;

export const NavIcon = styled.img`
  width: 18px;
  height: 18px;
  display: block;
`;

export const NavButtonRight = styled(NavButtonLeft)`
  left: auto;
  right: 22px;
`;

export const ImageIndex = styled.div`
  position: absolute;
  right: 18px;
  bottom: 14px;
  z-index: 8;

  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);

  ${FONT_STYLE.PRETENDARD.H8_REGULAR};
  color: #fff;
`;

/* ---------- body ---------- */

export const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: 22px;
  padding: 22px 24px 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Left = styled.div`
  min-width: 0;
`;

export const Right = styled.div`
  min-width: 0;
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`;

export const Nickname = styled.div`
  ${FONT_STYLE.PRETENDARD.H6_REGULAR};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.PRETENDARD.SEMIBOLD};
  color: ${({ theme }) => theme.PALLETE.mainblack};
`;

export const MetaRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LevelBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  padding: 6px 10px;
  border-radius: 5px;

  background: ${({ theme }) => theme.PALLETE.primary.sub};
  color: ${({ theme }) => theme.PALLETE.primary.main};

  ${FONT_STYLE.PRETENDARD.H7_REGULAR};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.PRETENDARD.MEDIUM};
`;

export const LevelIcon = styled.img`
  width: 14px;
  height: 14px;
`;

export const LikeBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  ${FONT_STYLE.PRETENDARD.H7_REGULAR};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.PRETENDARD.MEDIUM};
  color: ${({ theme }) => theme.PALLETE.mainblack};
`;

export const HeartIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const DateText = styled.div`
  margin-top: 8px;
  ${FONT_STYLE.PRETENDARD.H8_REGULAR};
  color: ${({ theme }) => theme.PALLETE.gray[600]};
`;

export const Title = styled.h2`
  margin: 18px 0 10px;
  ${FONT_STYLE.PRETENDARD.H6_SEMIBOLD};
  color: ${({ theme }) => theme.PALLETE.mainblack};
`;

export const Desc = styled.p`
  margin: 0 0 10px;
  ${FONT_STYLE.PRETENDARD.H7_REGULAR};
  color: ${({ theme }) => theme.PALLETE.mainblack};
  line-height: 1.55;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const DetailLink = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  margin-bottom: 18px;

  ${FONT_STYLE.PRETENDARD.H7_MEDIUM};
  color: ${({ theme }) => theme.PALLETE.primary.main};

  &:hover {
    text-decoration: underline;
  }
`;

export const SectionTitle = styled.div`
  ${FONT_STYLE.PRETENDARD.H7_REGULAR};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.PRETENDARD.SEMIBOLD};
  color: ${({ theme }) => theme.PALLETE.mainblack};
  margin-bottom: 10px;
`;

export const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
`;

export const Chip = styled.span`
  ${FONT_STYLE.PRETENDARD.H8_REGULAR};
  color: ${({ theme }) => theme.PALLETE.gray[800]};

  background: ${({ theme }) => theme.PALLETE.gray[100]};
  border-radius: 5px;
  padding: 4px 8px;
`;

export const XpBox = styled.div`
  margin-top: 8px;
  padding: 12px 14px;
  border-radius: 8px;

  background: ${({ theme }) => theme.PALLETE.primary.sub};

  ${FONT_STYLE.PRETENDARD.H8_REGULAR};
  color: ${({ theme }) => theme.PALLETE.primary.mainblack};

  b {
    color: ${({ theme }) => theme.PALLETE.primary.main};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.PRETENDARD.SEMIBOLD};
  }
`;

/* ---------- comments (✅ 2번 구조) ---------- */

export const CommentCard = styled.div`
  border: 1px solid ${({ theme }) => theme.PALLETE.gray[300]};
  border-radius: 10px;
  background: ${({ theme }) => theme.PALLETE.white};
  padding: 10px 12px;
`;

export const CommentHeader = styled.div`
  ${FONT_STYLE.PRETENDARD.H7_REGULAR};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.PRETENDARD.SEMIBOLD};
  color: ${({ theme }) => theme.PALLETE.mainblack};
  margin-bottom: -5px;
  ${flexBetweenRow}
`;

export const CommentHeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const CommentHeaderMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;

  padding: 8px;
  border: 1px solid ${({ theme }) => theme.PALLETE.gray[200]};
  border-radius: 10px;
  background: ${({ theme }) => theme.PALLETE.white};
`;

export const CommentHeaderMenuItem = styled.button`
  border: none;
  background: ${({ theme }) => theme.PALLETE.gray[50]};
  cursor: pointer;

  padding: 10px 12px;
  border-radius: 8px;
  text-align: left;

  ${FONT_STYLE.PRETENDARD.H8_REGULAR};
  color: ${({ theme }) => theme.PALLETE.mainblack};

  &:hover {
    background: ${({ theme }) => theme.PALLETE.gray[100]};
  }
`;



export const SectionDivider = styled.div`
  border-top: 1px solid ${({ theme }) => theme.PALLETE.gray[200]};
  margin: 8px -12px; /* 좌우 padding 무시하고 꽉 */
`;

export const CommentScrollArea = styled.div`
  height: 170px;
  overflow: auto;

  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 6px; /* 스크롤바 숨통 */
`;

export const EmptyComment = styled.div`
  ${FONT_STYLE.PRETENDARD.H8_REGULAR};
  color: ${({ theme }) => theme.PALLETE.gray[600]};
  padding: 8px 2px;
`;

export const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CommentTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const CommentTextWrap = styled.div`
  padding: 6px 0 2px;

  border-bottom: ${({ theme, $editing }) =>
    $editing ? `1px solid ${theme.PALLETE.primary.main}` : "1px solid transparent"};
`;

export const EditTextarea = styled.textarea`
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  background: transparent;

  ${FONT_STYLE.PRETENDARD.H8_REGULAR};
  color: ${({ theme }) => theme.PALLETE.mainblack};
  line-height: 1.5;

  padding: 0;
  margin: 0;
`;

export const EditActionRow = styled.div`
  margin-top: 6px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const EditActionButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;

  ${FONT_STYLE.PRETENDARD.H8_REGULAR};

  color: ${({ theme, $primary }) =>
    $primary ? theme.PALLETE.primary.main : theme.PALLETE.gray[700]};

  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;


export const CommentLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

export const CommentNickname = styled.div`
  ${FONT_STYLE.PRETENDARD.H8_REGULAR};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.PRETENDARD.SEMIBOLD};
  color: ${({ theme }) => theme.PALLETE.mainblack};
`;

export const CommentMeta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`

export const CommentTime = styled.div`
  ${FONT_STYLE.PRETENDARD.H8_REGULAR};
  color: ${({ theme }) => theme.PALLETE.gray[600]};
`;

export const MineTag = styled.span`
  ${FONT_STYLE.PRETENDARD.H8_REGULAR};
  color: ${({ theme }) => theme.PALLETE.gray[700]};
  position: relative;
  padding-left: 10px;

  &::before {
    content: "·";
    position: absolute;
    left: 2px;
    top: 0;
    color: ${({ theme }) => theme.PALLETE.gray[500]};
  }
`;

export const CommentText = styled.div`
  ${FONT_STYLE.PRETENDARD.H8_REGULAR};
  color: ${({ theme }) => theme.PALLETE.gray[900]};
  line-height: 1.5;
`;

export const CommentMenuWrap = styled.div`
  margin-left: auto;
  position: relative;
`;

/* ✅ 점3개 버튼 */
export const KebabButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;

  &:hover {
    background: ${({ theme }) => theme.PALLETE.gray[100]};
  }
`;

/* ✅ 점3개(아이콘 대신 CSS로 만들기) */
export const KebabDots = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${({ theme }) => theme.PALLETE.gray[500]};
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${({ theme }) => theme.PALLETE.gray[500]};
  }

  &::before {
    top: -7px;
  }
  &::after {
    top: 7px;
  }
`;

export const MenuOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99999;
`;

export const MenuBox = styled.div`
  position: absolute;
  right: 0;
  ${({ $direction }) => ($direction === "up" ? "bottom: 34px;" : "top: 34px;")}
  z-index: 999;

  width: 110px;
  background: ${({ theme }) => theme.PALLETE.white};
  border: 1px solid ${({ theme }) => theme.PALLETE.gray[200]};
  border-radius: 10px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);

  padding: 6px;

  display: flex;              /* ✅ 세로 */
  flex-direction: column;     /* ✅ 세로 */
`;


/* ✅ 메뉴 아이템 */
export const MenuItem = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 8px;

  padding: 10px 10px;
  border-radius: 8px;

  ${FONT_STYLE.PRETENDARD.H8_REGULAR};

  color: ${({ theme, $danger, $primary }) => {
    if ($danger) return theme.PALLETE.primary.mainblack;
    if ($primary) return theme.PALLETE.primary.mainblack; /* ✅ 수정은 primary */
    return theme.PALLETE.mainblack;
  }};

  &:hover {
    background: ${({ theme }) => theme.PALLETE.gray[100]};
  }
`;

/* 아이콘도 같이 색 바꾸려면: svg를 img로 쓰면 색 변경이 안 돼서
   1) svg를 "inline svg 컴포넌트"로 바꾸거나
   2) 지금처럼 img면 그냥 primary 컬러 아이콘 파일을 따로 쓰는 게 제일 빠름.
*/

export const MenuIcon = styled.img`
  width: 16px;
  height: 16px;
  display: block;
`;
export const CommentComposer = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 44px;
  gap: 10px;
  align-items: center;
`;

export const Textarea = styled.textarea`
  height: 56px;
  resize: none;

  border: 1px solid ${({ theme }) => theme.PALLETE.gray[300]};
  border-radius: 5px;
  padding: 12px;

  ${FONT_STYLE.PRETENDARD.H8_REGULAR};
  color: ${({ theme }) => theme.PALLETE.mainblack};

  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.PALLETE.gray[500]};
  }

  &:focus {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

export const SendButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 5px;

  border: none;
  cursor: pointer;

  background: ${({ theme }) => theme.PALLETE.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};

  &:hover {
    background: ${({ theme }) => theme.PALLETE.primary.dark ?? "#e8432e"};
  }
`;

export const SendIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const CounterRow = styled.div`
  margin-top: 6px;
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const CounterText = styled.div`
  ${FONT_STYLE.PRETENDARD.H8_REGULAR};
  color: ${({ theme }) => theme.PALLETE.gray[900]};
`;

/* ✅ 취소/저장 버튼 영역 */
export const ActionRow = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const ActionButton = styled.button`
  height: 40px;
  min-width: 108px;
  padding: 0 16px;
  border-radius: 8px;
  cursor: pointer;

  ${FONT_STYLE.PRETENDARD.H8_REGULAR};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.PRETENDARD.SEMIBOLD};

  border: ${({ theme, $variant }) =>
    $variant === "primary"
      ? "none"
      : `1px solid ${theme.PALLETE.primary.main}`};

  background: ${({ theme, $variant }) =>
    $variant === "primary" ? theme.PALLETE.primary.main : "transparent"};

  color: ${({ theme, $variant }) =>
    $variant === "primary" ? theme.PALLETE.white : theme.PALLETE.primary.main};

  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
`;
