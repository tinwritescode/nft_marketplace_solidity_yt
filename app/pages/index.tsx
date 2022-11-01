import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Button from "./components/common/Button/Button";
import Card from "./components/common/Card/Card";
import Input from "./components/common/Input/Input";

const Home = () => {
  return (
    <main>
      <p>Hello world</p>

      <div className="grid space-y-4 mb-4">
        <Button>
          <span>Connect wallet</span>
        </Button>

        <Input />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </main>
  );
};

Home.title = "Home Page";

export default Home;
