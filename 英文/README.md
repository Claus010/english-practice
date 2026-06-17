# 每日英文訓練器

這是一個可以用 GitHub Pages 發布的靜態英文練習網頁。

## 手機使用方式

1. 把這個資料夾的檔案上傳到 GitHub repository。
2. 到 GitHub repository 的 `Settings`。
3. 左側選 `Pages`。
4. `Build and deployment` 選：
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. 按 `Save`。
6. 等 1-3 分鐘後，GitHub 會產生一個網址，例如：

```text
https://你的帳號.github.io/你的 repository 名稱/
```

手機打開這個網址就可以練習。

## 注意

目前進度儲存在瀏覽器 localStorage：

- 同一支手機同一個瀏覽器會保留進度。
- 換手機、換瀏覽器、清除瀏覽資料後，進度不會同步。
- 若要跨裝置同步，需要之後再加雲端資料庫。
