# AlgoVerse Architecture Guide

## 💡 Architectural Philosophy

AlgoVerse is designed around **uncompromising clean separation**, **future-proof extensibility**, and **pure state-driven simulation generation**.

---

## 🏗️ Pure Simulation Engine Design (`SimulationStep[]`)

### Core Concept
Traditional visualization platforms directly manipulate DOM element styles, timers, or React component states inside loop iterations. This causes race conditions, un-syncable playback controls, and untestable code.

AlgoVerse solves this by enforcing a **Pure Step Generator Pattern**:

```
[Graph Canvas Input] ──► [generateDijkstraSteps()] ──► [SimulationStep[] Array] ──► [React UI Rendering]
```

### `SimulationStep` Structure
Every simulation step is an immutable, serializable snapshot:

```typescript
export interface SimulationStep {
  stepNumber: number;
  action: string;

  highlights: {
    nodes?: string[];
    edges?: string[];
    indices?: number[];
    cells?: { row: number; col: number }[];
    pointers?: Record<string, number>;
  };

  state: Record<string, unknown>;

  explanation: {
    title: string;
    description: string;
    reason: string;
  };

  highlightedPseudocodeLine: number;

  animationType: "fade" | "pulse" | "glow" | "bounce";
}
```

Each algorithm populates `state` and `highlights` with only the domain data it needs:
- **Dijkstra / Graph**: `distances`, `priorityQueue`, `previousNodes`
- **Sorting**: `array`, `comparisonCount`, `swapCount`
- **Tree**: `traversalOrder`, `activeValue`
- **DP**: `grid`, `activeCell`, `dependencyCells`
- **Hashing**: `table`, `hashSize`, `calculatedIndex`

### Adding Future Algorithms
To add new algorithms (e.g., BFS, DFS, Prim's, Kruskal's, Bellman-Ford, Sorting, OS Scheduling):
1. Write a pure generator function `generateBFSSteps(...)` returning `SimulationStep[]`.
2. Pass the resulting array into `useSimulationStore`.
3. **Zero changes** are required to the React flow rendering engine or playback control components!

---

## 📁 Directory Structure & Purpose

```
algoverse/
├── frontend/
│   ├── app/                    # Next.js 15 App Router pages & layouts
│   ├── components/
│   │   ├── layout/             # Header & Navigation components
│   │   ├── graph/              # React Flow Canvas, Custom Nodes & Edge Weight Editor
│   │   ├── simulation/         # Simulation Controls, Theory Panel, Pseudocode & Distance Table
│   │   ├── dashboard/          # Welcome Card, Stat Cards, Progress Bar & Activity Feed
│   │   └── quiz/               # Interactive MCQ & Step Prediction Card
│   ├── hooks/                  # React custom hooks
│   ├── services/               # Reusable Axios API services
│   ├── store/                  # Zustand stores (useGraphStore, useSimulationStore, useUserStore)
│   ├── types/                  # TypeScript domain type declarations
│   └── utils/                  # Pure algorithm engines (dijkstraEngine.ts)
└── backend/
    ├── config/                 # Django settings, URLs, WSGI/ASGI apps
    └── apps/
        ├── users/              # Clerk JWT verification backend & user sync
        ├── progress/           # Progress tracking & achievement models
        ├── algorithms/         # Algorithm definitions & complexities
        ├── graphs/             # Saved custom graph layouts
        ├── quiz/               # Quiz questions & results submission
        ├── bookmarks/          # Saved topic bookmarks
        └── common/             # Shared utilities
```

---

## 🔒 Authentication Flow (Clerk + Django DRF)

1. **Frontend Auth**: User authenticates via Clerk (`<SignIn />` or `<SignUp />`).
2. **Token Extraction**: `frontend/services/api.ts` extracts Clerk Session JWT.
3. **Request Header**: Attaches `Authorization: Bearer <clerk_token>` header to API requests.
4. **Backend Verification**: Django middleware `users/authentication.py` verifies Clerk JWT signatures and maps the session to the user's `UserProfile` model without local password storage.
