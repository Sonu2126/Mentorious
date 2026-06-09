import React from "react";
import Header from "./_components/Header";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <div>
        <Header />
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-8">
          {children}
        </div>
      </div>
      
      <footer className="w-full py-8 text-center bg-purple-200/30 dark:bg-purple-950/20 border-t border-purple-200/50 mt-auto">
        <p className="text-zinc-600 dark:text-zinc-300 text-sm font-semibold">
          Mentorious &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default DashboardLayout;
