import { SimulationStep } from '@/types';
import { HashBucket } from './types';

export function generateHashTableSteps(
  keys: number[] = [12, 22, 32, 15, 25, 37],
  hashSize: number = 7
): SimulationStep[] {
  const steps: SimulationStep[] = [];
  let stepCount = 1;

  const table: HashBucket[] = Array.from({ length: hashSize }, (_, idx) => ({
    index: idx,
    items: [],
  }));

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: {
      table: JSON.parse(JSON.stringify(table)),
      hashSize,
      keys,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: `Hash Table Initialized (${hashSize} Buckets)`,
    explanationDescription: `Using Hash Function h(k) = k mod ${hashSize}. Resolving collisions via Separate Chaining.`,
    explanationReason: "O(1) average lookup time via direct bucket indexing.",
    highlightedPseudocodeLine: 2,
    animationType: 'pulse',
  });

  for (const key of keys) {
    const hashIdx = key % hashSize;
    const isCollision = table[hashIdx].items.length > 0;

    steps.push({
      stepNumber: stepCount++,
      action: isCollision ? 'EXAMINE_NEIGHBOR' : 'SELECT_NODE',
      visitedNodes: [],
      distances: {
        table: JSON.parse(JSON.stringify(table)),
        hashSize,
        insertedKey: key,
        calculatedIndex: hashIdx,
        isCollision,
      },
      previousNodes: {},
      priorityQueueState: [],
      explanationTitle: `Calculated Hash for Key ${key} ➔ h(${key}) = ${key} mod ${hashSize} = ${hashIdx}`,
      explanationDescription: isCollision
        ? `COLLISION DETECTED! Bucket ${hashIdx} already contains [${table[hashIdx].items.join(', ')}]. Appending ${key} to chain.`
        : `Bucket ${hashIdx} is empty. Inserting key ${key}.`,
      explanationReason: isCollision ? "Separate Chaining appends key to linked list at bucket index." : "Direct slot insertion.",
      highlightedPseudocodeLine: isCollision ? 4 : 6,
      animationType: isCollision ? 'bounce' : 'glow',
    });

    table[hashIdx].items.push(key);

    steps.push({
      stepNumber: stepCount++,
      action: 'UPDATE_DISTANCE',
      visitedNodes: [],
      distances: {
        table: JSON.parse(JSON.stringify(table)),
        hashSize,
        insertedKey: key,
        calculatedIndex: hashIdx,
      },
      previousNodes: {},
      priorityQueueState: [],
      explanationTitle: `Inserted Key ${key} into Bucket ${hashIdx}`,
      explanationDescription: `Bucket ${hashIdx} chain: [${table[hashIdx].items.join(' ➔ ')}].`,
      explanationReason: "Hash Table update complete.",
      highlightedPseudocodeLine: 6,
      animationType: 'bounce',
    });
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: {
      table: JSON.parse(JSON.stringify(table)),
      hashSize,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Hash Table Insertions Completed",
    explanationDescription: `All ${keys.length} keys stored in Hash Table.`,
    explanationReason: "All insertions finished.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}
