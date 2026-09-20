import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/common/Header';
import { Sidebar } from '@/components/common/Sidebar';
import { DemoBanner } from '@/components/common/DemoBanner';
import { AIAssistantDrawer } from '@/components/ai/AIAssistantDrawer';

import { Breadcrumbs } from '@/components/common/Breadcrumbs';

export const AppShell: React.FC = () => {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-100 antialiased font-sans">
      {/* Required Synthetic Demo Data Disclaimer Banner */}
      <DemoBanner />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Navigation Sidebar */}
        <Sidebar
          onOpenAIAssistant={() => setIsAIOpen(true)}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Content Viewport */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header
            onOpenAIAssistant={() => setIsAIOpen(true)}
            onToggleSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
            isMobileSidebarOpen={isMobileSidebarOpen}
          />

          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-[#0B0F19]">
            <div className="max-w-7xl mx-auto space-y-6">
              <Breadcrumbs />
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {/* Global Grounded AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />
    </div>
  );
};

