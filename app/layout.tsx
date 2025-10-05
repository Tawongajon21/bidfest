
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
import { ReactNode, Suspense } from "react";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight:['300','400','500','600','700']
});



interface RootLayoutProps{
  children : ReactNode
}

export default async function RootLayout({children}:RootLayoutProps) {
  


  return (
    <html lang="en" >
      <head>
     
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         </head>
      <body>
    <Suspense>
   
    <PreviousRouteProvider >

   
    <QueryProvider>
      <RouteTracker/>
   
 


   <CheckPathway >
   {children}
   </CheckPathway>
       

      
   
    
   

    </QueryProvider>
    </PreviousRouteProvider>
   
    </Suspense>
    </body>
    </html>
  );
}
