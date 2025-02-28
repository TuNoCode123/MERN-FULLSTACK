import { Collapse } from "@kunukn/react-collapse";
import React from "react";

export default function MyComponent({ content }: { content: any }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onToggle = () => setIsOpen((s) => !s);
  return (
    <div className="my-component">
      <Collapse
        isOpen={isOpen}
        transition="height 300ms cubic-bezier(0.4, 0, 0.2, 1)"
        collapseHeight="200px"
      >
        <div
          style={{ zIndex: "999999" }}
          dangerouslySetInnerHTML={{
            __html: `${content}`,
          }}
        ></div>
      </Collapse>
      <div className="detail-list" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Ẩn Bớt" : "  Xem Thêm"}
      </div>
    </div>
  );
}
