import { create } from 'zustand';
import { UserProfile } from '@/types';

interface DashboardStats {
  completedCount: number;
  inProgressCount: number;
  totalQuizzesTaken: number;
  accuracyRate: number;
  learningStreakDays: number;
}

interface UserState {
  profile: UserProfile | null;
  stats: DashboardStats;
  theme: 'dark' | 'light';
  setProfile: (profile: UserProfile | null) => void;
  setStats: (stats: DashboardStats) => void;
  toggleTheme: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  stats: {
    completedCount: 1,
    inProgressCount: 2,
    totalQuizzesTaken: 8,
    accuracyRate: 85,
    learningStreakDays: 4,
  },
  theme: 'dark',
  setProfile: (profile) => set({ profile }),
  setStats: (stats) => set({ stats }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'dark' ? 'light' : 'dark',
    })),
}));
