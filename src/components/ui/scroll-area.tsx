import React, { useRef, useEffect, useState } from "react";

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  className = "",
  ...props
}) => {
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [scrollbarHeight, setScrollbarHeight] = useState(0);
  const [scrollbarTop, setScrollbarTop] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const updateScrollbar = () => {
      const { scrollHeight, clientHeight, scrollTop } = content;
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
      const newScrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
      const newScrollbarTop =
        scrollPercentage * (clientHeight - newScrollbarHeight);

      setShowScrollbar(scrollHeight > clientHeight);
      setScrollbarHeight(newScrollbarHeight);
      setScrollbarTop(newScrollbarTop);
    };

    updateScrollbar();
    content.addEventListener("scroll", updateScrollbar);
    window.addEventListener("resize", updateScrollbar);

    return () => {
      content.removeEventListener("scroll", updateScrollbar);
      window.removeEventListener("resize", updateScrollbar);
    };
  }, []);

  const handleScrollbarDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const content = contentRef.current;
    const scrollbar = scrollbarRef.current;
    if (!content || !scrollbar) return;

    const startY = e.clientY - scrollbar.getBoundingClientRect().top;
    const contentRect = content.getBoundingClientRect();

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - contentRect.top - startY;
      const percentage = deltaY / (contentRect.height - scrollbarHeight);
      content.scrollTop =
        percentage * (content.scrollHeight - content.clientHeight);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} {...props}>
      <div
        ref={contentRef}
        className="h-full overflow-y-scroll scrollbar-hide"
        style={{ paddingRight: "20px", marginRight: "-20px" }}
      >
        {children}
      </div>
      {showScrollbar && (
        <div
          className="absolute top-0 right-0 w-2 h-full bg-gray-200 rounded-full"
          style={{ opacity: 0.6 }}
        >
          <div
            ref={scrollbarRef}
            className="absolute w-full bg-gray-400 rounded-full cursor-pointer"
            style={{
              height: `${scrollbarHeight}px`,
              top: `${scrollbarTop}px`,
            }}
            onMouseDown={handleScrollbarDrag}
          />
        </div>
      )}
    </div>
  );
};
