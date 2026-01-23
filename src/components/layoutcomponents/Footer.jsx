import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  const FooterContainer = styled.div`
  width: 1920px;
  height: 216px;
  display: flex;
  justify-content: center;
  align-items: center;
  `

  return (
    <FooterContainer>
      이것은 푸터바입니다.
    </FooterContainer>
  );
};

export default Footer;