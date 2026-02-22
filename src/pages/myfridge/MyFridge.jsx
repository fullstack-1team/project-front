import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AddIngredientModal from "../../components/myfridgecomponents/AddIngredientModal";
import IngredientList from "../../components/myfridgecomponents/IngredientList";
import AddIngredientDetailModal from "../../components/myfridgecomponents/AddIngredientDetailModal";
import S from "./style";

/**
 * 재료 원본 데이터(단일 소스)
 */
const BASE_INGREDIENTS = [
  { id: 1, name: "돼지고기", category: "육류", icon: "🥩" },
  { id: 2, name: "소고기", category: "육류", icon: "🥩" },
  { id: 3, name: "항정살", category: "육류", icon: "🥩" },

  { id: 11, name: "당근", category: "채소", icon: "🥕" },
  { id: 12, name: "양파", category: "채소", icon: "🧅" },
  { id: 13, name: "상추", category: "채소", icon: "🥬" },

  { id: 21, name: "연어", category: "해산물", icon: "🐟" },
  { id: 22, name: "새우", category: "해산물", icon: "🦐" },

  { id: 31, name: "우유", category: "유제품", icon: "🥛" },
  { id: 32, name: "치즈", category: "유제품", icon: "🧀" },

  { id: 41, name: "햄", category: "가공품", icon: "🥓" },
  { id: 42, name: "참치캔", category: "가공품", icon: "🥫" },

  { id: 51, name: "계란", category: "기타", icon: "🥚" },
];

const CATEGORIES = ["전체", "채소", "육류", "해산물", "유제품", "가공품", "기타"];

const MyFridge = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [activeCategory, setActiveCategory] = useState("전체");
  const [sortType, setSortType] = useState("default");

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelected = (fridgeId) => {
    setSelectedIds((prev) =>
      prev.includes(fridgeId)
        ? prev.filter((v) => v !== fridgeId)
        : [...prev, fridgeId]
    );
  };

  const handleAddIngredients = (newItems) => {
    const now = new Date();

    const completed = newItems
      .map((x) => {
        const base = BASE_INGREDIENTS.find((b) => b.id === x.baseId);
        if (!base) return null;

        return {
          fridgeId: Date.now() + Math.random(),
          baseId: base.id,
          name: base.name,
          category: base.category,
          icon: base.icon,
          quantity: x.quantity === "" ? 0 : Number(x.quantity),
          expiredAt: x.expiredAt || "",
          createdAt: now.toISOString(),
        };
      })
      .filter(Boolean);

    setIngredients((prev) => [...prev, ...completed]);
  };

  const filteredIngredients = useMemo(() => {
    if (activeCategory === "전체") return ingredients;
    return ingredients.filter((item) => item.category === activeCategory);
  }, [ingredients, activeCategory]);

  const visibleIngredients = useMemo(() => {
    const arr = [...filteredIngredients];
    if (sortType === "latest") {
      arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return arr;
  }, [filteredIngredients, sortType]);

  const confirmDelete = () => {
    setIngredients((prev) =>
      prev.filter((item) => !selectedIds.includes(item.fridgeId))
    );
    setSelectedIds([]);
    setIsDeleteMode(false);
  };

  return (
    <>
      <S.FridgeHeaderSection>
        <S.FridgeHeaderInner>
          <S.TopFixedSection>
            <S.FridgeHeader>
              <S.FridgeTitle>나의 냉장고</S.FridgeTitle>
            </S.FridgeHeader>

            <S.CategoryRow>
              {CATEGORIES.map((cat) => (
                <S.LayoutCategoryTab
                  key={cat}
                  active={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </S.LayoutCategoryTab>
              ))}
            </S.CategoryRow>

            <S.FridgeButtonGroup>
              <S.LayoutAddButton onClick={() => setIsAddOpen(true)}>
                재료 추가
              </S.LayoutAddButton>

              <S.LayoutAddButton
                onClick={() => {
                  setIsDeleteMode((prev) => !prev);
                  setSelectedIds([]);
                }}
              >
                재료 삭제
              </S.LayoutAddButton>

              {isDeleteMode && (
                <S.LayoutAddButton onClick={confirmDelete}>
                  삭제 확인
                </S.LayoutAddButton>
              )}

              <S.LayoutAddButton
                onClick={() => {
                  alert("재료 수정 기능은 다음 단계에서 붙이면 됩니다.");
                }}
              >
                재료 수정
              </S.LayoutAddButton>
            </S.FridgeButtonGroup>
          </S.TopFixedSection>
        </S.FridgeHeaderInner>
      </S.FridgeHeaderSection>


      <S.MyFridgeContainer>

        {/* ✅ 재료가 있을 때 배너 표시 */}
{ingredients.length > 0 && (
  <S.RecommendBanner>
    <S.BannerBackground>
      <S.BannerOverlay>
        <Link to="/foodrecommendation">
          <S.BannerButton>추천 요리 확인</S.BannerButton>
        </Link>
      </S.BannerOverlay>
    </S.BannerBackground>
  </S.RecommendBanner>
)}

        {ingredients.length === 0 && !isAddOpen && (
          <S.EmptyWrapper>
            <AddIngredientModal onNext={() => setIsAddOpen(true)} />
          </S.EmptyWrapper>
        )}

        {visibleIngredients.length > 0 && (
          <IngredientList
            items={visibleIngredients}
            deleteMode={isDeleteMode}
            selectedIds={selectedIds}
            onToggle={toggleSelected}
          />
        )}

        {isAddOpen && (
          <AddIngredientDetailModal
            baseIngredients={BASE_INGREDIENTS}
            onClose={() => setIsAddOpen(false)}
            onSubmit={handleAddIngredients}
          />
        )}
      </S.MyFridgeContainer>
    </>
  );
};

export default MyFridge;