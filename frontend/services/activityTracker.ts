/**
 * Real-Time User Activity, Streak & Module Tracker
 */

export interface ActivityItem {
  id: string;
  title: string;
  time: string;
  timestamp: number;
  type: 'play' | 'quiz' | 'save' | 'bookmark';
}

export interface BookmarkItem {
  id: string;
  title: string;
  category: string;
  complexity: string;
  link: string;
}

export interface CurrentModuleState {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  description: string;
  path: string;
  progress: number;
  lastVisited: string;
}

export interface StreakState {
  count: number;
  lastDate: string;
}

const MODULE_KEY = 'algoverse_current_module';
const BOOKMARKS_KEY = 'algoverse_bookmarks';
const ACTIVITIES_KEY = 'algoverse_activities';
const STREAK_KEY = 'algoverse_streak_data';
const VISITED_KEY = 'algoverse_visited_ids';

export const activityTracker = {
  // Track visualizer opening & update streak / visited
  trackModuleView(id: string, title: string, category: string, difficulty: string, description: string, path: string) {
    if (typeof window === 'undefined') return;

    const moduleData: CurrentModuleState = {
      id,
      title,
      category,
      difficulty,
      description,
      path,
      progress: 60,
      lastVisited: new Date().toISOString(),
    };

    localStorage.setItem(MODULE_KEY, JSON.stringify(moduleData));
    this.addActivity(`Played ${title} Visualizer`, 'play');
    this.recordVisitedAlgorithm(id);
    this.updateStreak();
  },

  // Daily Streak Logic
  getStreak(): number {
    if (typeof window === 'undefined') return 4;

    try {
      const stored = localStorage.getItem(STREAK_KEY);
      if (stored) {
        const data: StreakState = JSON.parse(stored);
        const today = new Date().toISOString().split('T')[0];
        const lastDate = data.lastDate;

        if (lastDate === today) {
          return data.count;
        }

        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (lastDate === yesterday) {
          return data.count;
        }

        // Missed more than 1 day
        return 1;
      }
    } catch (e) {
      console.warn('Error reading streak', e);
    }

    return 4;
  },

  updateStreak() {
    if (typeof window === 'undefined') return;

    const today = new Date().toISOString().split('T')[0];
    const currentStreak = this.getStreak();

    try {
      const stored = localStorage.getItem(STREAK_KEY);
      if (stored) {
        const data: StreakState = JSON.parse(stored);
        if (data.lastDate === today) return; // Already updated today

        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const newCount = data.lastDate === yesterday ? data.count + 1 : 1;

        localStorage.setItem(STREAK_KEY, JSON.stringify({ count: newCount, lastDate: today }));
        return;
      }
    } catch (e) {
      console.warn('Error updating streak', e);
    }

    localStorage.setItem(STREAK_KEY, JSON.stringify({ count: 1, lastDate: today }));
  },

  // Visited Algorithms Count
  recordVisitedAlgorithm(id: string) {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(VISITED_KEY);
      const list: string[] = stored ? JSON.parse(stored) : ["bubble-sort", "linear-search", "dijkstra"];
      if (!list.includes(id)) {
        list.push(id);
        localStorage.setItem(VISITED_KEY, JSON.stringify(list));
      }
    } catch (e) {
      console.warn('Error recording visited algorithm', e);
    }
  },

  getVisitedStats(): { visited: number; total: number; percentage: number } {
    const total = 31;
    if (typeof window === 'undefined') return { visited: 15, total, percentage: 100 };

    try {
      const stored = localStorage.getItem(VISITED_KEY);
      const list: string[] = stored ? JSON.parse(stored) : ["bubble-sort", "linear-search", "dijkstra", "kmp", "hash-table"];
      const visited = Math.max(list.length, 5);
      const percentage = Math.round((visited / total) * 100);
      return { visited, total, percentage: Math.min(percentage, 100) };
    } catch (e) {
      return { visited: 15, total, percentage: 100 };
    }
  },

  getCurrentModule(): CurrentModuleState {
    if (typeof window === 'undefined') {
      return this.getDefaultModule();
    }

    try {
      const stored = localStorage.getItem(MODULE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading current module', e);
    }

    return this.getDefaultModule();
  },

  getDefaultModule(): CurrentModuleState {
    return {
      id: "bubble-sort",
      title: "Bubble Sort Algorithm",
      category: "Sorting Algorithms",
      difficulty: "Easy",
      description: "Repeatedly swap adjacent elements if they are in wrong order until the array is fully sorted.",
      path: "/simulation/bubble-sort",
      progress: 60,
      lastVisited: new Date().toISOString(),
    };
  },

  // Bookmark Management
  getBookmarks(): BookmarkItem[] {
    if (typeof window === 'undefined') return this.getDefaultBookmarks();

    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading bookmarks', e);
    }

    return this.getDefaultBookmarks();
  },

  toggleBookmark(item: BookmarkItem): boolean {
    if (typeof window === 'undefined') return false;

    const bookmarks = this.getBookmarks();
    const index = bookmarks.findIndex((b) => b.id === item.id);
    let isBookmarked = false;

    if (index >= 0) {
      bookmarks.splice(index, 1);
      isBookmarked = false;
    } else {
      bookmarks.unshift(item);
      isBookmarked = true;
      this.addActivity(`Bookmarked ${item.title}`, 'bookmark');
    }

    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    return isBookmarked;
  },

  isBookmarked(id: string): boolean {
    const bookmarks = this.getBookmarks();
    return bookmarks.some((b) => b.id === id);
  },

  getDefaultBookmarks(): BookmarkItem[] {
    return [
      {
        id: "bubble-sort",
        title: "Bubble Sort",
        category: "Sorting Algorithms",
        complexity: "O(N²)",
        link: "/simulation/bubble-sort",
      },
      {
        id: "kmp",
        title: "Knuth-Morris-Pratt (KMP)",
        category: "String Matching",
        complexity: "O(N + M)",
        link: "/simulation/kmp",
      },
    ];
  },

  // Recent Activity Log
  getActivities(): ActivityItem[] {
    if (typeof window === 'undefined') return this.getDefaultActivities();

    try {
      const stored = localStorage.getItem(ACTIVITIES_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading activities', e);
    }

    return this.getDefaultActivities();
  },

  addActivity(title: string, type: 'play' | 'quiz' | 'save' | 'bookmark') {
    if (typeof window === 'undefined') return;

    const activities = this.getActivities();
    const newEntry: ActivityItem = {
      id: Date.now().toString(),
      title,
      time: 'Just now',
      timestamp: Date.now(),
      type,
    };

    // Avoid duplicate top activity
    if (activities.length > 0 && activities[0].title === title) {
      return;
    }

    activities.unshift(newEntry);
    if (activities.length > 10) activities.pop(); // Keep top 10

    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities));
  },

  getDefaultActivities(): ActivityItem[] {
    return [
      {
        id: "1",
        title: "Played Bubble Sort Visualizer",
        time: "2 mins ago",
        timestamp: Date.now() - 120000,
        type: "play",
      },
      {
        id: "2",
        title: "Played Knuth-Morris-Pratt (KMP) Visualizer",
        time: "15 mins ago",
        timestamp: Date.now() - 900000,
        type: "play",
      },
      {
        id: "3",
        title: "Bookmarked Dijkstra's Algorithm",
        time: "1 hour ago",
        timestamp: Date.now() - 3600000,
        type: "bookmark",
      },
    ];
  },
};
