import { SimulationStep } from '@/types';
import { Activity, FractionalItem } from './types';

export function generateActivitySelectionSteps(initialActivities: Activity[]): SimulationStep[] {
  const steps: SimulationStep[] = [];
  // Sort activities by finish time
  const activities = [...initialActivities].sort((a, b) => a.finish - b.finish);
  let stepCount = 1;

  const selectedIds: string[] = [];
  const rejectedIds: string[] = [];

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: {
      activities: activities.map((a) => ({ ...a })),
      selectedCount: 0,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Activity Selection Initialized",
    explanationDescription: `Sorted ${activities.length} activities by earliest finish time ascending.`,
    explanationReason: "Greedy choice rule: Selecting earliest finishing activities leaves maximum time for remaining tasks.",
    highlightedPseudocodeLine: 2,
    animationType: 'pulse',
  });

  // Always select first activity
  const first = activities[0];
  selectedIds.push(first.id);
  let lastFinish = first.finish;

  steps.push({
    stepNumber: stepCount++,
    action: 'SELECT_NODE',
    highlightedNodeId: first.id,
    visitedNodes: [...selectedIds],
    distances: {
      activities: activities.map((a) => ({
        ...a,
        isSelected: selectedIds.includes(a.id),
      })),
      selectedCount: selectedIds.length,
      lastFinish,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: `Selected Activity '${first.name}'`,
    explanationDescription: `Selected earliest finishing activity (start: ${first.start}, finish: ${first.finish}).`,
    explanationReason: "Earliest finish time leaves optimal remaining timeline.",
    highlightedPseudocodeLine: 3,
    animationType: 'bounce',
  });

  for (let i = 1; i < activities.length; i++) {
    const act = activities[i];
    const isCompatible = act.start >= lastFinish;

    if (isCompatible) {
      selectedIds.push(act.id);
      lastFinish = act.finish;

      steps.push({
        stepNumber: stepCount++,
        action: 'UPDATE_DISTANCE',
        highlightedNodeId: act.id,
        visitedNodes: [...selectedIds],
        distances: {
          activities: activities.map((a) => ({
            ...a,
            isSelected: selectedIds.includes(a.id),
            isRejected: rejectedIds.includes(a.id),
          })),
          selectedCount: selectedIds.length,
          lastFinish,
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Accepted Activity '${act.name}'`,
        explanationDescription: `Start time (${act.start}) >= previous finish time (${lastFinish}). Activity accepted!`,
        explanationReason: "Greedy choice: Compatible start time with earliest finish.",
        highlightedPseudocodeLine: 6,
        animationType: 'bounce',
      });
    } else {
      rejectedIds.push(act.id);

      steps.push({
        stepNumber: stepCount++,
        action: 'EXAMINE_NEIGHBOR',
        highlightedNodeId: act.id,
        visitedNodes: [...selectedIds],
        distances: {
          activities: activities.map((a) => ({
            ...a,
            isSelected: selectedIds.includes(a.id),
            isRejected: rejectedIds.includes(a.id),
          })),
          selectedCount: selectedIds.length,
          lastFinish,
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Rejected Activity '${act.name}'`,
        explanationDescription: `Start time (${act.start}) < previous finish time (${lastFinish}). Conflict detected!`,
        explanationReason: "Incompatible with currently active schedule.",
        highlightedPseudocodeLine: 5,
        animationType: 'fade',
      });
    }
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [...selectedIds],
    distances: {
      activities: activities.map((a) => ({
        ...a,
        isSelected: selectedIds.includes(a.id),
        isRejected: rejectedIds.includes(a.id),
      })),
      selectedCount: selectedIds.length,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Activity Selection Complete",
    explanationDescription: `Selected ${selectedIds.length} maximum non-overlapping activities.`,
    explanationReason: "All activities processed.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}

export function generateFractionalKnapsackSteps(
  initialItems: Omit<FractionalItem, 'ratio'>[],
  capacity: number
): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const items: FractionalItem[] = initialItems
    .map((item) => ({ ...item, ratio: Number((item.value / item.weight).toFixed(2)) }))
    .sort((a, b) => b.ratio - a.ratio);

  let stepCount = 1;
  let currentWeight = 0;
  let totalValue = 0;

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: {
      items: items.map((it) => ({ ...it })),
      currentWeight,
      totalValue,
      capacity,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Fractional Knapsack Initialized",
    explanationDescription: `Sorted items by Value/Weight ratio descending. Knapsack Capacity = ${capacity}.`,
    explanationReason: "Greedy choice: Items with highest value density per unit weight are prioritized.",
    highlightedPseudocodeLine: 2,
    animationType: 'pulse',
  });

  for (const item of items) {
    if (currentWeight >= capacity) break;

    const remainingCap = capacity - currentWeight;

    if (item.weight <= remainingCap) {
      currentWeight += item.weight;
      totalValue += item.value;
      item.takenFraction = 1;

      steps.push({
        stepNumber: stepCount++,
        action: 'UPDATE_DISTANCE',
        highlightedNodeId: item.id,
        visitedNodes: [],
        distances: {
          items: items.map((it) => ({ ...it })),
          currentWeight,
          totalValue,
          capacity,
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Took 100% of Item '${item.name}'`,
        explanationDescription: `Added item (w:${item.weight}, v:${item.value}, ratio:${item.ratio}). Total Weight = ${currentWeight}/${capacity}, Total Value = ${totalValue}.`,
        explanationReason: "Entire item fits into remaining capacity.",
        highlightedPseudocodeLine: 5,
        animationType: 'bounce',
      });
    } else {
      const fraction = Number((remainingCap / item.weight).toFixed(2));
      const addedValue = Number((fraction * item.value).toFixed(2));
      currentWeight += remainingCap;
      totalValue += addedValue;
      item.takenFraction = fraction;

      steps.push({
        stepNumber: stepCount++,
        action: 'UPDATE_DISTANCE',
        highlightedNodeId: item.id,
        visitedNodes: [],
        distances: {
          items: items.map((it) => ({ ...it })),
          currentWeight,
          totalValue,
          capacity,
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Took ${(fraction * 100).toFixed(0)}% Fraction of Item '${item.name}'`,
        explanationDescription: `Knapsack full! Took ${remainingCap}/${item.weight} fraction yielding +${addedValue} value. Total Value = ${totalValue}.`,
        explanationReason: "Greedy fraction takes exact remaining space to maximize total profit.",
        highlightedPseudocodeLine: 6,
        animationType: 'bounce',
      });
      break;
    }
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: {
      items: items.map((it) => ({ ...it })),
      currentWeight,
      totalValue,
      capacity,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Fractional Knapsack Complete",
    explanationDescription: `Maximum achievable value is ${totalValue.toFixed(2)} with knapsack weight ${currentWeight}/${capacity}.`,
    explanationReason: "Optimal fractional solution achieved.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}
