# デプロイ前チェック

## 初回コミット・デプロイ前に必ず実行

1. `npx vercel whoami` でVercelのログインアカウントを確認する
2. `git config user.name` と `git config user.email` を確認する
3. `vercel.json` が存在し、`"framework": "nextjs"` が設定されているか確認する
4. ユーザーに以下を提示して「これで正しいですか？」と確認する
   - Vercelアカウント: 〇〇
   - Gitの作者: 〇〇
   - フレームワーク設定: 〇〇
5. 正しくない場合はユーザーの指示に従って設定を変更する

## デプロイ

- デプロイは `npx vercel --prod` で手動実行する
- GitHub連携による自動デプロイは使用しない
