import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, FullDivider, Page } from './style';
import { CommunityHeader } from './components/CommunityHeader';
import TrendingCarousel from './components/TrendingCarousel';
import FeedGrid from './components/FeedGrid';

const CommunityMain = () => {
  return (
    <Page>
      <Outlet/> {/*팝업 게시물 자리*/}

      <Container>
        <CommunityHeader/>
      </Container>

      <FullDivider />

      <Container>
        <TrendingCarousel/>
        <FeedGrid/>
        {/* <Link to={"post/:postId"}>게시물</Link> */}
      </Container>
    </Page>
  );
};

export default CommunityMain;