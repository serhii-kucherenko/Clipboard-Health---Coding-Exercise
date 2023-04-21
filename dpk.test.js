import { deterministicPartitionKey, DEFAULT_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH } from "./dpk";
import crypto from "crypto";

describe('deterministicPartitionKey', () => {
  const event1 = {foo: 'bar', partitionKey: 'abc123'};
  const event2 = {foo: 'bar'};

  test('returns default partition key when event is falsy', () => {
    expect(deterministicPartitionKey(null)).toEqual(DEFAULT_PARTITION_KEY);
    expect(deterministicPartitionKey(undefined)).toEqual(DEFAULT_PARTITION_KEY);
    expect(deterministicPartitionKey(false)).toEqual(DEFAULT_PARTITION_KEY);
  });

  test('returns default partition key when event is not an object', () => {
    expect(deterministicPartitionKey(1)).toEqual(DEFAULT_PARTITION_KEY);
    expect(deterministicPartitionKey('event')).toEqual(DEFAULT_PARTITION_KEY);
  });

  test('should return partition key if it exists in the event object', () => {
    expect(deterministicPartitionKey(event1)).toBe(event1.partitionKey);
  });

  test('generates partition key if it does not exist', () => {
    const hash = crypto.createHash("sha3-512").update(JSON.stringify(event2)).digest("hex");
    expect(deterministicPartitionKey(event2)).toBe(hash);
  });

  test('truncates partition key if it is too long', () => {
    const longString = 'a'.repeat(MAX_PARTITION_KEY_LENGTH + 1);
    const hash = crypto.createHash("sha3-512").update(longString).digest("hex");
    expect(deterministicPartitionKey({foo: 'bar', partitionKey: longString})).toBe(hash);
  });
  

});
