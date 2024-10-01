# 智慧型空氣品質監測系統 v2 (前端)

## [系統後端](https://github.com/Wuchieh/IntelligentAirQualityMonitoringSystem)

[English](README.md) | 繁體中文

<a href="https://github.com/wuchieh"><img src="public/Logo/Ico/LogoWhile.ico" alt="wuchieh" style="height: 100px;"></a>
&emsp;
<a href="https://github.com/MeowXiaoXiang"><img src="https://github.com/MeowXiaoXiang.png" alt="MeowXiaoXiang" style="height: 100px;"></a>

## 作者
- [Wuchieh](https://github.com/wuchieh)
- [MeowXiaoXiang](https://github.com/MeowXiaoXiang)

## 技術棧
- Bootstrap v5.2.3
- Google Maps JavaScript API
- Vue.js v3
- Vue Router
- Vue I18n
- Axios

## 需求
- Web 瀏覽器

## 功能
- 在地圖上標示監測站的位置
- 顯示監測站的空氣品質資料
- 可以更改語言（繁體中文、英文）
- 身分驗證
- 顯示使用者的設定內容

## 安裝

### 先決條件
- 安裝 [Node.js](https://nodejs.org/)（版本 14 或更高）

### 步驟
1. 在命令列工具中移動到專案的目錄。
2. 啟用 Corepack：
   ```sh
   corepack enable
   ```
3. 準備並啟用特定版本的 Yarn：
   ```sh
   corepack prepare yarn@3.6.0 --activate
   ```
4. 安裝必要的套件：
   ```sh
   yarn install
   ```
5. 啟動前端網站預覽模式：
   ```sh
   yarn dev
   ```

### 解釋
- `corepack enable`：啟用 Corepack，這是一個管理包管理器（如 Yarn）的工具。
- `corepack prepare yarn@3.6.0 --activate`：準備並啟用 Yarn 版本 3.6.0。
- `yarn install`：安裝 `package.json` 文件中列出的所有依賴項。
- `yarn dev`：啟動前端應用程式的開發伺服器。

## 畫面預覽
![indexAnnouncements_tw.png](imgs/indexAnnouncements_tw.png)
![Login_tw.png](imgs/Login_tw.png)