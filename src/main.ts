import { sub } from './sub.ts';

export const main = (val: string, callback: (val: string) => string) => {
  console.log(callback(val));
};

main('Hello World', sub);
