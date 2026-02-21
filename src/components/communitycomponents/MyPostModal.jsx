// MyPostModal.jsx
import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import * as S from "./MyPostModal.style";

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const MyPostModal = ({
  open,
  onClose,
  post,
  onSubmitComment,
  meNickname,

  onEditComment, // (comment, nextText) => {}
  onDeleteComment, // (comment) => {}

  // 내 게시글/댓글 관리용 (부모에서 연결)
  onEditPost, // (postId, patch) => {}
  onDeletePost, // (postId) => {}
  onEditPostImage, // (postId, index, fileOrUrl) => {}
  onDeleteAllComments, // (postId) => {}
  onDeleteSelectedComments, // (postId, selectedKeysOrIndexes) => {}
}) => {
  // 이미지/댓글
  const [activeIndex, setActiveIndex] = useState(0);
  const images = useMemo(() => post?.images ?? [], [post]);
  const comments = useMemo(() => post?.comments ?? [], [post]);
  const hasImages = images.length > 0;
  const safeIndex = clamp(activeIndex, 0, Math.max(0, images.length - 1));
  const currentImage = hasImages ? images[safeIndex] : "";

  // 댓글 작성
  const [commentText, setCommentText] = useState("");
  const [isCommentComposeOpen, setIsCommentComposeOpen] = useState(false);

  // 댓글 ⋮ 메뉴 + 인라인 편집
  const [openMenuKey, setOpenMenuKey] = useState(null);
  const [editingKey, setEditingKey] = useState(null);
  const [draftText, setDraftText] = useState("");
  const [hoverKey, setHoverKey] = useState(null);

  // 게시글(TopRow) ⋮ 메뉴 + 게시글 편집 모드
  const [openPostMenu, setOpenPostMenu] = useState(false);
  const [isPostEditing, setIsPostEditing] = useState(false);
  const [postDraftTitle, setPostDraftTitle] = useState("");
  const [postDraftContent, setPostDraftContent] = useState("");
  const [postDraftIngredients, setPostDraftIngredients] = useState("");

  // 댓글 관리 메뉴(헤더) + 선택삭제/댓글수정(관리자 수정)
  const [openCommentAdminMenu, setOpenCommentAdminMenu] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(() => new Set());
  const [adminEditMode, setAdminEditMode] = useState(false);

  // 본문 펼치기/접기
  const [isExpanded, setIsExpanded] = useState(false);
  const [canToggle, setCanToggle] = useState(false);
  const descRef = useRef(null);

  // “내 글인지” 판별
  const isPostMine = useMemo(() => {
    const authorNick = String(post?.author?.nickname ?? "").trim();
    const me = String(meNickname ?? "").trim();
    return !!authorNick && !!me && authorNick === me;
  }, [post?.author?.nickname, meNickname]);

  const isMine = useCallback(
    (c) => {
      if (!meNickname) return false;
      return String(c?.nickname ?? "").trim() === String(meNickname).trim();
    },
    [meNickname],
  );

  // ===== 이미지 슬라이드 =====
  const handlePrev = useCallback(() => {
    if (!hasImages) return;
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [hasImages, images.length]);

  const handleNext = useCallback(() => {
    if (!hasImages) return;
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [hasImages, images.length]);

  // ===== 댓글 전송 =====
  const resetComposer = useCallback(() => {
    setCommentText("");
    setIsCommentComposeOpen(false);
  }, []);

  const handleSend = useCallback(() => {
    const text = commentText.trim();
    if (!text) return;
    onSubmitComment?.(text);
    setCommentText("");
    setIsCommentComposeOpen(false);
  }, [commentText, onSubmitComment]);

  // ===== 댓글 편집 =====
  const startEdit = useCallback((key) => {
    setEditingKey(key);
    setDraftText("");
    setOpenMenuKey(null);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingKey(null);
    setDraftText("");
  }, []);

  const saveEdit = useCallback(
    (c) => {
      const next = draftText.trim();
      if (!next) return;
      onEditComment?.(c, next);
      setEditingKey(null);
      setDraftText("");
    },
    [draftText, onEditComment],
  );

  // ===== 댓글 선택 삭제 =====
  const toggleSelect = useCallback((key) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const handleDeleteAllComments = useCallback(() => {
    if (!post?.id) return;
    const ok = window.confirm("댓글을 전체 삭제할까요?");
    if (!ok) return;
    onDeleteAllComments?.(post.id);
  }, [post?.id, onDeleteAllComments]);

  const handleDeleteSelected = useCallback(() => {
    if (!post?.id) return;
    if (selectedKeys.size === 0) return;

    const ok = window.confirm("선택한 댓글을 삭제할까요?");
    if (!ok) return;

    onDeleteSelectedComments?.(post.id, Array.from(selectedKeys));
    setSelectedKeys(new Set());
    setSelectMode(false);
  }, [post?.id, selectedKeys, onDeleteSelectedComments]);

  // ===== 게시글 편집 draft 초기화 =====
  useEffect(() => {
    if (!open) return;

    setActiveIndex(0);
    setCommentText("");
    setIsCommentComposeOpen(false);

    setOpenMenuKey(null);
    setEditingKey(null);
    setDraftText("");
    setHoverKey(null);

    setOpenPostMenu(false);
    setIsPostEditing(false);

    setOpenCommentAdminMenu(false);
    setSelectMode(false);
    setSelectedKeys(new Set());
    setAdminEditMode(false);

    setIsExpanded(false);

    setPostDraftTitle(post?.recipeTitle ?? "");
    setPostDraftContent(post?.content ?? "");
    setPostDraftIngredients((post?.ingredients ?? []).join(", "));
  }, [open, post?.id]);

  // ===== 게시글 이미지 수정(file input) =====
  const fileRef = useRef(null);

  const handleClickImageEdit = useCallback(() => {
    fileRef.current?.click();
  }, []);

  const handlePickImage = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      onEditPostImage?.(post?.id, safeIndex, file);
      e.target.value = "";
    },
    [onEditPostImage, post?.id, safeIndex],
  );

  // ===== 게시글 수정 저장/취소 =====
  const cancelPostEdit = useCallback(() => {
    setIsPostEditing(false);
    setPostDraftTitle(post?.recipeTitle ?? "");
    setPostDraftContent(post?.content ?? "");
    setPostDraftIngredients((post?.ingredients ?? []).join(", "));
  }, [post?.recipeTitle, post?.content, post?.ingredients]);

  const savePostEdit = useCallback(() => {
    const patch = {
      recipeTitle: postDraftTitle.trim(),
      content: postDraftContent.trim(),
      ingredients: postDraftIngredients
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    onEditPost?.(post?.id, patch);
    setIsPostEditing(false);
  }, [post?.id, postDraftTitle, postDraftContent, postDraftIngredients, onEditPost]);

  // ===== 자세히 보기/간단히 토글 가능 여부 =====
  useEffect(() => {
    if (!open) return;
    if (isExpanded) return;

    const el = descRef.current;
    if (!el) return;

    const raf = requestAnimationFrame(() => {
      setCanToggle(el.scrollHeight > el.clientHeight + 1);
    });
    return () => cancelAnimationFrame(raf);
  }, [open, post?.id, post?.content, isExpanded]);

  // ===== ESC/좌우/전송 =====
  const openMenuKeyRef = useRef(openMenuKey);
  const editingKeyRef = useRef(editingKey);

  useEffect(() => {
    openMenuKeyRef.current = openMenuKey;
  }, [openMenuKey]);

  useEffect(() => {
    editingKeyRef.current = editingKey;
  }, [editingKey]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        if (editingKeyRef.current) {
          cancelEdit();
          return;
        }
        if (openMenuKeyRef.current) {
          setOpenMenuKey(null);
          return;
        }
        // 열려있는 상단 메뉴들 닫기
        if (openPostMenu) setOpenPostMenu(false);
        if (openCommentAdminMenu) setOpenCommentAdminMenu(false);
        onClose?.();
      }
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleSend();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    open,
    onClose,
    handlePrev,
    handleNext,
    handleSend,
    cancelEdit,
    openPostMenu,
    openCommentAdminMenu,
  ]);

  // ===== 메뉴 바깥 클릭 닫기 (댓글 ⋮) =====
  useEffect(() => {
    if (openMenuKey === null) return;

    const handleWindowClick = () => setOpenMenuKey(null);
    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, [openMenuKey]);

  // ===== 메뉴 바깥 클릭 닫기 (게시글 ⋮ / 댓글관리 ⋮) =====
  useEffect(() => {
    if (!open) return;

    const handleWindowClick = () => {
      setOpenPostMenu(false);
      setOpenCommentAdminMenu(false);
    };

    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, [open]);

  if (!open) return null;

  const count = commentText.length;

  return (
    <S.Backdrop
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <S.Modal onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        {/* 이미지 업로드 input */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handlePickImage}
        />

        {/* 상단 이미지 영역 */}
        <S.Hero>
          <S.CloseButton type="button" onClick={onClose} aria-label="닫기">
            <S.CloseIcon src={`${process.env.PUBLIC_URL}/assets/icons/close.svg`} alt="닫기" />
          </S.CloseButton>

          {hasImages ? (
            <S.ImageWrapper>
              <S.HeroBg src={currentImage} alt="" aria-hidden="true" />
              <S.HeroBgDim aria-hidden="true" />

              <S.HeroMain>
                <S.HeroMainBox>
                  <S.HeroMainImg src={currentImage} alt="요리 인증 이미지" />
                </S.HeroMainBox>
              </S.HeroMain>

              {images.length > 1 && (
                <S.NavControls>
                  <S.NavButtonLeft disabled={images.length <= 1} onClick={handlePrev} type="button">
                    <S.NavIcon src="/assets/icons/left.svg" alt="이전" />
                  </S.NavButtonLeft>
                  <S.NavButtonRight disabled={images.length <= 1} onClick={handleNext} type="button">
                    <S.NavIcon src="/assets/icons/right.svg" alt="다음" />
                  </S.NavButtonRight>
                </S.NavControls>
              )}

              {images.length > 1 && (
                <S.ImageIndex>
                  {safeIndex + 1} / {images.length}
                </S.ImageIndex>
              )}
            </S.ImageWrapper>
          ) : (
            <S.HeroPlaceholder>이미지가 없습니다.</S.HeroPlaceholder>
          )}
        </S.Hero>

        {/* 하단 */}
        <S.Body>
          {/* LEFT */}
          <S.Left>
            <S.TopRow>
              <S.TopLeft>
                <S.Nickname>{post?.author?.nickname ?? "익명"}</S.Nickname>

                <S.MetaRight>
                  <S.LevelBadge>
                    <S.LevelIcon src={`${process.env.PUBLIC_URL}/assets/icons/star.svg`} alt="레벨" />
                    <span>Lv.{post?.author?.level ?? 1}</span>
                  </S.LevelBadge>

                  <S.LikeBadge>
                    <S.HeartIcon src={`${process.env.PUBLIC_URL}/assets/icons/heart.svg`} alt="좋아요" />
                    <span>{post?.likes ?? 0}</span>
                  </S.LikeBadge>
                </S.MetaRight>
              </S.TopLeft>

              {/* 내 게시글이면 게시글 관리 ⋮ */}
              {isPostMine && (
                <S.PostMenuWrap
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <S.KebabButton
                    type="button"
                    aria-label="게시글 옵션"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenPostMenu((v) => !v);
                    }}
                  >
                    <S.KebabDots />
                  </S.KebabButton>

                  {openPostMenu && (
                    <S.MenuBox
                      $direction="down"
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <S.MenuItem
                        type="button"
                        onClick={() => {
                          setOpenPostMenu(false);
                          handleClickImageEdit();
                        }}
                      >
                        <S.MenuIcon src="/assets/icons/default_edit_img.svg" alt="이미지 수정" />
                        이미지 수정
                      </S.MenuItem>

                      <S.MenuItem
                        type="button"
                        $primary
                        onClick={() => {
                          setOpenPostMenu(false);
                          setIsPostEditing(true);
                        }}
                      >
                        <S.MenuIcon src="/assets/icons/default_pencil.svg" alt="게시글 수정" />
                        게시글 수정
                      </S.MenuItem>

                      <S.MenuItem
                        type="button"
                        $danger
                        onClick={() => {
                          setOpenPostMenu(false);
                          const ok = window.confirm("게시글을 삭제할까요?");
                          if (ok) onDeletePost?.(post?.id);
                        }}
                      >
                        <S.MenuIcon src="/assets/icons/default_trash.svg" alt="게시글 삭제" />
                        게시글 삭제
                      </S.MenuItem>
                    </S.MenuBox>
                  )}
                </S.PostMenuWrap>
              )}
            </S.TopRow>

            <S.DateText>{post?.createdAt ?? ""}</S.DateText>

            {/* 게시글 수정 모드 */}
            {isPostEditing ? (
              <>
                <S.EditTitleInput
                  value={postDraftTitle}
                  onChange={(e) => setPostDraftTitle(e.target.value)}
                  placeholder="제목"
                />

                <S.EditPostTextarea
                  value={postDraftContent}
                  onChange={(e) => setPostDraftContent(e.target.value)}
                  placeholder="내용"
                />

                <S.EditIngredientsInput
                  value={postDraftIngredients}
                  onChange={(e) => setPostDraftIngredients(e.target.value)}
                  placeholder="재료를 콤마로 구분 (예: 밀가루, 생크림)"
                />

                <S.PostEditActionRow>
                  <S.PostEditButton type="button" onClick={cancelPostEdit}>
                    취소
                  </S.PostEditButton>
                  <S.PostEditButton type="button" $primary onClick={savePostEdit}>
                    저장
                  </S.PostEditButton>
                </S.PostEditActionRow>
              </>
            ) : (
              <>
                <S.Title>{post?.recipeTitle ?? "제목"}</S.Title>

                <S.Desc ref={descRef} $expanded={isExpanded}>
                  {post?.content ?? ""}
                </S.Desc>

                {canToggle && (
                  <S.DetailLink type="button" onClick={() => setIsExpanded((v) => !v)}>
                    {isExpanded ? "간단히" : "자세히 보기"}
                  </S.DetailLink>
                )}

                <S.SectionTitle>사용한 재료</S.SectionTitle>
                <S.ChipRow>
                  {(post?.ingredients ?? []).map((ing) => (
                    <S.Chip key={ing}>{ing}</S.Chip>
                  ))}
                </S.ChipRow>

                <S.XpBox>
                  재료 소진 후 획득 XP : <b>+{post?.xp ?? 0} XP</b>
                </S.XpBox>
              </>
            )}
          </S.Left>

          {/* RIGHT */}
          <S.Right>
            <S.CommentCard>
              {/* 댓글 헤더 (딱 1번만) */}
              <S.CommentHeader>
                <S.CommentHeaderTop>
                  댓글 <b>{comments.length}</b>
                </S.CommentHeaderTop>

                {/* 선택삭제 모드 액션 */}
                {isPostMine && selectMode && (
                  <S.SelectActionBar>
                    <S.PostEditButton
                      type="button"
                      onClick={() => {
                        setSelectMode(false);
                        setSelectedKeys(new Set());
                      }}
                    >
                      취소
                    </S.PostEditButton>
                    <S.PostEditButton
                      type="button"
                      $danger
                      disabled={selectedKeys.size === 0}
                      onClick={handleDeleteSelected}
                    >
                      선택 삭제
                    </S.PostEditButton>
                  </S.SelectActionBar>
                )}

                {/* 댓글 관리 ⋮ */}
                {isPostMine && (
                  <S.CommentMenuWrap
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <S.KebabButton
                      type="button"
                      aria-label="댓글 관리"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenCommentAdminMenu((v) => !v);
                      }}
                    >
                      <S.KebabDots />
                    </S.KebabButton>

                    {openCommentAdminMenu && (
                      <S.MenuBox
                        $direction="down"
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        <S.MenuItem
                          type="button"
                          $danger
                          onClick={() => {
                            setOpenCommentAdminMenu(false);
                            handleDeleteAllComments();
                          }}
                        >
                          <S.MenuIcon src="/assets/icons/default_trash.svg" alt="전체 삭제" />
                          전체 삭제
                        </S.MenuItem>

                        <S.MenuItem
                          type="button"
                          onClick={() => {
                            setOpenCommentAdminMenu(false);
                            setSelectMode(true);
                            setAdminEditMode(false);
                            setSelectedKeys(new Set());
                          }}
                        >
                          <S.MenuIcon
                            src="/assets/icons/default_check_circle_broken.svg"
                            alt="선택 삭제"
                          />
                          선택 삭제
                        </S.MenuItem>

                        <S.MenuItem
                          type="button"
                          $primary
                          onClick={() => {
                            setOpenCommentAdminMenu(false);
                            setAdminEditMode((v) => !v);
                            setSelectMode(false);
                            setSelectedKeys(new Set());
                          }}
                        >
                          <S.MenuIcon src="/assets/icons/default_pencil.svg" alt="댓글 수정" />
                          댓글 수정
                        </S.MenuItem>
                      </S.MenuBox>
                    )}
                  </S.CommentMenuWrap>
                )}
              </S.CommentHeader>

              <S.SectionDivider />

              {/* 댓글 리스트 */}
              <S.CommentScrollArea>
                {comments.length === 0 ? (
                  <S.EmptyComment>아직 댓글이 없어요. 첫 댓글을 남겨보세요!</S.EmptyComment>
                ) : (
                  comments.map((c, idx) => {
                    const mine = isMine(c);
                    const key = `${c.nickname}-${idx}`;
                    const isEditing = editingKey === key;


                    return (
                      <S.CommentItem key={key}>
                        <S.CommentTop>
                          {isPostMine && selectMode && (
                            <input
                              type="checkbox"
                              checked={selectedKeys.has(key)}
                              onChange={() => toggleSelect(key)}
                            />
                          )}

                          <S.CommentLeft>
                            <S.CommentNickname>{c.nickname}</S.CommentNickname>

                            <S.CommentMeta>
                              <S.CommentTime>{c.time}</S.CommentTime>
                              {mine && <S.MineTag>나</S.MineTag>}
                            </S.CommentMeta>
                          </S.CommentLeft>

                          {/* 수정/삭제 메뉴: 내 댓글 OR (내 글 && 댓글수정모드) */}
                      
                            <S.CommentMenuWrap
                              onClick={(e) => e.stopPropagation()}
                              onMouseDown={(e) => e.stopPropagation()}
                            >
                              <S.KebabButton
                                type="button"
                                aria-label="댓글 옵션"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isEditing) return;
                                  setOpenMenuKey((prev) => (prev === key ? null : key));
                                }}
                              >
                                <S.KebabDots />
                              </S.KebabButton>

                              {openMenuKey === key && (
                                <S.MenuBox
                                  $direction="up"
                                  onClick={(e) => e.stopPropagation()}
                                  onMouseDown={(e) => e.stopPropagation()}
                                >
                                  <S.MenuItem
                                    type="button"
                                    $primary
                                    onMouseEnter={() => setHoverKey(key + "-edit")}
                                    onMouseLeave={() => setHoverKey(null)}
                                    onClick={() => startEdit(key)}
                                  >
                                    <S.MenuIcon
                                      src={
                                        hoverKey === key + "-edit"
                                          ? "/assets/icons/main_pencil.svg"
                                          : "/assets/icons/default_pencil.svg"
                                      }
                                      alt="수정"
                                    />
                                    수정
                                  </S.MenuItem>

                                  <S.MenuItem
                                    type="button"
                                    $danger
                                    onMouseEnter={() => setHoverKey(key + "-del")}
                                    onMouseLeave={() => setHoverKey(null)}
                                    onClick={() => {
                                      setOpenMenuKey(null);
                                      onDeleteComment?.(c);
                                    }}
                                  >
                                    <S.MenuIcon
                                      src={
                                        hoverKey === key + "-del"
                                          ? "/assets/icons/main_trash.svg"
                                          : "/assets/icons/default_trash.svg"
                                      }
                                      alt="삭제"
                                    />
                                    삭제
                                  </S.MenuItem>
                                </S.MenuBox>
                              )}
                            </S.CommentMenuWrap>
                          }
                        </S.CommentTop>

                        <S.CommentTextWrap $editing={isEditing}>
                          {isEditing ? (
                            <S.EditTextarea
                              value={draftText}
                              autoFocus
                              onChange={(e) => setDraftText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  saveEdit(c);
                                }
                                if (e.key === "Escape") {
                                  e.preventDefault();
                                  cancelEdit();
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            <S.CommentText>{c.text}</S.CommentText>
                          )}
                        </S.CommentTextWrap>

                        {isEditing && (
                          <S.EditActionRow>
                            <S.EditActionButton type="button" onClick={cancelEdit}>
                              취소
                            </S.EditActionButton>
                            <S.EditActionButton
                              type="button"
                              $primary
                              onClick={() => saveEdit(c)}
                              disabled={!draftText.trim()}
                            >
                              저장
                            </S.EditActionButton>
                          </S.EditActionRow>
                        )}
                      </S.CommentItem>
                    );
                  })
                )}
              </S.CommentScrollArea>

              {/* 입력 영역 */}
              <S.CommentComposer>
                <S.Textarea
                  value={commentText}
                  onFocus={() => setIsCommentComposeOpen(true)}
                  onChange={(e) => setCommentText(e.target.value.slice(0, 300))}
                  placeholder="댓글을 입력하세요(최대 300자)"
                />
                <S.SendButton
                  type="button"
                  onClick={handleSend}
                  aria-label="댓글 전송"
                  $disabled={count === 0}
                  disabled={count === 0}
                >
                  <S.SendIcon src={`${process.env.PUBLIC_URL}/assets/icons/send.svg`} alt="전송" />
                </S.SendButton>
              </S.CommentComposer>

              <S.CounterRow>
                <S.CounterText>{count} / 300</S.CounterText>
              </S.CounterRow>

              {isCommentComposeOpen && (
                <S.ActionRow>
                  <S.ActionButton type="button" $variant="ghost" onClick={resetComposer}>
                    취소
                  </S.ActionButton>
                  <S.ActionButton
                    type="button"
                    $variant="primary"
                    onClick={handleSend}
                    disabled={count === 0}
                    $disabled={count === 0}
                  >
                    저장
                  </S.ActionButton>
                </S.ActionRow>
              )}
            </S.CommentCard>
          </S.Right>
        </S.Body>
      </S.Modal>
    </S.Backdrop>
  );
};

export default MyPostModal;