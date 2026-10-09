# yai.to

掛山夜糸（[@yaito3014](https://github.com/yaito3014)）の個人サイト。Nuxt 4 で作られ、GitHub Pages で公開しています。

## 構成

- `app/pages/index.vue` — トップページ（プロフィール、主なプロジェクト、最近の記事、リンク）
- `app/pages/projects.vue` — GitHub の公開リポジトリ一覧（言語で絞り込み・並べ替え）
- `app/pages/writing.vue` — Zenn の記事と本の一覧
- `server/api/repos.get.ts` / `server/api/zenn.get.ts` — ビルド時に GitHub API と Zenn のフィードを取得
- `app/assets/css/main.css` — デザイントークンとスタイル（ライト / ダーク対応）
- `public/yaitoPages/abeHiroshi/` — 旧ホームページ（静的 HTML）

プロジェクトと記事の一覧は `nuxt build` 時に外部 API から取得し、静的 HTML に焼き込まれます。
内容を更新するには再ビルド（main への push）が必要です。

## 開発

```bash
npm install
npm run dev        # http://localhost:3000
```

GitHub API のレート制限を避けたい場合は、環境変数 `NUXT_GITHUB_TOKEN` にトークンを設定してください。

## ビルドとデプロイ

```bash
npx nuxt build --preset github-pages   # dist/ に静的ファイルを出力
```

main ブランチへの push で `.github/workflows/deploy.yml` が実行され、`gh-pages` ブランチへデプロイされます。
Pull Request を開くと `deploy-preview.yml` が `/pr-<番号>/` 以下にプレビューを配置します。
