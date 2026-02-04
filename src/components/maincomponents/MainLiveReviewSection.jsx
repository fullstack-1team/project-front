import React from "react";
import {
  LiveReviewWrapper,
  LiveReviewInner,
  LiveReviewHeader,

  LiveReviewTitleBox,
  LiveReviewSubTitle,
  LiveReviewTitle,
  LiveReviewMoreButton,

  LiveReviewSwiper,
  LiveReviewCard,
  LiveReviewCardTop,
  LiveReviewMetaLeft,
  LiveReviewAvatar,

  LiveReviewRecipeTitle,
  LiveReviewBadgeRow,
  LiveReviewBadge,

  LiveReviewArrowBtn,
  LiveReviewDivider,
  LiveReviewUserName,
  LiveReviewContent,
  LiveReviewImageRow,
  LiveReviewThumb,
} from "../../pages/main/style";

import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const MainLiveReviewSection = ({
  subtitle = "프리고고러들이 작성한",
  title = "실시간 생생 리뷰",
  onMoreClick,
  onCardClick,
  reviews = [],
}) => {
  return (
    <LiveReviewWrapper>
      <LiveReviewInner>
        <LiveReviewHeader>
          <LiveReviewTitleBox>
            <LiveReviewSubTitle>{subtitle}</LiveReviewSubTitle>
            <LiveReviewTitle>{title}</LiveReviewTitle>
          </LiveReviewTitleBox>

          <LiveReviewMoreButton type="button" onClick={onMoreClick}>
            더 보기 <span aria-hidden="true">›</span>
          </LiveReviewMoreButton>
        </LiveReviewHeader>

        <LiveReviewSwiper
          slidesPerView={4}
          spaceBetween={24}
          loop={reviews.length > 4}           // 4개 초과일 때만 loop
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,               // 3초마다 이동
            disableOnInteraction: false // 드래그 후에도 계속 자동재생
          }}
          allowTouchMove                      // 터치/드래그 허용
          simulateTouch                       // PC에서도 드래그 가능
          grabCursor                          // 마우스 커서 손모양
          touchStartPreventDefault={false}    // 클릭요소 있어도 드래그 되게
          nested={true}                       // 안쪽 컴포넌트 이벤트 충돌 방지
          observer={true}                     // 렌더 후 레이아웃 변해도 감지
          observeParents={true}               // 부모 변화 감지
          onSwiper={(swiper) => console.log("swiper mounted", swiper)}

        >
          {reviews.map((r) => {
            const imgs = Array.isArray(r.images) ? r.images.slice(0, 3) : [];
            const countClass = `count-${Math.min(imgs.length || 0, 3)}`;

            return (
              <SwiperSlide key={r.id}>
                <LiveReviewCard
                  className={imgs.length > 0 ? "has-images" : "no-images"}
                  role="button"
                  tabIndex={0}
                  onClick={() => onCardClick?.(r)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onCardClick?.(r);
                  }}
                >
                  <LiveReviewCardTop>
                    <LiveReviewMetaLeft>
                      <LiveReviewAvatar>
                        <img
                          src={r.avatarUrl || "../../assets/images/main/user_profile01.png"}
                          alt={`${r.userName} 프로필`}
                          onError={(e) => {
                            // onError 한 번만 실행되게 막기
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "../../assets/images/main/user_profile01.png";
                          }}
                        />
                      </LiveReviewAvatar>
                      <div style={{ minWidth: 0 }}>
                        <LiveReviewRecipeTitle title={r.recipeTitle}>
                          {r.recipeTitle}
                        </LiveReviewRecipeTitle>
                      </div>
                    </LiveReviewMetaLeft>

                    <LiveReviewArrowBtn type="button" aria-label="리뷰 상세로 이동">
                      
                    </LiveReviewArrowBtn>
                  </LiveReviewCardTop>

                  <LiveReviewDivider />

                  <LiveReviewMetaLeft>
                    <LiveReviewUserName>{r.userName}</LiveReviewUserName>
                    <LiveReviewBadgeRow>
                      <LiveReviewBadge className="star">
                        <i aria-hidden="true">★</i> Lv.{r.level}
                      </LiveReviewBadge>
                      <LiveReviewBadge className="xp">XP {r.xp}</LiveReviewBadge>
                    </LiveReviewBadgeRow>
                  </LiveReviewMetaLeft>

                  <LiveReviewContent>{r.content}</LiveReviewContent>

                  {imgs.length > 0 && (
                    <LiveReviewImageRow className={countClass}>
                      {imgs.map((src, idx) => (
                        <LiveReviewThumb key={`${r.id}-${idx}`}>
                          <img src={src} alt="" loading="lazy" />
                        </LiveReviewThumb>
                      ))}
                    </LiveReviewImageRow>
                  )}
                </LiveReviewCard>
              </SwiperSlide>
            );
          })}
        </LiveReviewSwiper>


      </LiveReviewInner>
    </LiveReviewWrapper>
  );
};

export default MainLiveReviewSection;
