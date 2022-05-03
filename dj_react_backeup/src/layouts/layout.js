import React from "react";
import FadeIn from "react-fade-in";

import Header from "./Header";

export function Layout({ children }) {
  return (
    <div>
      <Header isHome></Header>
      <FadeIn>{children}</FadeIn>
    </div>
  );
}
