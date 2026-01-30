import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, FullDivider, Page, SectionDivider } from './style';
import { CommunityHeader } from '../../components/communitycomponents/CommunityHeader';
import TrendingCarousel from '../../components/communitycomponents/TrendingCarousel';
import FeedGrid from '../../components/communitycomponents/FeedGrid';
import FloatingActions from "../../components/layoutcomponents/FloatingActions";


const CommunityMain = () => {
  return (
    <Page>
        <div id="community-top"/>
      <Outlet/> {/*팝업 게시물 자리*/}

      <Container>
        <CommunityHeader/>
      </Container>

      <FullDivider />  

      <Container>
        <TrendingCarousel/>
        <SectionDivider />


        <FeedGrid/>
        {/* <Link to={"post/:postId"}>게시물</Link> */}
      </Container>

      <FloatingActions targetId="community-top" />
    </Page>
  );
};

export default CommunityMain;