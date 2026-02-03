import styled from "styled-components";
import { flexCenter, FONT_STYLE } from "../../../styles/common";

export const Wrap = styled.nav`
  width: 100%;
  ${flexCenter};
  gap: 18px;
  padding: 100px 0 70px;
`;

export const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  opacity: ${({ disabled }) => (disabled ? 0.35 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.PALLETE.primary.main};
    outline-offset: 3px;
    border-radius: 10px;
  }
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

export const Pages = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const PageButton = styled.button`
  ${FONT_STYLE.PRETENDARD.H7_REGULAR};
  border: none;
  background: transparent;
  cursor: pointer;

  color: ${({ theme, $active }) =>
    $active ? theme.PALLETE.primary.main : theme.PALLETE.gray[500]};

  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translateX(-50%);
    width: ${({ $active }) => ($active ? "10px" : "0px")};
    height: 2px;
    background: ${({ theme }) => theme.PALLETE.primary.main};
    transition: width 0.15s ease;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.PALLETE.primary.main};
    outline-offset: 3px;
    border-radius: 10px;
  }
`;
