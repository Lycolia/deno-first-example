import { assertEquals } from './deps.ts';
import { sub } from './sub.ts';

Deno.test('sub', () => {
  const result = sub('Hello');
  assertEquals(result, '<<Hello>>');
});
