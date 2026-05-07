# Azure AI Voice Flow Tester

`Azure AI Voice Flow Tester` 是一個可部署在 `GitHub Pages` 或 `Azure Blob Static Website` 的靜態網站，用來測試下列 Azure AI 語音流程：

1. `Speech-to-Text`
2. `Translator`
3. `Text-to-Speech`

網站所有功能都在瀏覽器端執行，適合做 Azure AI Services 的功能驗證、模型比對、語音流程測試與 Demo 展示。

## 功能概覽

- 支援 `Speech-to-Text -> Translator -> Text-to-Speech` 完整流程
- 支援僅測試 `Translator + Text-to-Speech` 的文字輸入模式
- 支援自訂 `STT / Translator / TTS` Endpoint 與 Key
- 支援 `Custom Speech`
- 支援 `Custom Translator`
- 支援 `Profile 1 / Profile 2` 雙設定檔切換
- 支援多種 UI Skin
- 支援 `History` 歷程紀錄、錄音保存、TTS 音訊保存
- 支援 `API Respond Time` 趨勢圖與效能檢視
- 支援桌機與手機瀏覽器

## 使用模式

本網站目前有 2 種模式，可從右上角工具列直接切換：

### 1. Full Voice Flow

此模式會執行完整語音流程：

1. 按住 `Hold To Record`
2. 錄音送到 `Speech-to-Text`
3. STT 結果送到 `Translator`
4. 翻譯結果送到 `Text-to-Speech`
5. 播放 TTS 音訊
6. 將錄音、文字、API 資訊與耗時寫入 `History`

### 2. Text Input Flow

此模式不使用麥克風，也不使用 `Speech-to-Text`。

使用方式：

1. 在 `Source Text` 輸入文字
2. 按下 `Translate & Speak`
3. 文字送到 `Translator`
4. 翻譯結果送到 `Text-to-Speech`
5. 播放 TTS 音訊
6. 將文字、翻譯、API 資訊與耗時寫入 `History`

在此模式下，所有和 `Speech-to-Text` 相關的區塊都會自動隱藏，例如：

- `Hold To Record`
- 麥克風授權提示
- `Speech-to-Text` 設定欄位
- `Custom Speech`
- STT 結果卡片
- STT 效能指標
- History 中的錄音與 STT API 紀錄

## 介面操作說明

### 右上角工具列

右上角提供快速切換功能：

- `齒輪`：打開 `Service Settings`
- `Profile 1 / Profile 2`：切換不同設定檔
- `Full / Text`：切換網站模式
- `Custom Speech / Custom Translator`：快速啟用或停用自訂功能

### 左上角工具列

- `書本圖示`：打開 `History`

## Service Settings 說明

### Profile

- 每個 Profile 都會各自保存：
  - Mode
  - Skin
  - STT 設定
  - Translator 設定
  - TTS 設定
- 可為不同測試情境建立不同設定，例如：
  - `Profile 1`：一般 Azure Translator
  - `Profile 2`：Custom Translator / Custom Speech

### Speech-to-Text

僅在 `Full Voice Flow` 模式下使用。

可設定：

- `STT Endpoint`
- `Speech Key`
- `Locale`
- `Use Custom Speech`
- `Custom Endpoint ID`

說明：

- `Locale` 是辨識語言，例如：
  - `ja-JP`
  - `en-US`
  - `zh-TW`
- 若啟用 `Use Custom Speech`，需填入已部署的 `Custom Endpoint ID`

### Translator

可設定：

- `Translator Endpoint`
- `Translator Key`
- `Translator Region`
- `Use Custom Translator`
- `Category ID`
- `From`
- `To`

說明：

- `From`：來源語言代碼
- `To`：目標語言代碼
- 若啟用 `Use Custom Translator`，需填入 `Category ID`
- 常見語言代碼例如：
  - `ja`
  - `en`
  - `zh-Hant`
  - `zh-Hans`

### Text-to-Speech

可設定：

- `TTS Endpoint`
- `TTS Key`
- `Voice Locale`
- `Voice Name`
- `Output Format`
- `Rate`

說明：

- `Voice Locale` 例如：
  - `en-US`
  - `ja-JP`
  - `zh-TW`
- `Voice Name` 例如：
  - `en-US-AvaNeural`
  - `ja-JP-NanamiNeural`
  - `zh-TW-HsiaoChenNeural`

## 實際操作流程

### A. 測試完整語音流程

1. 右上角切到 `Full`
2. 打開 `Service Settings`
3. 填入：
   - STT Endpoint / Key / Locale
   - Translator Endpoint / Key / Region / From / To
   - TTS Endpoint / Key / Voice / Output Format
4. 如果要測試自訂模型：
   - 打開 `Custom Speech`
   - 或打開 `Custom Translator`
5. 按 `Enable Microphone`
6. 允許瀏覽器使用麥克風
7. 按住 `Hold To Record` 說話
8. 放開按鈕後，系統會自動執行：
   - STT
   - Translation
   - TTS
9. 在畫面上查看：
   - STT 結果
   - Translation 結果
   - TTS Audio
   - API 回應時間

### B. 測試 Translator + TTS

1. 右上角切到 `Text`
2. 打開 `Service Settings`
3. 填入：
   - Translator Endpoint / Key / Region / From / To
   - TTS Endpoint / Key / Voice / Output Format
4. 如需 Custom Translator，可打開 `Custom Translator`
5. 在 `Source Text` 輸入文字
6. 按 `Translate & Speak`
7. 查看：
   - Translation 結果
   - TTS Audio
   - API 回應時間

## History 說明

`History` 會保存最近 `50` 筆紀錄。

內容包含：

- Profile 名稱
- 執行時間
- 輸入內容 / STT 結果
- 翻譯結果
- API 耗時
- API 呼叫資訊
- 錄音檔（僅 Full 模式）
- TTS 音訊

補充：

- 每頁顯示 `5` 筆
- 可使用 `First / Previous / Next` 翻頁
- `Clear All` 會同時清掉：
  - `API Call History`
  - `API Respond Time`

## API Respond Time 說明

圖表可切換查看：

- `Total`
- `STT`
- `Translation`
- `TTS`

補充：

- `Text Input Flow` 模式下，STT 相關視圖會隱藏
- 點圖表上的資料點，可自動跳到對應的 History 紀錄

## Skin 說明

目前支援的主題：

- `Battlefield Camo`
- `Miku Style`
- `Spring Sakura`
- `Black Metal HiFi`
- `Silver Metal HiFi`
- `Dark Eye Care`
- `Light Fresh`

每個 Profile 可以各自保存自己的 Skin。

## 本機執行方式

建議不要直接用 `file://` 開啟，因為瀏覽器對麥克風權限與 module/script 的處理可能不一致。

可使用簡單靜態伺服器：

```powershell
python -m http.server 8080
```

然後打開：

```text
http://localhost:8080
```

## 部署方式

### GitHub Pages

本專案已內建 GitHub Pages workflow。

部署後網址通常為：

```text
https://<github-username>.github.io/<repository-name>/
```

### Azure Blob Static Website

本專案也已內建 Azure Blob Static Website 的 GitHub Actions workflow。

只要 Azure 與 GitHub Secrets 設定完成，推到 `main` 就會自動部署到 Azure `$web` container。

## 注意事項

- 本網站會直接在瀏覽器呼叫 Azure API，因此 Key 會存在瀏覽器端
- 這種方式適合：
  - 內部測試
  - PoC
  - Demo
- 不建議直接作為公開正式產品前端

另外：

- 麥克風授權在 `https://` 或 `localhost` 上會比較穩定
- `Samsung Internet` 等瀏覽器對震動或音效支援可能與 Chrome 不同
- History 資料儲存在目前瀏覽器的 `IndexedDB`

## 參考文件

- [Speech to text REST API](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/rest-speech-to-text)
- [Custom Speech deployment](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-custom-speech-deploy-model)
- [Translator Translate REST API](https://learn.microsoft.com/en-us/rest/api/translator/translator/translate?view=rest-translator-v3.0)
- [Translator language reference](https://learn.microsoft.com/en-us/azure/ai-services/translator/reference/v3-0-languages)
- [Text to speech REST API](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/rest-text-to-speech)
- [Host a static website in Azure Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website-how-to?tabs=azure-portal)
