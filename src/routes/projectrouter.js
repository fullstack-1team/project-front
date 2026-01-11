import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/project_front/layout/Layout";
import MainContainer from "../pages/project_front/main/MainContainer";
import FoodRecommendation from "../pages/project_front/foodrecommendation/FoodRecommendation";
import RecommendRecipe from "../pages/project_front/foodrecommendation/RecommendRecipe";
import FoodComplete from "../pages/project_front/foodrecommendation/FoodComplete";
import PostPopUp from "../pages/project_front/community/PostPopUp";
import CommunityMain from "../pages/project_front/community/CommunityMain";
import LevelAndBadge from "../pages/project_front/levelandbadge/LevelAndBadge";
import NotFound from "../pages/project_front/notfound/NotFound";
import ReportAndChallenge from "../pages/project_front/reportandchallenge/ReportAndChallenge";
import MyFridge from "../pages/project_front/myfridge/MyFridge";
import LoginPage from "../pages/project_front/loginandjoin/LoginPage";
import JoinPage from "../pages/project_front/loginandjoin/JoinPage";

const projectrouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MainContainer />,
      },
      {
        path: "/myfridge",
        element: <MyFridge />,
      },
      {
        path: "/foodrecommendation",
        children: [
          {
            index: true,
            element: <FoodRecommendation />,
          },
          {
            path: "/foodrecommendation/recommendRecipe/:foodId", // :foodId는 동적 파라미터 (예: /recipe/3)
            element: <RecommendRecipe />,
          },
          {
            path: "/foodrecommendation/foodcomplete",
            element: <FoodComplete />,
          },
        ],
      },
      {
        path: "/communitymain",
        element: <CommunityMain />,
        children: [
          {
            path: "/communitymain/post/:postId", // 게시물 클릭 시 이동할 주소
            element: <PostPopUp />,
          },
        ],
      },
      {
        path: "/levelandbadge",
        element: <LevelAndBadge />,
      },
      {
        path: "/reportandchallenge",
        element: <ReportAndChallenge />,
        children: [
          {
            path: "/reportandchallenge/post/:postId",
            element: <PostPopUp />,
          },
        ],
      },
      { path: "/login", element: <LoginPage /> },
      { path: "/join", element: <JoinPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default projectrouter;
