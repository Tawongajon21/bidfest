import Image from "next/image";
import MarketingHero from "@/components/marketingHero"
import { headers } from "next/headers";
import Logo from "../public/images/logo.jpg"
export const metadata: Metadata = {
  title: "Bidfest -  Trusted platform for smart buyers and serious sellers.",
  description: "Join Bidfirst today and discover a world of online and onsite auctions.Easy ,secure and efficient bidding for buyers and sellers.",
  icons:{
    icon: "/public/images/logo.jpg"
  }
};

import type { Metadata } from "next";
export default function Home() {
  return (


    <MarketingHero/>
  );
}
