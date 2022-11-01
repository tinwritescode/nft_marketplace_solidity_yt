import React from "react";

type Props = { children: React.ReactNode };

function Button({ children }: Props) {
  return (
    <button className="py-3 px-12 rounded bg-yellow-400 hover:bg-opacity-90">
      {children}
    </button>
  );
}

export default Button;
