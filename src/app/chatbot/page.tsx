'use client';

import dynamic from 'next/dynamic';

const ChatbotWidget = dynamic(
  () => import('@/components/custom/chatbotWidget'),
  { ssr: false } // 🔥 MOST IMPORTANT
);

export default function Page() {
  return <ChatbotWidget />;
}
