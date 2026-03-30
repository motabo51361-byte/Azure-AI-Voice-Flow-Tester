# Azure AI Voice Flow Tester

Static web app for testing this browser-side pipeline:

1. Hold a button to record audio
2. Send audio to Azure Speech-to-Text
3. Send transcript to Azure Translator
4. Send translated text to Azure Text-to-Speech
5. Save recording plus results into browser history

## Features

- Custom STT, Translator, and TTS endpoints
- Translator `from`, `to`, and optional Custom Translator `category`
- On-screen transcript and translated text
- Voice list loader for TTS voices
- Local history with recordings, transcript, translation, and metadata
- Responsive layout for desktop and mobile browsers
- Static hosting friendly for Azure Blob Static Website or GitHub Pages

## Files

- `index.html`: UI structure
- `styles.css`: responsive layout and styling
- `app.js`: recording, API calls, and IndexedDB history

## Local Run

Microphone permission usually requires HTTPS or `localhost`, so use a local static server:

```powershell
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Deploy

### Azure Blob Static Website

1. Create or open a Storage Account in Azure Portal
2. Open `Static website`
3. Set `Static website` to `Enabled`
4. Set `Index document name` to `index.html`
5. Set `Error document path` to `index.html` for now
6. Save
7. Azure will create a `$web` container and show the primary website endpoint

Official docs:

- [Host a static website in Azure Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website-how-to?tabs=azure-portal)
- [Use GitHub Actions to deploy a static site to Azure Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-static-site-github-actions)

### Azure Blob Static Website With GitHub Actions

This repository now includes [.github/workflows/deploy-azure-blob.yml](./.github/workflows/deploy-azure-blob.yml).

To turn it on:

1. Create a Microsoft Entra app registration for GitHub Actions access
2. Add a federated credential for your GitHub repository and branch
3. Grant that app at least `Storage Blob Data Contributor` on the target storage account
4. In GitHub repository `Settings > Secrets and variables > Actions`, add these secrets:
   - `AZURE_CLIENT_ID`
   - `AZURE_TENANT_ID`
   - `AZURE_SUBSCRIPTION_ID`
5. In GitHub repository `Settings > Secrets and variables > Actions > Variables`, add:
   - `AZURE_STORAGE_ACCOUNT`
6. Push to `main`

The Azure workflow will upload these files into the `$web` container:

- `index.html`
- `app.js`
- `styles.css`
- `app-icon.png`
- `.nojekyll` if present
- `404.html` if present

After the first successful run, open the static website endpoint shown in Azure Portal.

### GitHub Pages

This project is ready for GitHub Pages with the included workflow:

1. Create or choose a GitHub repository
2. Upload this whole folder to that repository
3. Make sure the default branch is `main`
4. In GitHub repository settings, open `Pages`
5. Set `Build and deployment` source to `GitHub Actions`
6. Push to `main`, then wait for the `Deploy Static Site To GitHub Pages` workflow to finish

Your site URL will usually be:

```text
https://<github-username>.github.io/<repository-name>/
```

Important notes for this app:

- GitHub Pages is a static host, so this browser app can run there without a backend server.
- Browser microphone permission is much more reliable on `https://` than on local `file://` pages.
- Azure keys are still stored in the browser for testing, so publish only to audiences you are comfortable with.

## Notes

- This app calls Azure REST APIs directly from the browser, so subscription keys live in the browser session. That is acceptable for internal testing, but not for a public production app.
- Browser compatibility, accepted audio formats, and CORS behavior still depend on your Azure resource configuration and the target browser.
- History is stored only in the current browser using IndexedDB.

## References

- [Speech to text REST API](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/rest-speech-to-text)
- [Fast transcription API](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/fast-transcription-create)
- [Text to speech REST API](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/rest-text-to-speech)
- [Translator Translate REST API](https://learn.microsoft.com/en-us/rest/api/translator/translator/translate?view=rest-translator-v3.0)
