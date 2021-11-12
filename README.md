# It is my first project for Deno

Deno で簡単な開発環境を作ってみたのでその感想

## Issues

気づきとかそこら辺

### deps.ts の export が汚い

-   VSCode で関数名での補完を効かせるために `export * from 'https://...';` としているため、import 側の from が総じて deps.ts になってしまう
    -   `import { assertEquals, spy } from './deps.ts';`

### VSCode 的には今の所 import_map.json があんまり役に立たない

-   設定項目自体はあるが自動インポートには対応しておらず、あまり意味がない

### ネストされた関数を spy できない

-   Node.js + ts-jest + jest の組み合わせであれば以下のコードのように入れ子になった関数を spy できるが、Deno では出来ない
    -   Deno で同じことをする場合はコールバックとして注入する必要がある
    -   但しこれは esbuild や swc でも同じ問題があり、ESM の仕様上どうしようもない
        -   一般的なテストランナー視点で見れば関数をすり替えられる jest の動きが独特とも言える（普通は DI するので）

#### index.ts

<!--prettier-ignore-->
```ts
export const child = () => {
  console.log('Hello World!');
};

export const callChild = () => {
  child();
};
```

#### index.spec.ts

<!--prettier-ignore-->
```ts
import * as index from '.';

describe('index', () => {
  it('called', () => {
    const spiedChild = jest.spyOn(index, 'child');
    index.callChild();

    expect(spiedChild).toHaveBeenCalled();
  });
});
```

### Lint 設定が ESLint と比べて少ない

-   公式の [Issue](https://github.com/denoland/deno_lint/issues/906) にも挙がっているが、ESLint に比べて設定が少ない
    -   `@typescript-eslint` のようなプラグイン設定を追加する方法もなさそう

### 結局 package.json の概念から逃れることは出来ない

-   import_map.json や deps.ts の概念を考えると結局必要だよなとは思う
    -   composer.json や packages.config の存在を考えても妥当
-   一々 `deno run [...options] foo.ts` とするのも疲れるのでタスクランナーも結局必要
    -   [velociraptor](https://velociraptor.run/) が Git Hooks も噛ませられて便利そう
-   `node_modules/` がなくなったのはいいことだと思う
