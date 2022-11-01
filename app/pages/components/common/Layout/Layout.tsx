import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <Header />

      <main className="max-w-5xl mx-auto">{children}</main>

      <Footer />
    </>
  );
}

export default Layout;
