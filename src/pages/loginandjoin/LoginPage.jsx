import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonContainer, IdContainer, KeepLoginCheck, KeepLoginContainer, LabelText, LoginButton, LoginContainer, LoginH1, LoginInput, LoginScreen, PasswordContainer } from './style';

const LoginPage = () => {
{/* <Link to={"/join"}>회원가입</Link> */}

  return (
    <LoginScreen>
      <LoginContainer>
        <LoginH1>로그인</LoginH1>

        <IdContainer>
          <p>아이디</p>
          <LoginInput type="text" placeholder='    아이디: 이메일 형식'/>
        </IdContainer>

        <PasswordContainer>
          <p>비밀번호</p>
          <LoginInput type="text" placeholder='    비밀번호'/>
        </PasswordContainer>

        <KeepLoginContainer>
          <KeepLoginCheck type="checkbox" name="로그인 상태 유지" id="" />
          <LabelText>로그인 상태 유지</LabelText>
        </KeepLoginContainer>

        <ButtonContainer>
          <LoginButton>로그인</LoginButton>
        </ButtonContainer>

      </LoginContainer>
    </LoginScreen>
  );
};

export default LoginPage;