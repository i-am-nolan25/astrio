
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Paintbrush, Bug, CheckSquare } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 p-1.5 rounded-md">
              <RefreshCw className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-semibold">CodeRefactor</h1>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition">
              GitHub
            </a>
            <a href="https://docs.example.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition">
              Documentation
            </a>
          </div>
        </div>
      </header>
      <main className="flex-1 p-6">
        {children}
      </main>
      <footer className="border-t border-border py-4 px-6">
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2023 CodeRefactor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export const FeatureTabs: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Tabs defaultValue="refactoring" className="w-full">
      <TabsList className="grid grid-cols-4 mb-8">
        <TabsTrigger value="refactoring" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          <span>Code Refactoring</span>
        </TabsTrigger>
        <TabsTrigger value="ui" className="flex items-center gap-2">
          <Paintbrush className="h-4 w-4" />
          <span>UI Modernization</span>
        </TabsTrigger>
        <TabsTrigger value="bugs" className="flex items-center gap-2">
          <Bug className="h-4 w-4" />
          <span>Bug Fixing</span>
        </TabsTrigger>
        <TabsTrigger value="testing" className="flex items-center gap-2">
          <CheckSquare className="h-4 w-4" />
          <span>Testing</span>
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default Layout;
