import React, { useMemo } from "react";
import * as S from "./style";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onChange,
  maxVisible = 5,
  leftIconSrc = "/assets/icons/left_arrow.svg",
  rightIconSrc = "/assets/icons/nextpage_arrow.svg",
}) => {
  const pages = useMemo(() => {
    const half = Math.floor(maxVisible / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    start = Math.max(1, end - maxVisible + 1);

    const arr = [];
    for (let i = start; i <= end; i++) arr.push(i);
    return arr;
  }, [currentPage, totalPages, maxVisible]);

  const goTo = (page) => {
    if (!onChange) return;
    if (page < 1 || page > totalPages) return;
    if (page === currentPage) return;
    onChange(page);
  };

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <S.Wrap aria-label="페이지네이션">

      <S.IconButton
        type="button"
        onClick={() => goTo(currentPage - 1)}
        disabled={isFirst}
        aria-label="이전 페이지"
      >
        <S.Icon src={leftIconSrc} alt="" aria-hidden="true" />
      </S.IconButton>

      <S.Pages>
        {pages.map((p) => (
          <S.PageButton
            key={p}
            type="button"
            $active={p === currentPage}
            onClick={() => goTo(p)}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </S.PageButton>
        ))}
      </S.Pages>

      <S.IconButton
        type="button"
        onClick={() => goTo(currentPage + 1)}
        disabled={isLast}
        aria-label="다음 페이지"
      >
        <S.Icon src={rightIconSrc} alt="" aria-hidden="true" />
      </S.IconButton>

    </S.Wrap>
  );
};

export default Pagination;
