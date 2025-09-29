
import { GetServerSideProps } from "next";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Poppins } from "next/font/google";
import QueryProvider from "../components/QueryProvider"
import Navbar from "../components/navbar";
import Register from "./(auth)/register/page"
import Login from "./(auth)/login/page"
import CheckPathway from "./checkPathway"
import RouteTracker from "../components/RouteTracker"
import {PreviousRouteProvider} from "@/helpers/usePreviousPath"
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight:['300','400','500','600','700']
});





export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  


  return (
    <PreviousRouteProvider >

   
    <QueryProvider>
      <RouteTracker/>
    <html lang="en" >
 


      <body>
   <CheckPathway >
   {children}
   </CheckPathway>
       

      
      </body>
    
    </html>

    </QueryProvider>
    </PreviousRouteProvider>
  );
}
