import { assertEquals, spy } from './deps.ts';
import { main } from './main.ts';

Deno.test('main', () => {
  const spiedCb = spy();
  main('Hello', spiedCb);
  assertEquals(spiedCb.calls, [{ args: ['Hello'] }]);
});
