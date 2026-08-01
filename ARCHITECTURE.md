# AlgoVerse Architecture Guide 🌌

## 💡 Architectural Philosophy

AlgoVerse is designed around **uncompromising clean separation**, **future-proof extensibility**, and **pure state-driven simulation generation**.

---

## 🏗️ Pure Simulation Engine Design (`SimulationStep[]`)

### Core Concept
Traditional visualization platforms directly manipulate DOM element styles, timers, or React component states inside loop iterations. This causes race conditions, un-syncable playback controls, and untestable code.

AlgoVerse solves this by enforcing a **Pure Step Generator Pattern**:

```
[User Data / Graph Input] ──► [generateAlgorithmSteps()] ──► [SimulationStep[] Array] ──► [React UI Rendering]
```

### `SimulationStep` Structure
Every simulation step is an immutable, serializable snapshot:

```typescript
export interface SimulationStep {
  stepNumber: number;
  action: string;

  highlights?: {
    nodes?: string[];
    edges?: string[];
    indices?: number[];
    cells?: { row: number; col: number }[];
    pointers?: Record<string, number>;
  };

  state?: Record<string, unknown>;

  explanation?: {
    title: string;
    description: string;
    reason: string;
  };

  highlightedPseudocodeLine: number;
  animationType: "fade" | "pulse" | "glow" | "bounce";
}
```

### Domain-Agnostic State Payloads
Each algorithm populates `state` and `highlights` with only the domain data it needs:

- **Graph Algorithms (Dijkstra, BFS, DFS, Prim's, Kruskal's, Bellman-Ford)**: `distances`, `priorityQueue`, `previousNodes`, `visitedNodes`
- **Searching & Sorting (Linear, Binary, Bubble, Selection, Insertion, Merge, Quick)**: `array`, `comparingIndices`, `swappingIndices`, `sortedIndices`, `comparisonCount`, `swapCount`
- **Trees & Hierarchies**: `treeNodes`, `activeNodeValue`, `traversalOrder`
- **Dynamic Programming (0/1 Knapsack, LCS)**: `matrix`, `activeRow`, `activeCol`, `dependencyCells`
- **Greedy (Activity Selection, Fractional Knapsack)**: `activities`, `selectedCount`, `currentRatio`
- **Backtracking (N-Queens)**: `board`, `queenPositions`, `backtrackPath`
- **Sliding Window & Two Pointers**: `windowStart`, `windowEnd`, `leftPointer`, `rightPointer`
- **Union Find / DSU**: `parents`, `ranks`, `activeQuery`
- **Trie & Heap**: `rootNode`, `prefixMatches`, `heapArray`
- **Topological Sort**: `inDegrees`, `zeroDegreeQueue`, `topologicalOrder`
- **String Matching (KMP)**: `text`, `pattern`, `lpsTable`, `textPointer`, `patternPointer`
- **Hashing**: `buckets`, `hashSize`, `calculatedIndex`, `collisionChains`

---

## 🎨 Modular Visualizer Architecture

AlgoVerse uses specialized visualizer components that consume standard `SimulationStep[]` outputs:

- `GraphEditor.tsx`: React Flow canvas for interactive graph manipulation.
- `BarVisualizer.tsx`: Dynamic height bars with color-coded comparison and swap states.
- `ArrayVisualizer.tsx`: Element card arrays with low/mid/high search pointers.
- `TreeVisualizer.tsx`: Hierarchical SVG node layouts with traversal highlights.
- `DPTableVisualizer.tsx`: 2D animated matrix grids.
- `IntervalVisualizer.tsx`: Timeline bars for activity selection intervals.
- `BoardVisualizer.tsx`: N×N chessboard grids for N-Queens backtracking.
- `WindowVisualizer.tsx`: Dual-pointer sliding window overlays.
- `PointersVisualizer.tsx`: Converging left/right pointers.
- `DSUVisualizer.tsx`: Disjoint set partition tree nodes.
- `TrieVisualizer.tsx`: Multi-way prefix tree nodes.
- `HeapVisualizer.tsx`: Complete binary tree heap nodes and array mappings.
- `KMPVisualizer.tsx`: Dual text/pattern character rows with LPS prefix tables.
- `HashVisualizer.tsx`: Bucket slots with linked list chaining.

---

## 📁 Directory Structure & Purpose

```
algoverse/
├── frontend/
│   ├── app/                    # Next.js 15 App Router pages & layouts
│   │   ├── dashboard/          # Real-time dashboard page
│   │   ├── simulation/         # 31 algorithm visualizer pages
│   │   ├── sign-in/            # Clerk sign-in route
│   │   └── sign-up/            # Clerk sign-up route
│   ├── components/
│   │   ├── layout/             # Header & Navigation components
│   │   ├── graph/              # React Flow Canvas, Custom Nodes & Edge Weight Editor
│   │   ├── simulation/         # Simulation Controls, Theory Panel, Pseudocode & Inspectors
│   │   └── dashboard/          # Welcome Card, Stat Cards, Progress Chart & Activity Feed
│   ├── constants/              # Catalog registry & TheoryRegistry definitions
│   ├── services/               # Reusable API & activityTracker services
│   ├── store/                  # Zustand stores (useGraphStore, useSimulationStore, useUserStore)
│   ├── types/                  # TypeScript domain type declarations
│   └── utils/                  # Pure algorithm step generators across 15 categories
└── backend/
    ├── config/                 # Django settings, URLs, WSGI/ASGI apps
    └── apps/
        ├── users/              # Clerk JWT verification backend & user sync
        ├── progress/           # Progress tracking & achievement models
        ├── algorithms/         # Algorithm definitions & complexities
        ├── graphs/             # Saved custom graph layouts
        ├── bookmarks/          # Saved topic bookmarks
        └── common/             # Shared utilities
```

---

## 🔒 Authentication Flow (Clerk + Django DRF)

1. **Frontend Auth**: User authenticates via Clerk (`<SignIn />` or `<SignUp />`).
2. **Token Extraction**: `frontend/services/api.ts` extracts Clerk Session JWT.
3. **Request Header**: Attaches `Authorization: Bearer <clerk_token>` header to API requests.
4. **Backend Verification**: Django middleware `users/authentication.py` verifies Clerk JWT signatures and maps the session to the user's `UserProfile` model without local password storage.
