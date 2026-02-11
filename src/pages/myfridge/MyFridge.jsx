import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AddIngredientModal from "../../components/myfridgecomponents/AddIngredientModal";
import IngredientList from "../../components/myfridgecomponents/IngredientList";
import AddIngredientDetailModal from "../../components/myfridgecomponents/AddIngredientDetailModal";
import {
  CategoryRow,
  EmptyWrapper,
  FridgeButtonGroup,
  FridgeHeader,
  FridgeHeaderInner,
  FridgeHeaderSection,
  FridgeTitle,
  FridgeTopSection,
  LayoutAddButton,
  LayoutCategoryTab,
  MyFridgeContainer,
  TopFixedSection,
  TopInfoRow,
} from "./style";

/**
 * ✅ 재료 원본 데이터(단일 소스)
 * - 추후 API로 대체하면 여기만 바꾸면 됩니다.
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
  // 냉장고에 들어있는 실제 재료(완성형 객체로 저장)
  const [ingredients, setIngredients] = useState([]);

  // 모달 제어
  const [isAddOpen, setIsAddOpen] = useState(false);

  // 카테고리 / 정렬
  const [activeCategory, setActiveCategory] = useState("전체");
  const [sortType, setSortType] = useState("default"); // default | latest

  // 삭제 모드
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  // 선택 토글(삭제 모드에서만 사용)
  const toggleSelected = (fridgeId) => {
    setSelectedIds((prev) =>
      prev.includes(fridgeId) ? prev.filter((v) => v !== fridgeId) : [...prev, fridgeId]
    );
  };

  /**
   * 모달에서 넘어온 데이터(newItems)를 냉장고 state에 추가
   * newItems: [{ baseId, quantity, expiredAt }]
   * -> 완성형: { fridgeId, baseId, name, category, icon, quantity, expiredAt, createdAt }
   */
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

  // 필터
  const filteredIngredients = useMemo(() => {
    if (activeCategory === "전체") return ingredients;
    return ingredients.filter((item) => item.category === activeCategory);
  }, [ingredients, activeCategory]);

  // 정렬
  const visibleIngredients = useMemo(() => {
    const arr = [...filteredIngredients];
    if (sortType === "latest") {
      arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return arr;
  }, [filteredIngredients, sortType]);

  // 삭제 확인
  const confirmDelete = () => {
    setIngredients((prev) => prev.filter((item) => !selectedIds.includes(item.fridgeId)));
    setSelectedIds([]);
    setIsDeleteMode(false);
  };

  return (
    <>
      {/* ================= 상단 영역 ================= */}
      <FridgeHeaderSection>
        <FridgeHeaderInner>
          <TopFixedSection>
            <FridgeHeader>
              <FridgeTitle>나의 냉장고</FridgeTitle>
            </FridgeHeader>

            {/* 카테고리 */}
            <CategoryRow>
              {CATEGORIES.map((cat) => (
                <LayoutCategoryTab
                  key={cat}
                  active={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </LayoutCategoryTab>
              ))}
            </CategoryRow>

            {/* 버튼 */}
            <FridgeButtonGroup>
              <LayoutAddButton onClick={() => setIsAddOpen(true)}>재료 추가</LayoutAddButton>

              <LayoutAddButton
                onClick={() => {
                  setIsDeleteMode((prev) => !prev);
                  setSelectedIds([]);
                }}
              >
                재료 삭제
              </LayoutAddButton>

              {isDeleteMode && (
                <LayoutAddButton onClick={confirmDelete}>삭제 확인</LayoutAddButton>
              )}

              {/* 수정은 이후 확장 (선택 1개만 수정 등) */}
              <LayoutAddButton
                onClick={() => {
                  alert("재료 수정 기능은 다음 단계에서 붙이면 됩니다 (선택 1개 수정 권장).");
                }}
              >
                재료 수정
              </LayoutAddButton>
            </FridgeButtonGroup>
          </TopFixedSection>
        </FridgeHeaderInner>
      </FridgeHeaderSection>

      {/* 추천/정렬 영역 */}
      <FridgeTopSection>
        <TopInfoRow>
          <div>
            현재 재료로 추천 요리를 확인해보세요!
            <Link to="/foodrecommendation">
              <button>추천 요리 보기</button>
            </Link>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span
              style={{ cursor: "pointer", fontWeight: sortType === "default" ? 700 : 400 }}
              onClick={() => setSortType("default")}
            >
              일반순
            </span>
            <span
              style={{ cursor: "pointer", fontWeight: sortType === "latest" ? 700 : 400 }}
              onClick={() => setSortType("latest")}
            >
              최신순
            </span>
            <span>☰</span>
          </div>
        </TopInfoRow>
      </FridgeTopSection>

      {/* ================= 리스트 영역 ================= */}
      <MyFridgeContainer>
        {/* 재료 없으면 빈 상태 */}
        {ingredients.length === 0 && !isAddOpen && (
          <EmptyWrapper>
            <AddIngredientModal onNext={() => setIsAddOpen(true)} />
          </EmptyWrapper>
        )}

        {/* 재료 있으면 리스트 */}
        {visibleIngredients.length > 0 && (
          <IngredientList
            items={visibleIngredients}
            deleteMode={isDeleteMode}
            selectedIds={selectedIds}
            onToggle={toggleSelected}
          />
        )}

        {/* 추가 상세 모달 */}
        {isAddOpen && (
          <AddIngredientDetailModal
            baseIngredients={BASE_INGREDIENTS}
            onClose={() => setIsAddOpen(false)}
            onSubmit={handleAddIngredients}
          />
        )}
      </MyFridgeContainer>
    </>
  );
};

export default MyFridge;
