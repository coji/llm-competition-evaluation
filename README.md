# llm-competition-evaluation

サマースクール大規模言語モデルの提出データを自己評価するためのスクリプトです。
コンペのレギュレーションに従うため、提出データや正解データ自体は含まれておらず、ご自身で作成する必要があります。

typescript で書いた評価コードの ランタイムとして bun を使っています。そのため Mac でだけで動作確認していますが、Windows での deno や nodejs などでも動作はすると思います。

## 必要なもの

1. bun (javascript ランタイム)
2. 自身で作成する正解データ JSON ファイル
3. 評価する対象の submission.json ファイル

## 準備

### 1. bun のインストール

```
$ curl -fsSL https://bun.sh/install | bash
```

### 2. 自身で作成する正解データ JSON ファイル

`data/correct_data.json` に正解データを格納する必要があります。
`data/correct_data_example.json` を参考に、各自作成してください。

```correct_data_example.json
[
  {
    "id": 0,
    "task_type": "multiple_choice",
    "text": "問題1",
    "choices": [
      {
        "choice_id": 1,
        "text": "回答1"
      },
      {
        "choice_id": 2,
        "text": "回答2"
      },
      {
        "choice_id": 3,
        "text": "回答3"
      },
      {
        "choice_id": 4,
        "text": "回答4"
      },
      {
        "choice_id": 5,
        "text": "回答5"
      }
    ],
    "answer": 1
  },
  {
    "id": 100,
    "task_type": "summarization",
    "text": "問題100",
    "summary": "正解のサマリ"
  }
]
```

### 3. 評価する対象の submission.json ファイル

data/submissions などにコピーしておいてください。

## 評価の方法

### type1: multiple_choice

以下コマンドをターミナルで実行すると、type1 評価の不正解の回答と、総計が表示されます。

```bash
bun eval_type1.ts data/submissions/submission.json
```

```
ID: <問題ID>
  <問題>
  選択肢:1: <選択肢1>,2: <選択肢2>,3: <選択肢3>,4: <選択肢4>,5: <選択肢5>
  提出: 1. <選択肢1>
  正解: 2. <選択肢4>

...

Total: 100, Incorrect: 64
```

### type2: summarization

以下コマンドをターミナルで実行すると、type2 評価の各設問についての ROUGE-2 Score と、その合計が表示されます。

```bash
bun eval_type2.ts data/submissions/submission.json
```

```
ID: <問題ID>
  score: 0.041237113402061855
  answer : <提出した要約テキスト>
  correct: <正解の要約テキスト>

Total: 20, Score: 4.044292964896873
```

## 要約データの正解データについて

csebuetnlp/xlsum の japanese セットに含まれる可能性が高そうですが、確証はありません。
あくまでご自身の責任でご用意ください。
