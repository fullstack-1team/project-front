import styled from "styled-components";

// 플로팅 액션 섹션
export const FloatingWrapper = styled.div`
  position: fixed;
  right: 32px;
  bottom: 32px;
  z-index: 1000;
`;

export const ScrollButton = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;

  background-color: ${({ theme }) => theme.PALLETE.primary.main};

  color: #fff;

  font-size: 20px;
  font-weight: 700;

  cursor: pointer;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
  }
`;
