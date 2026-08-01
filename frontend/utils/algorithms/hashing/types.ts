/**
 * Hashing Algorithms Type Definitions
 */

export interface HashBucket {
  index: number;
  items: number[];
}

export interface HashStateExtra {
  table: HashBucket[];
  hashSize: number;
  insertedKey?: number;
  calculatedIndex?: number;
  isCollision?: boolean;
  probingStep?: number;
}
