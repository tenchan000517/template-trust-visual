# 実装ガイド

**このドキュメントは、実装工程を担当するエージェントが読むもの。**
**目的: 執筆済みコンテンツを受け取り、ファイル配置・画像生成・データ登録を行う。**

**大前提: オリジナルデザインは作らない。**
**設定は `docs/content-config.md` を参照すること。**

---

## このガイドの使い方

1. 執筆済みMarkdownテキストを受け取る
2. **content-config.md を読み、ファイル管理・画像生成ルールを確認する**
3. このガイドの手順に従って実装する
4. 新しいデザインを発明しない。ここにないパターンが必要な場合はユーザーに相談する

---

## 実装手順

### Step 1: Markdownファイルを配置

content-config.md の「ファイル管理 > 記事保存先」に指定されたパスに保存する。

```bash
# 例: src/content/blog/[slug].md として保存
```

### Step 2: データ定義ファイルにカード情報を追加

content-config.md の「ファイル管理 > データ定義」に指定されたファイルを更新する。

```typescript
{
  slug: '[slug]',
  title: '[タイトル]',
  desc: '[概要（カード表示用・50文字程度）]',
  tags: ['タグ1', 'タグ2'],
  image: '/img/[content_name]/[slug].png',
  category: '[カテゴリ]',
  available: true,
},
```

### Step 3: 画像を生成

content-config.md の「画像生成」セクションに従う。

**手順:**

1. tmpスクリプトを書く:

```python
# /mnt/c/Nanobanana/tmp_generate.py
import sys
sys.path.insert(0, r"C:\Nanobanana")
from generate_image_pro import generate_with_reference_pro

STYLE = "[content-config.mdのスタイル定数]"

PROMPT = (
    f"{STYLE} "
    "[ここに記事テーマに合った具体的な描写を英語で書く] "
    "No text, no words, no letters."
)

ANCHOR = r"[content-config.mdのアンカー画像パス]"
OUTPUT = r"[content-config.mdの画像出力先]\[slug].png"

generate_with_reference_pro(PROMPT, [ANCHOR], OUTPUT, aspect_ratio="3:2")
```

**アンカー画像ルール:**
- **1画像に対してアンカーは必ず1枚だけ。** 複数アンカーを同時に渡すとスタイルが不安定になる
- アンカー画像がない場合（初回）は `generate_image_pro`（参照なし版）で最初の1枚を生成し、それをアンカーにする

2. 出力先ディレクトリを確認:

```bash
mkdir -p [画像出力先]
```

3. 実行:

```bash
cmd.exe /c "cd /d C:\Nanobanana && C:\Nanobanana\venv\Scripts\python.exe tmp_generate.py"
```

4. 画像を目視確認（Read ツールで開く）

5. tmpスクリプトを削除:

```bash
rm /mnt/c/Nanobanana/tmp_generate.py
```

### Step 4: sitemap.ts を更新

動的にスラッグを読み込む設計であれば手動更新不要。
静的な場合は、新しいURLエントリーを追加する。

### Step 5: ai.txt を更新

`public/ai.txt` のコンテンツセクションに情報を追記:

```
### [slug] ([hub_url]/[slug])
- タイトル: [タイトル]
- カテゴリ: [カテゴリ]
- 概要: [excerpt]
```

### Step 6: llms.txt を更新

`public/llms.txt` にコンテンツ情報を追記。

### Step 7: インデックス登録手順書を更新

`docs/インデックス登録リクエスト手順書.md` が存在する場合、新しいURLを追記し合計件数を更新する。
存在しない場合はスキップ。

---

## データ登録チェックリスト

content-config.md の「実装時に更新するファイル一覧」と照合すること。

- [ ] Markdownファイル配置済み
- [ ] データ定義ファイル更新済み（available: true）
- [ ] サムネイル画像配置済み
- [ ] sitemap更新済み（動的なら不要）
- [ ] ai.txt 追記済み
- [ ] llms.txt 追記済み
- [ ] インデックス登録手順書 追記済み（ファイルがある場合）

---

## 禁止事項（厳守）

- **bounce アニメーション:** 使用禁止
- **同色の薄いテキスト:** `text-white/70` 等禁止（コントラスト不足）
- **絵文字アイコン:** 禁止（Lucideアイコン等を使う）
