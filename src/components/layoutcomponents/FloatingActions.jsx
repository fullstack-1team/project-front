import React, { useEffect, useState } from "react";
import { FloatingWrapper, ScrollButton } from "./style";

const FloatingActions = ({ targetId = "community-top" }) => {
  const [visible, setVisible] = useState(false);

  // 스크롤 위치 감지
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 버튼 클릭 시 스크롤 이동
  const handleScrollTop = () => {
    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <FloatingWrapper>
      <ScrollButton onClick={handleScrollTop}>↑</ScrollButton>
    </FloatingWrapper>
  );
};

export default FloatingActions;



