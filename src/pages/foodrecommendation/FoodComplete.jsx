import React, { useRef, useState } from "react";
import S from "./style";
// import {heroImage} from "/assets/images/kimchi_soup.png"; // 실제 이미지로 교체


const FoodComplete = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const toggleItem = (index) => {
    setSelectedItems((prev) =>
      prev.includes(index)
        ? prev.filter((v) => v !== index)
        : [...prev, index]
    );
  };

    // 파일 선택 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 확장자 체크
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("JPG 또는 PNG 파일만 업로드 가능합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <S.FCPage>
        {/* ================= Hero ================= */}
        <S.FCHero>
          <S.FCHeroImage src="/assets/images/kimchi_soup.png" alt="요리 이미지" />
          <S.FCHeroOverlay>
            <S.FCHeroInner>
              <S.FCTitle>얼큰한 김치찌개</S.FCTitle>
              <S.FCSubText>축하합니다! 요리를 완성하셨네요~!</S.FCSubText>
            </S.FCHeroInner>
          </S.FCHeroOverlay>
        </S.FCHero>
      <S.FCWrapper>

        {/* ================= Content ================= */}
        <S.FCContent>
          {/* 영상 사진 업로드 */}
          <S.FCSection>
            <S.FCSectionTitleRow>
              <S.FCSectionIcon src="/assets/icons/add-web.png" />
              <S.FCSectionHeading>완성 사진 업로드</S.FCSectionHeading>
            </S.FCSectionTitleRow>

            <S.FCUploadBox
              onClick={() => fileInputRef.current.click()}
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <>
                  클릭하여 사진을 업로드 하세요.
                  <br />
                  JPG, PNG 파일 가능
                </>
              )}
            </S.FCUploadBox>

            {/* 숨겨진 input */}
            <input
              type="file"
              accept="image/jpeg, image/png"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </S.FCSection>

          {/* 요리 후기 */}
          <S.FCSection>
            <S.FCSectionTitleRow>
              <S.FCSectionIcon src="/assets/icons/comment-one.png" />
              <S.FCSectionHeading>요리후기</S.FCSectionHeading>
            </S.FCSectionTitleRow>

            <S.FCTextarea placeholder="요리를 만들어본 소감을 자유롭게 남겨주세요." />
          </S.FCSection>

          {/* 사용한 재료 체크 */}
         <S.FCSection>
            <S.FCSectionTitleRow>
              <S.FCSectionIcon src="/assets/icons/product.png" />
              <S.FCSectionHeading>사용한 재료 체크</S.FCSectionHeading>
            </S.FCSectionTitleRow>

            <S.FCIngredientBox>
              {Array.from({ length: 16 }).map((_, index) => {
                const isActive = selectedItems.includes(index);

                return (
                  <S.FCIngredientItem
                    key={index}
                    onClick={() => toggleItem(index)}
                  >
                    <S.FCCheckIcon
                      src={
                        isActive
                          ? "/assets/icons/hover_check_circle_broken.svg" // 오렌지 아이콘
                          : "/assets/icons/default_check_circle_broken.svg"   // 회색 아이콘
                      }
                      alt="check"
                    />
                    밥 1공기
                  </S.FCIngredientItem>
                );
              })}

              <S.FCSelectedCount>
                {selectedItems.length}개 재료 선택됨
              </S.FCSelectedCount>
            </S.FCIngredientBox>
          </S.FCSection>

          {/* 획득 XP */}
          <S.FCSection>
            <S.FCSectionTitleRow>
              <S.FCSectionIcon src="/assets/icons/circle-double-up.png" />
              <S.FCSectionHeading>획득 XP</S.FCSectionHeading>
            </S.FCSectionTitleRow>
            <S.FCXPBox>
              <S.FCXPLabel>총 획득 XP</S.FCXPLabel>
              <S.FCProgressBar>
                <S.FCProgressOrange value={20} />
              </S.FCProgressBar>

              <S.FCXPLabel>현재 Lv.12</S.FCXPLabel>
              <S.FCProgressBar>
                <S.FCProgressBlue value={80} />
              </S.FCProgressBar>
            </S.FCXPBox>
          </S.FCSection>

          {/* 커뮤니티 공유 */}
          <S.FCSection>
            <S.FCSectionTitleRow>
              <S.FCSectionIcon src="/assets/icons/community.png" />
              <S.FCSectionHeading>커뮤니티 공유</S.FCSectionHeading>
            </S.FCSectionTitleRow>
            <S.FCShareBox>
              완성된 메뉴는 커뮤니티에 자동으로 업로드 됩니다. 다른 사용자들과
              함께 요리 경험을 공유하세요!
            </S.FCShareBox>
          </S.FCSection>

          {/* 완료 버튼 */}
          <S.FCCompleteButton>완료 인증하기</S.FCCompleteButton>
        </S.FCContent>
      </S.FCWrapper>
    </S.FCPage>
  );
};

export default FoodComplete;
