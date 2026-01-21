import React from 'react'
import * as S from "../style"; // style.js 안에서 export 된 모든 styled-components를 S라는 객체로 가져온다.



export const CommunityHeader = () => {
  return (
    <S.HeaderSection>
      <S.Title>요리 인증 커뮤니티</S.Title>

      <S.SearchRow>
        <S.SearchInput 
          placeholder="요리명, 코멘트, 재료로 검색..." 
          />

        <S.FilterButton>
          <S.FilterIcon
            src="/assets/icons/filter.png"
            alt="정렬 아이콘"
          />
          최신순
        </S.FilterButton>
      </S.SearchRow>

     
    </S.HeaderSection>
  )
}
