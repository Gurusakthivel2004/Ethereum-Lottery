"use client";

import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import Header from "@/components/Header";
import LotteryEntrance from "@/components/LotteryEntrance";

export default function Home() {
  return (
    <MoralisProvider initializeOnMount={false}>
      <NotificationProvider>
        <Header />
        <LotteryEntrance />
      </NotificationProvider>
    </MoralisProvider>
  );
}
