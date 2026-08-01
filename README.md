# AlgoVerse 🌌

> **Production-Ready Interactive Algorithm Learning & Visual Simulation Platform**

AlgoVerse transforms computer science education by replacing static reading notes with **real-time step-by-step visual simulations**, interactive **graph canvas editors**, **state inspection engines**, and **dynamic theory & complexity panels**.

---

## 🚀 Key Features

- **⚡ Decoupled Pure Simulation Engine (`SimulationStep[]`)**: Algorithms produce serializable state snapshot arrays. The rendering layer never directly mutates algorithm state.
- **🎓 15 Complete Curriculum Categories (31 Interactive Visualizers)**: Full coverage from fundamental searching/sorting to advanced graph theory, dynamic programming, backtracking, sliding window, DSU, trie, heap, topological sort, KMP, and hashing.
- **🎯 Interactive Graph Canvas Editor**: Create, move, and delete nodes and edges with custom weights in real time. Switch dynamically between **Directed** and **Undirected** graph modes.
- **📊 Real-Time Execution Inspector**:
  - **Pseudocode Highlighting**: Line-by-line active code synchronization.
  - **Algorithm Rationale Panel**: Detailed step-by-step execution explanations.
  - **Theory & Complexity Cards**: $O(N)$ time/space complexity bounds, real-world applications, and interview Q&As for every algorithm.
- **📊 Real-Time Dashboard & Activity Tracker**: Live tracking of current active module, saved topic bookmarks, curriculum progress, and recent activity feed.
- **🔐 Clerk Authentication**: Passwordless & OAuth user authentication managed seamlessly via Clerk JWT verification.

---

## 📚 Curriculum & Supported Algorithms (15 Categories)

| # | Category | Included Algorithms | Visualizer Route |
|---|---|---|---|
| **1** | **Searching Algorithms** | Linear Search, Binary Search | `/simulation/linear-search`, `/simulation/binary-search` |
| **2** | **Sorting Algorithms** | Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort | `/simulation/bubble-sort`, `/simulation/selection-sort`, `/simulation/insertion-sort`, `/simulation/merge-sort`, `/simulation/quick-sort` |
| **3** | **Graph Algorithms** | Dijkstra's, BFS, DFS, Prim's MST, Kruskal's MST, Bellman-Ford | `/simulation/dijkstra`, `/simulation/bfs`, `/simulation/dfs`, `/simulation/prim`, `/simulation/kruskal`, `/simulation/bellman-ford` |
| **4** | **Trees & Hierarchies** | Inorder / Preorder / Postorder / Level Order Traversals, BST Search, BST Insertion | `/simulation/tree-traversal`, `/simulation/bst-search`, `/simulation/bst-insert` |
| **5** | **Dynamic Programming** | 0/1 Knapsack Problem, Longest Common Subsequence (LCS) | `/simulation/knapsack`, `/simulation/lcs` |
| **6** | **Greedy Algorithms** | Activity Selection, Fractional Knapsack | `/simulation/activity-selection`, `/simulation/fractional-knapsack` |
| **7** | **Backtracking** | N-Queens Problem | `/simulation/n-queens` |
| **8** | **Sliding Window** | Maximum Sum Subarray (Size K), Longest Substring Without Repeating Characters | `/simulation/max-subarray`, `/simulation/longest-substring` |
| **9** | **Two Pointers** | Two Sum (Sorted Array), Container With Most Water | `/simulation/two-sum`, `/simulation/container-water` |
| **10** | **Union Find (DSU)** | Disjoint Set Union (Path Compression & Union by Rank) | `/simulation/union-find` |
| **11** | **Trie Structures** | Trie Prefix Tree Insertion & Prefix Search | `/simulation/trie` |
| **12** | **Heap & Priority Queue** | Min Heap Operations, Heap Sort Algorithm | `/simulation/min-heap`, `/simulation/heap-sort` |
| **13** | **Topological Sort** | Kahn's Algorithm (In-Degree BFS) | `/simulation/topological-sort` |
| **14** | **String Matching** | Knuth-Morris-Pratt (KMP & LPS Table) | `/simulation/kmp` |
| **15** | **Hashing & Collision** | Hash Table Insertion & Separate Chaining | `/simulation/hash-table` |

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 App Router, React 19, TypeScript, TailwindCSS, Framer Motion, `@xyflow/react` (React Flow), Zustand.
- **Backend**: Python 3.10+, Django 5, Django REST Framework (DRF), PostgreSQL.
- **Authentication**: Clerk Auth SDK & JWT Authentication Middleware.

---

## 🏁 Quick Start Guide

### Prerequisites
- Node.js 18+ & npm
- Python 3.10+ & `pip`
- PostgreSQL (local or cloud instance)

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```
Backend API will run on `http://localhost:8000/api/`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend Web Application will run on `http://localhost:3000`

---

## 🏛️ Architecture & Documentation

- [Architecture Specifications](ARCHITECTURE.md)
- [Installation Guide](INSTALLATION.md)

---

## 📜 License

MIT License © 2026 AlgoVerse. Built for Computer Science & Engineering Education.
