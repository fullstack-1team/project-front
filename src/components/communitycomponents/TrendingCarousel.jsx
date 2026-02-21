import React, { useLayoutEffect, useMemo, useRef, useState, useCallback } from "react";
import * as S from "../../pages/community/style";
import PostCard from "./PostCard";

// 슬라이드 전용
const GAP = 22;
const VISIBLE = 4;

const TrendingCarousel = ({ onCardClick, meNickname }) => {
  // 더미 데이터(형태만) ㅡ 나중에 API로 교체
  const items = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        recipeName: `트렌딩 레시피 ${i + 1}`,

        // ✅ 트렌딩에도 "내 글" 테스트가 필요하면 일부를 내 닉네임으로 박아두기
        nickname: i % 5 === 0 ? meNickname : "파스타러버",
        level: i % 5 === 0 ? 5 : 4,
      })),
    [meNickname]
  );

  const viewportRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardW, setCardW] = useState(0);

  useLayoutEffect(() => {
    const viewportElement = viewportRef.current;
    if (!viewportElement) return;

    const updateCardWidth = () => {
      const viewportWidth = viewportElement.getBoundingClientRect().width;
      const width = (viewportWidth - GAP * (VISIBLE - 1)) / VISIBLE;
      setCardW(width);
    };

    updateCardWidth();

    const resizeObserver = new ResizeObserver(updateCardWidth);
    resizeObserver.observe(viewportElement);

    return () => resizeObserver.disconnect();
  }, []);

  const maxIndex = Math.max(items.length - VISIBLE, 0);
  const step = cardW + GAP;

  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

  // ✅ 카드 클릭 시: 부모가 준 onCardClick 실행
  const handleCardClick = useCallback(
    (item) => {
      onCardClick?.(item);
    },
    [onCardClick]
  );

  return (
    <S.CarouselSection>
      <S.SectionHeader>
        <S.SectionTitle>인기 급상승! 연말 필수 요리 함께 해요</S.SectionTitle>
        <S.SectionDesc>연말 모임 다양한 미식 메뉴 도전해 보세요</S.SectionDesc>
      </S.SectionHeader>

      <S.CaroselBody>
        <S.CarouselNavButton
          type="button"
          aria-label="이전"
          $direction="prev"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        />

        <S.CarouselViewport ref={viewportRef}>
          <S.CarouselTrack style={{ transform: `translateX(-${currentIndex * step}px)` }}>
            {items.map((item) => (
              <PostCard
                key={item.id}
                item={item}
                w={cardW ? `${cardW}px` : "280px"}  // ✅ 계산되면 동적, 아니면 fallback
                meNickname={meNickname}
                onClick={() => handleCardClick(item)}
              />
            ))}
          </S.CarouselTrack>
        </S.CarouselViewport>

        <S.CarouselNavButton
          type="button"
          aria-label="다음"
          $direction="next"
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
        />
      </S.CaroselBody>
    </S.CarouselSection>
  );
};

export default TrendingCarousel;