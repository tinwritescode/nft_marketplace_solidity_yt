import React, { memo } from "react";

type Props = { children: React.ReactNode; onClick?: () => void };

function Button({ children, onClick }: Props) {
  return (
    <button
      className="py-3 px-12 rounded bg-yellow-400 hover:bg-opacity-90"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default memo(Button);
