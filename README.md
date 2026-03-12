# THEIAシームレス対応
## Electron Forge (Vite + Typescript) 環境構築手順

### 1.Node.jsのバージョンを確認する
```bash
$ node -v
$ npm -v
```

### 2.プロジェクトを作成する
下の"my-new-app"の部分には、プロジェクトの名前を入れてください。
```bash
$ npx create-electron-app@latest my-new-app --template=vite-typescript
```

### 3.起動するか確認する
デスクトップ上にウィンドウが出現してデフォルトの画面が表示されたら問題ありません。
問題ないことが確認出来たら、アプリを閉じてください。
```bash
$ npm start
```

### 3.必要なライブラリをインポートする
```bash
# typescriptの最新版をインストール
npm install typescript@latest

# React本体とReact DOMをインストール
npm install --save react react-dom

# TypeScript用の型定義をインストール
npm install --save-dev @types/react @types/react-dom
```

### 4.プロジェクト直下のtsconfig.jsonを以下のように書き換える
```json
{
  "compilerOptions": {
    "jsx":"react-jsx", //ここ追加
    "target": "ESNext",
    "module": "commonjs",
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "noImplicitAny": true,
    "sourceMap": true,
    "baseUrl": ".",
    "outDir": "dist",
    "moduleResolution": "node",
    "resolveJsonModule": true
  }
}
```

### 5.src直下にapp.tsxとindex.tsxファイルを作成し、それぞれ以下のように編集する
```jsx
// app.tsx
export default function App() {
  return (
    <div>
		Hello NAC!
    </div>
  );
}
```
```jsx
// index.tsx
import { createRoot } from 'react-dom/client';
import App from './app';

const root = createRoot(document.body);
root.render(
	<App />
);
```

### 6.src直下にあるrender.tsファイルを以下のように編集する※コメントの部分は省略します
```jsx
import './index.css';
import '.';

console.log(
  '👋 This message is being logged by "renderer.ts", included via Vite',
);
```

### 7.index.htmlファイルを以下のように編集する
```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World!</title>

  </head>
  <body>
    <!-- <h1>💖 Hello World!</h1>
    <p>Welcome to your Electron application.</p> -->
    <script type="module" src="/src/renderer.ts"></script>
  </body>
</html>
```

### 8.アプリを起動する
起動したアプリの画面に「Hello NAC!」と表示されていたら問題ありません。
```bash
$ npm start
```


### パッケージ化
```bash
$ npm run package
```