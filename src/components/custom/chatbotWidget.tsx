"use client";

import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useTheme } from "next-themes";

export default function ChatbotWidget() {
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const chatbotTheme = {
    background: isDark ? "#020617" : "#f9fafb",
    fontFamily: "Inter, sans-serif",
    headerBgColor: isDark ? "#020617" : "#4f46e5",
    headerFontColor: "#ffffff",
    headerFontSize: "16px",
    botBubbleColor: isDark ? "#1e293b" : "#4f46e5",
    botFontColor: "#ffffff",
    userBubbleColor: isDark ? "#0f172a" : "#e5e7eb",
    userFontColor: isDark ? "#e5e7eb" : "#111827",
  };

  const steps = [
    {
      id: "welcome",
      message: "👋 Welcome to Society 365. How can I help you?",
      trigger: "menu",
    },
    {
      id: "menu",
      waitAction: true,
      options: [
        { value: "rent", label: "💰 How to pay rent?", trigger: "rent" },
        { value: "receipt", label: "🧾 Where can I see my receipt?", trigger: "receipt" },
        { value: "docs", label: "📂 Where do I upload documents?", trigger: "docs" },
      ],
    },
    {
      id: "rent",
      message:
        "💰 **Rent Payment Process**\n\n1️⃣ Go to *Payments*\n2️⃣ Click *Pay Now*\n3️⃣ Select Month\n4️⃣ Pay via UPI/Card\n\n✅ Receipt is auto-generated.",
      trigger: "menu",
    },
    {
      id: "receipt",
      message:
        "🧾 **View Receipt**\n\n1️⃣ Payments → History\n2️⃣ Select Transaction\n3️⃣ Download PDF",
      trigger: "menu",
    },
    {
      id: "docs",
      message:
        "📂 **Upload Documents**\n\nProfile → Documents → Upload → Admin verifies",
      trigger: "menu",
    },
  ];

  return (
    <StyledThemeProvider theme={chatbotTheme}>
      <ChatBot
        steps={steps}
        floating
        headerTitle="Society 365 Assistant"
        hideUserInput
        smoothScroll
      />
    </StyledThemeProvider>
  );
}
