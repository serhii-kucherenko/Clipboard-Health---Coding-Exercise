import crypto from "crypto";

export const DEFAULT_PARTITION_KEY = "0";
export const MAX_PARTITION_KEY_LENGTH = 256;

export function deterministicPartitionKey(event) {
  if (!event || typeof event !== 'object') {
    return DEFAULT_PARTITION_KEY;
  };

  const partitionKey = getPartitionKey(event);
  const stringifiedCandidate = stringifyCandidate(partitionKey);
  const candidate = truncateCandidate(stringifiedCandidate);
  
  return candidate || DEFAULT_PARTITION_KEY;
}

function getPartitionKey(event) {
  if (event?.partitionKey) {
    return event.partitionKey;
  }

  const data = JSON.stringify(event);
  const hash = crypto.createHash("sha3-512").update(data).digest("hex");

  return hash;
}

function stringifyCandidate(candidate) {
  return typeof candidate === "string" ? candidate : JSON.stringify(candidate);
}

function truncateCandidate(candidate) {
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  
  return candidate;
}