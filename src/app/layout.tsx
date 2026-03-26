import React, { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import ComingSoonModal from "@/components/ComingSoonModal";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ComingSoonModal />
      {children}
      <ChatWidget />
    </AuthProvider>
  );
}
