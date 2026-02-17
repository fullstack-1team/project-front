// CommunityMain.jsx (전체 복붙용)
import React, { useState, useCallback } from "react";
import * as S from "./style";

import { CommunityHeader } from "../../components/communitycomponents/CommunityHeader";
import TrendingCarousel from "../../components/communitycomponents/TrendingCarousel";
import FeedGrid from "../../components/communitycomponents/FeedGrid";
import FloatingActions from "../../components/layoutcomponents/FloatingActions";
import CommunityPostModal from "../../components/communitycomponents/CommunityPostModal";

const CommunityMain = () => {
  // ✅ 로그인 유저 닉네임 (임시)
  const meNickname = "요리왕곰순";

  // ✅ 모달 상태
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // ✅ 카드 클릭 → 모달 오픈
  const handleOpenPostModal = useCallback((post) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
  }, []);

  // ✅ 모달 닫기
  const handleClosePostModal = useCallback(() => {
    setIsPostModalOpen(false);
    setSelectedPost(null);
  }, []);

  // ✅ 댓글 등록
  const handleSubmitComment = useCallback(
    (text) => {
      if (!selectedPost) return;

      const newComment = {
        nickname: meNickname,
        time: "방금 전",
        text,
      };

      setSelectedPost((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          comments: [newComment, ...(prev.comments ?? [])],
        };
      });
    },
    [selectedPost, meNickname]
  );

  // ✅ 댓글 수정 (현재 prompt 방식 유지)
  const handleEditComment = useCallback(
    (comment, nextTextFromModal) => {
      if (!selectedPost) return;

      // 모달에서 nextText를 2번째 인자로 넘겨주면 그걸 우선 사용
      const nextText =
        typeof nextTextFromModal === "string"
          ? nextTextFromModal
          : window.prompt("댓글을 수정하세요", comment.text);

      if (nextText === null) return;

      const trimmed = String(nextText).trim();
      if (!trimmed) return;

      setSelectedPost((prev) => {
        if (!prev) return prev;
        const nextComments = (prev.comments ?? []).map((c) =>
          c === comment ? { ...c, text: trimmed, time: "방금 전" } : c
        );
        return { ...prev, comments: nextComments };
      });
    },
    [selectedPost]
  );

  // ✅ 댓글 삭제
  const handleDeleteComment = useCallback(
    (comment) => {
      if (!selectedPost) return;

      const ok = window.confirm("댓글을 삭제할까요?");
      if (!ok) return;

      setSelectedPost((prev) => {
        if (!prev) return prev;
        const nextComments = (prev.comments ?? []).filter((c) => c !== comment);
        return { ...prev, comments: nextComments };
      });
    },
    [selectedPost]
  );

  return (
    <S.Page>
      {/* FloatingActions 스크롤 타겟 */}
      <div id="community-top" />

      {/* ✅ 1) 헤더는 Container 안 */}
      <S.Container>
        <CommunityHeader
          onSearch={({ keyword, sort }) => {
            console.log("커뮤니티 검색", { keyword, sort });
          }}
        />
      </S.Container>

      <S.FullDivider />

      {/* ✅ 2) 트렌딩 + 피드는 Container 안 */}
      <S.Container>
        <TrendingCarousel />
        <S.SectionDivider />

        <FeedGrid onCardClick={handleOpenPostModal} meNickname={meNickname} />
      </S.Container>

      {/* ✅ 3) 모달은 Page 하위에 두되,
          화면 레이아웃은 위에서 이미 Container 기준으로 잡힘 */}
      <CommunityPostModal
        open={isPostModalOpen}
        post={selectedPost}
        onClose={handleClosePostModal}
        onClickDetail={(post) => {
          console.log("자세히 보기 클릭", post);
        }}
        meNickname={meNickname}
        onSubmitComment={handleSubmitComment}
        onEditComment={handleEditComment}
        onDeleteComment={handleDeleteComment}
      />

      <FloatingActions targetId="community-top" />
    </S.Page>
  );
};

export default CommunityMain;
