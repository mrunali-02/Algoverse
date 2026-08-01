import { Header } from "@/components/layout/Header";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { ContinueLearningCard } from "@/components/dashboard/ContinueLearningCard";
import { StatCards } from "@/components/dashboard/StatCards";
import { ProgressChart } from "@/components/dashboard/ProgressChart";
import { BookmarksList } from "@/components/dashboard/BookmarksList";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-8">
        {/* Welcome Hero Banner */}
        <WelcomeCard />

        {/* Core Metric Cards */}
        <StatCards />

        {/* Two-Column Primary Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Main (2 Cols): Continue Learning & Progress Chart */}
          <div className="lg:col-span-2 space-y-8">
            <ContinueLearningCard />
            <ProgressChart />
          </div>

          {/* Right Column (1 Col): Bookmarks & Activity Feed */}
          <div className="space-y-8">
            <BookmarksList />
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  );
}
