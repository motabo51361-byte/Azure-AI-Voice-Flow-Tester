const SETTINGS_KEY = "azure-ai-tester-settings-v2";
const UI_KEY = "azure-ai-tester-ui-v1";
const DB_NAME = "azure-ai-tester-db";
const DB_VERSION = 1;
const HISTORY_STORE = "history";
const MAX_LOG_LINES = 40;
const CUSTOM_OPTION = "__custom__";
const HISTORY_PAGE_SIZE = 5;
const HISTORY_MAX_ITEMS = 50;

const STT_LOCALES = ["zh-TW", "zh-CN", "ja-JP", "en-US", "en-GB", "ko-KR", "fr-FR", "de-DE", "es-ES"];
const TRANSLATOR_LANGUAGES = [
  { code: "ja", label: "Japanese" },
  { code: "en", label: "English" },
  { code: "zh-Hant", label: "Chinese Traditional" },
  { code: "zh-Hans", label: "Chinese Simplified" },
  { code: "ko", label: "Korean" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "es", label: "Spanish" },
];
const TRANSLATOR_REGIONS = [
  "global",
  "japaneast",
  "eastasia",
  "southeastasia",
  "koreacentral",
  "australiaeast",
  "centralindia",
  "eastus",
  "eastus2",
  "westus2",
  "canadacentral",
  "brazilsouth",
  "northeurope",
  "westeurope",
  "uksouth",
  "francecentral",
  "swedencentral",
];
const DEFAULT_VOICES = [
  { locale: "en-US", shortName: "en-US-AvaNeural", displayName: "Ava" },
  { locale: "en-US", shortName: "en-US-JennyNeural", displayName: "Jenny" },
  { locale: "ja-JP", shortName: "ja-JP-NanamiNeural", displayName: "Nanami" },
  { locale: "ja-JP", shortName: "ja-JP-KeitaNeural", displayName: "Keita" },
  { locale: "zh-TW", shortName: "zh-TW-HsiaoChenNeural", displayName: "HsiaoChen" },
  { locale: "zh-TW", shortName: "zh-TW-YunJheNeural", displayName: "YunJhe" },
  { locale: "zh-CN", shortName: "zh-CN-XiaoxiaoNeural", displayName: "Xiaoxiao" },
  { locale: "ko-KR", shortName: "ko-KR-SunHiNeural", displayName: "SunHi" },
];
const TTS_OUTPUT_FORMATS = [
  "audio-24khz-48kbitrate-mono-mp3",
  "audio-24khz-96kbitrate-mono-mp3",
  "audio-16khz-32kbitrate-mono-mp3",
  "riff-24khz-16bit-mono-pcm",
  "riff-16khz-16bit-mono-pcm",
  "webm-24khz-16bit-mono-opus",
  "ogg-24khz-16bit-mono-opus",
];
const DEFAULT_VOICE_LOCALES = [...new Set(DEFAULT_VOICES.map((voice) => voice.locale))].sort();
const DEFAULT_VOICE_NAMES = DEFAULT_VOICES.map((voice) => voice.shortName);

const defaultProfileSettings = {
  profileName: "Profile 1",
  theme: "silvermetal",
  sttEndpoint: "https://japaneast.stt.speech.microsoft.com",
  speechKey: "",
  sttLocale: "ja-JP",
  sttLocalePreset: "ja-JP",
  sttLocaleCustom: "",
  useCustomSpeech: false,
  customSpeechEndpointId: "",
  translatorEndpoint: "https://api.cognitive.microsofttranslator.com/",
  translatorKey: "",
  translatorRegion: "japaneast",
  translatorRegionPreset: "japaneast",
  translatorRegionCustom: "",
  useCustomTranslator: false,
  translatorCategory: "",
  translatorFromPreset: "ja",
  translatorFromCustom: "",
  translatorToPreset: "en",
  translatorToCustom: "",
  ttsEndpoint: "https://japaneast.tts.speech.microsoft.com",
  ttsKey: "",
  ttsLanguage: "en-US",
  ttsLanguagePreset: "en-US",
  ttsLanguageCustom: "",
  ttsVoice: "en-US-AvaNeural",
  ttsVoicePreset: "en-US-AvaNeural",
  ttsVoiceCustom: "",
  ttsFormat: "audio-24khz-48kbitrate-mono-mp3",
  ttsFormatPreset: "audio-24khz-48kbitrate-mono-mp3",
  ttsFormatCustom: "",
  ttsRate: "+0%",
};

const defaultProfiles = {
  activeProfileId: "profileA",
  profiles: {
    profileA: { ...defaultProfileSettings, profileName: "Profile 1" },
    profileB: {
      ...defaultProfileSettings,
      profileName: "Profile 2",
      sttLocale: "zh-TW",
      sttLocalePreset: "zh-TW",
      translatorFromPreset: "zh-Hant",
      translatorToPreset: "en",
      ttsLanguage: "en-US",
      ttsLanguagePreset: "en-US",
      ttsVoice: "en-US-AvaNeural",
      ttsVoicePreset: "en-US-AvaNeural",
    },
  },
};

const elements = {
  openHistoryFab: document.querySelector("#open-history-fab"),
  historyDrawer: document.querySelector("#history-drawer"),
  historyBackdrop: document.querySelector("#history-backdrop"),
  settingsForm: document.querySelector("#settings-form"),
  quickCustomSpeechBtn: document.querySelector("#quick-custom-speech-btn"),
  quickCustomTranslatorBtn: document.querySelector("#quick-custom-translator-btn"),
  openSettingsFab: document.querySelector("#open-settings-fab"),
  quickProfileTabs: Array.from(document.querySelectorAll(".profile-quick-tab")),
  toggleSettingsBtn: document.querySelector("#toggle-settings-btn"),
  settingsContent: document.querySelector("#settings-content"),
  settingsDrawer: document.querySelector("#settings-drawer"),
  settingsBackdrop: document.querySelector("#settings-backdrop"),
  themeSelect: document.querySelector("#theme-select"),
  profileName: document.querySelector("#profile-name"),
  profileTabs: Array.from(document.querySelectorAll(".profile-tab")),
  passwordToggles: Array.from(document.querySelectorAll(".password-toggle")),
  recordBtn: document.querySelector("#record-btn"),
  sttText: document.querySelector("#stt-text"),
  translatedText: document.querySelector("#translated-text"),
  ttsPlayer: document.querySelector("#tts-player"),
  statusPill: document.querySelector("#status-pill"),
  perfStt: document.querySelector("#perf-stt"),
  perfTranslation: document.querySelector("#perf-translation"),
  perfTts: document.querySelector("#perf-tts"),
  perfTotal: document.querySelector("#perf-total"),
  sttMeta: document.querySelector("#stt-meta"),
  translatorMeta: document.querySelector("#translator-meta"),
  audioMeta: document.querySelector("#audio-meta"),
  logOutput: document.querySelector("#log-output"),
  clearLogBtn: document.querySelector("#clear-log-btn"),
  logContent: document.querySelector("#log-content"),
  perfTrendChart: document.querySelector("#perf-trend-chart"),
  perfViewButtons: Array.from(document.querySelectorAll(".view-switcher-btn")),
  toggleHistoryBtn: document.querySelector("#toggle-history-btn"),
  historyContent: document.querySelector("#history-content"),
  historyList: document.querySelector("#history-list"),
  historyPaginationTop: document.querySelector("#history-pagination-top"),
  historyPagination: document.querySelector("#history-pagination"),
  clearHistoryBtn: document.querySelector("#clear-history-btn"),
  loadVoicesBtn: document.querySelector("#load-voices-btn"),
  enableMicBtn: document.querySelector("#enable-mic-btn"),
  vuMeter: document.querySelector("#vu-meter"),
  vuMeterColumns: Array.from(document.querySelectorAll(".vu-meter-column")),
  micPermissionPill: document.querySelector("#mic-permission-pill"),
  micGuidanceCard: document.querySelector("#mic-guidance-card"),
  micGuidanceTitle: document.querySelector("#mic-guidance-title"),
  micGuidanceText: document.querySelector("#mic-guidance-text"),
  sttLocalePreset: document.querySelector('[name="sttLocalePreset"]'),
  sttLocaleCustom: document.querySelector('[name="sttLocaleCustom"]'),
  translatorFromPreset: document.querySelector('[name="translatorFromPreset"]'),
  translatorToPreset: document.querySelector('[name="translatorToPreset"]'),
  translatorFromCustom: document.querySelector('[name="translatorFromCustom"]'),
  translatorToCustom: document.querySelector('[name="translatorToCustom"]'),
  translatorRegionPreset: document.querySelector('[name="translatorRegionPreset"]'),
  translatorRegionCustom: document.querySelector('[name="translatorRegionCustom"]'),
  translatorFromCustomWrap: document.querySelector("#translator-from-custom-wrap"),
  translatorToCustomWrap: document.querySelector("#translator-to-custom-wrap"),
  translatorCategoryWrap: document.querySelector("#translator-category-wrap"),
  sttLocaleCustomWrap: document.querySelector("#stt-locale-custom-wrap"),
  customSpeechEndpointIdWrap: document.querySelector("#custom-speech-endpoint-id-wrap"),
  translatorRegionCustomWrap: document.querySelector("#translator-region-custom-wrap"),
  ttsLanguagePreset: document.querySelector('[name="ttsLanguagePreset"]'),
  ttsLanguageCustom: document.querySelector('[name="ttsLanguageCustom"]'),
  ttsVoicePreset: document.querySelector('[name="ttsVoicePreset"]'),
  ttsVoiceCustom: document.querySelector('[name="ttsVoiceCustom"]'),
  ttsFormatPreset: document.querySelector('[name="ttsFormatPreset"]'),
  ttsFormatCustom: document.querySelector('[name="ttsFormatCustom"]'),
  ttsLanguageCustomWrap: document.querySelector("#tts-language-custom-wrap"),
  ttsVoiceCustomWrap: document.querySelector("#tts-voice-custom-wrap"),
  ttsFormatCustomWrap: document.querySelector("#tts-format-custom-wrap"),
  historyTemplate: document.querySelector("#history-item-template"),
};

let appState = {
  activeProfileId: defaultProfiles.activeProfileId,
  profiles: JSON.parse(JSON.stringify(defaultProfiles.profiles)),
  voices: [...DEFAULT_VOICES],
  settingsOpen: false,
  historyOpen: false,
  historyPage: 1,
  performanceView: "total",
};

let recorderState = {
  mediaRecorder: null,
  stream: null,
  permissionStream: null,
  recognizer: null,
  recognizerStream: null,
  recognizedSegments: [],
  chunks: [],
  recordedMimeType: "",
  isPressing: false,
  activeAudioUrl: null,
  activeRecordingPromise: null,
  permissionState: "unknown",
  releaseStartedAt: 0,
  meterContext: null,
  meterAnalyser: null,
  meterSource: null,
  meterData: null,
  meterAnimationFrame: 0,
  meterLevel: 0,
  uiAudioContext: null,
  pressPointerId: null,
  isEndingPress: false,
  pendingPressStart: false,
};

boot();

async function boot() {
  loadProfiles();
  loadUiState();
  renderStaticOptions();
  hydrateProfile();
  wireEvents();
  renderSettingsVisibility();
  renderHistoryVisibility();
  buildVuMeter();
  resetPerformanceSummary();
  setVuMeterLevel(0);
  await initMicrophonePermissionState();
  await renderHistory();
  log("App ready. Fill in Azure settings and hold the record button.");
}

function wireEvents() {
  elements.clearLogBtn.addEventListener("click", () => {
    elements.logOutput.innerHTML = "";
  });
  elements.toggleHistoryBtn.addEventListener("click", toggleHistoryPanel);
  elements.clearHistoryBtn.addEventListener("click", handleClearHistory);
  elements.loadVoicesBtn.addEventListener("click", handleLoadVoices);
  elements.enableMicBtn.addEventListener("click", handleEnableMicrophone);
  elements.openHistoryFab.addEventListener("click", () => setHistoryOpen(true));
  elements.historyBackdrop.addEventListener("click", () => setHistoryOpen(false));
  elements.openSettingsFab.addEventListener("click", () => setSettingsOpen(true));
  elements.toggleSettingsBtn.addEventListener("click", toggleSettingsPanel);
  elements.settingsBackdrop.addEventListener("click", () => setSettingsOpen(false));
  elements.themeSelect.addEventListener("change", handleThemeChange);
  elements.passwordToggles.forEach((button) => {
    button.addEventListener("click", () => togglePasswordField(button));
  });
  elements.perfViewButtons.forEach((button) => {
    button.addEventListener("click", () => setPerformanceView(button.dataset.view));
  });
  elements.settingsForm.addEventListener("change", handleSettingsChanged);
  elements.settingsForm.addEventListener("input", handleSettingsChanged);
  elements.profileTabs.forEach((button) => {
    button.addEventListener("click", () => switchProfile(button.dataset.profileId));
  });
  elements.quickProfileTabs.forEach((button) => {
    button.addEventListener("click", () => switchProfile(button.dataset.profileId));
  });
  elements.quickCustomSpeechBtn.addEventListener("click", () => toggleQuickServiceOption("useCustomSpeech"));
  elements.quickCustomTranslatorBtn.addEventListener("click", () => toggleQuickServiceOption("useCustomTranslator"));
  elements.ttsLanguagePreset.addEventListener("change", () => {
    renderVoiceOptions(resolveCustomizableValue(elements.ttsLanguagePreset.value, elements.ttsLanguageCustom.value));
    persistActiveProfileDraft();
  });
  elements.ttsLanguageCustom.addEventListener("input", () => {
    if (elements.ttsLanguagePreset.value === CUSTOM_OPTION) {
      renderVoiceOptions(elements.ttsLanguageCustom.value.trim());
    }
  });

  bindPressAndHold(elements.recordBtn, {
    onPressStart: beginRecording,
    onPressEnd: finishRecording,
  });
}

function renderStaticOptions() {
  populateSelectWithCustom(elements.sttLocalePreset, STT_LOCALES.map((locale) => ({ value: locale, label: locale })));
  const translatorOptions = TRANSLATOR_LANGUAGES.map((item) => ({ value: item.code, label: `${item.code} - ${item.label}` }));
  translatorOptions.push({ value: CUSTOM_OPTION, label: "Custom" });
  populateSelect(elements.translatorFromPreset, translatorOptions);
  populateSelect(elements.translatorToPreset, translatorOptions);
  renderTranslatorRegionOptions(defaultProfileSettings.translatorRegion);
  populateSelectWithCustom(elements.ttsLanguagePreset, DEFAULT_VOICE_LOCALES.map((locale) => ({ value: locale, label: locale })));
  populateSelectWithCustom(elements.ttsFormatPreset, TTS_OUTPUT_FORMATS.map((format) => ({ value: format, label: format })));
  renderVoiceOptions(defaultProfileSettings.ttsLanguage);
}

function loadProfiles() {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null");
    const savedUiState = JSON.parse(localStorage.getItem(UI_KEY) || "null");
    const legacyTheme = typeof savedUiState?.theme === "string" ? savedUiState.theme : null;
    if (saved?.profiles?.profileA && saved?.profiles?.profileB) {
      appState.activeProfileId = saved.activeProfileId || "profileA";
      appState.profiles.profileA = normalizeProfileSettings({ ...defaultProfiles.profiles.profileA, ...saved.profiles.profileA });
      appState.profiles.profileB = normalizeProfileSettings({ ...defaultProfiles.profiles.profileB, ...saved.profiles.profileB });
      if (!appState.profiles.profileA.theme && legacyTheme) {
        appState.profiles.profileA.theme = legacyTheme;
      }
      if (!appState.profiles.profileB.theme) {
        appState.profiles.profileB.theme = defaultProfiles.profiles.profileB.theme;
      }
    }
  } catch {
    appState.activeProfileId = defaultProfiles.activeProfileId;
    appState.profiles = JSON.parse(JSON.stringify(defaultProfiles.profiles));
  }
}

function normalizeProfileSettings(profile) {
  const normalizedSttLocale = normalizePresetAndCustom(profile.sttLocale, STT_LOCALES);
  const normalizedTranslatorRegion = normalizePresetAndCustom(profile.translatorRegion, TRANSLATOR_REGIONS);
  const normalizedTtsLanguage = normalizePresetAndCustom(profile.ttsLanguage, DEFAULT_VOICE_LOCALES);
  const normalizedTtsVoice = normalizePresetAndCustom(profile.ttsVoice, DEFAULT_VOICE_NAMES);
  const normalizedTtsFormat = normalizePresetAndCustom(profile.ttsFormat, TTS_OUTPUT_FORMATS);
  return {
    ...profile,
    sttLocale: normalizedSttLocale.value || defaultProfileSettings.sttLocale,
    sttLocalePreset: normalizedSttLocale.preset,
    sttLocaleCustom: normalizedSttLocale.custom,
    translatorRegion: normalizedTranslatorRegion.value || defaultProfileSettings.translatorRegion,
    translatorRegionPreset: normalizedTranslatorRegion.preset,
    translatorRegionCustom: normalizedTranslatorRegion.custom,
    ttsLanguage: normalizedTtsLanguage.value || defaultProfileSettings.ttsLanguage,
    ttsLanguagePreset: normalizedTtsLanguage.preset,
    ttsLanguageCustom: normalizedTtsLanguage.custom,
    ttsVoice: normalizedTtsVoice.value || defaultProfileSettings.ttsVoice,
    ttsVoicePreset: normalizedTtsVoice.preset,
    ttsVoiceCustom: normalizedTtsVoice.custom,
    ttsFormat: normalizedTtsFormat.value || defaultProfileSettings.ttsFormat,
    ttsFormatPreset: normalizedTtsFormat.preset,
    ttsFormatCustom: normalizedTtsFormat.custom,
  };
}

function saveProfiles() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({ activeProfileId: appState.activeProfileId, profiles: appState.profiles }));
}

function loadUiState() {
  try {
    const saved = JSON.parse(localStorage.getItem(UI_KEY) || "null");
    if (typeof saved?.settingsOpen === "boolean") {
      appState.settingsOpen = saved.settingsOpen;
    }
    if (typeof saved?.historyOpen === "boolean") {
      appState.historyOpen = saved.historyOpen;
    }
  } catch {
    appState.settingsOpen = false;
    appState.historyOpen = false;
  }
}

function saveUiState() {
  localStorage.setItem(UI_KEY, JSON.stringify({ settingsOpen: appState.settingsOpen, historyOpen: appState.historyOpen }));
}

function getActiveProfile() {
  return appState.profiles[appState.activeProfileId];
}

function switchProfile(profileId) {
  persistActiveProfileDraft();
  appState.activeProfileId = profileId;
  saveProfiles();
  hydrateProfile();
  log(`Switched to ${getActiveProfile().profileName}.`);
}

function hydrateProfile() {
  const profile = getActiveProfile();
  for (const [key, value] of Object.entries(profile)) {
    const field = elements.settingsForm.elements.namedItem(key) || (key === "profileName" ? elements.profileName : null);
    if (!field) continue;
    if (field.type === "checkbox") {
      field.checked = Boolean(value);
    } else {
      field.value = value ?? "";
    }
  }
  ensurePresetMatchesCustom(elements.sttLocalePreset, elements.sttLocaleCustom, profile.sttLocale);
  ensureTranslatorPresetMatchesCustom("translatorFromPreset", "translatorFromCustom");
  ensureTranslatorPresetMatchesCustom("translatorToPreset", "translatorToCustom");
  renderProfileTabs();
  renderQuickServiceToggles();
  renderTranslatorRegionOptions(profile.translatorRegion || defaultProfileSettings.translatorRegion);
  renderVoiceLocaleOptions();
  renderVoiceOptions(profile.ttsLanguage);
  elements.themeSelect.value = profile.theme || "light";
  applyTheme(profile.theme);
  updateConditionalFields();
}

function renderProfileTabs() {
  elements.profileTabs.forEach((button, index) => {
    const profileId = button.dataset.profileId;
    button.classList.toggle("active", profileId === appState.activeProfileId);
    button.textContent = appState.profiles[profileId].profileName || `Profile ${index + 1}`;
  });
  elements.quickProfileTabs.forEach((button, index) => {
    const profileId = button.dataset.profileId;
    button.classList.toggle("active", profileId === appState.activeProfileId);
    button.textContent = appState.profiles[profileId].profileName || `Profile ${index + 1}`;
  });
}

function renderVoiceLocaleOptions() {
  const localeSet = new Set(DEFAULT_VOICE_LOCALES);
  appState.voices.forEach((voice) => localeSet.add(voice.locale));
  const localeOptions = [...localeSet].sort().map((locale) => ({ value: locale, label: locale }));
  const currentLocale = resolveCustomizableValue(elements.ttsLanguagePreset?.value, elements.ttsLanguageCustom?.value) || getActiveProfile().ttsLanguage;
  populateSelectWithCustom(elements.ttsLanguagePreset, localeOptions);
  ensurePresetMatchesCustom(elements.ttsLanguagePreset, elements.ttsLanguageCustom, currentLocale);
}

function renderVoiceOptions(locale) {
  const voices = appState.voices.filter((voice) => !locale || voice.locale === locale).sort((a, b) => a.shortName.localeCompare(b.shortName));
  populateSelectWithCustom(elements.ttsVoicePreset, voices.map((voice) => ({ value: voice.shortName, label: `${voice.shortName} - ${voice.displayName}` })));
  const currentVoice = resolveCustomizableValue(elements.ttsVoicePreset?.value, elements.ttsVoiceCustom?.value) || getActiveProfile().ttsVoice;
  ensurePresetMatchesCustom(elements.ttsVoicePreset, elements.ttsVoiceCustom, currentVoice);
}

function renderTranslatorRegionOptions(selectedRegion = defaultProfileSettings.translatorRegion) {
  const regionOptions = [...TRANSLATOR_REGIONS];
  if (selectedRegion && !regionOptions.includes(selectedRegion)) {
    regionOptions.push(selectedRegion);
  }
  populateSelectWithCustom(elements.translatorRegionPreset, regionOptions.map((region) => ({ value: region, label: region })));
  ensurePresetMatchesCustom(elements.translatorRegionPreset, elements.translatorRegionCustom, selectedRegion || defaultProfileSettings.translatorRegion);
}

function handleSettingsChanged() {
  updateConditionalFields();
  persistActiveProfileDraft();
}

function updateConditionalFields() {
  toggleConditionalField(elements.sttLocaleCustomWrap, elements.sttLocalePreset.value === CUSTOM_OPTION);
  toggleConditionalField(elements.customSpeechEndpointIdWrap, Boolean(elements.settingsForm.elements.namedItem("useCustomSpeech").checked));
  toggleConditionalField(elements.translatorRegionCustomWrap, elements.translatorRegionPreset.value === CUSTOM_OPTION);
  toggleConditionalField(elements.translatorCategoryWrap, Boolean(elements.settingsForm.elements.namedItem("useCustomTranslator").checked));
  toggleConditionalField(elements.translatorFromCustomWrap, elements.translatorFromPreset.value === CUSTOM_OPTION);
  toggleConditionalField(elements.translatorToCustomWrap, elements.translatorToPreset.value === CUSTOM_OPTION);
  toggleConditionalField(elements.ttsLanguageCustomWrap, elements.ttsLanguagePreset.value === CUSTOM_OPTION);
  toggleConditionalField(elements.ttsVoiceCustomWrap, elements.ttsVoicePreset.value === CUSTOM_OPTION);
  toggleConditionalField(elements.ttsFormatCustomWrap, elements.ttsFormatPreset.value === CUSTOM_OPTION);
}

function toggleConditionalField(wrapper, visible) {
  wrapper.classList.toggle("is-hidden", !visible);
}

function persistActiveProfileDraft() {
  appState.profiles[appState.activeProfileId] = normalizeProfileSettings(collectProfileFromForm());
  saveProfiles();
  renderProfileTabs();
  renderQuickServiceToggles();
}

function toggleQuickServiceOption(fieldName) {
  const field = elements.settingsForm.elements.namedItem(fieldName);
  if (!field) return;
  field.checked = !field.checked;
  updateConditionalFields();
  persistActiveProfileDraft();
}

function renderQuickServiceToggles() {
  renderQuickServiceToggle(elements.quickCustomSpeechBtn, "useCustomSpeech", "Custom Speech");
  renderQuickServiceToggle(elements.quickCustomTranslatorBtn, "useCustomTranslator", "Custom Translator");
}

function renderQuickServiceToggle(button, fieldName, label) {
  const enabled = Boolean(getActiveProfile()[fieldName]);
  button.classList.toggle("is-on", enabled);
  button.setAttribute("aria-pressed", String(enabled));
  button.setAttribute("aria-label", `${label}: ${enabled ? "On" : "Off"}`);
}

function collectProfileFromForm() {
  const data = new FormData(elements.settingsForm);
  const sttLocale = resolveCustomizableValue(data.get("sttLocalePreset"), data.get("sttLocaleCustom"));
  const translatorRegion = resolveCustomizableValue(data.get("translatorRegionPreset"), data.get("translatorRegionCustom"));
  const ttsLanguage = resolveCustomizableValue(data.get("ttsLanguagePreset"), data.get("ttsLanguageCustom"));
  const ttsVoice = resolveCustomizableValue(data.get("ttsVoicePreset"), data.get("ttsVoiceCustom"));
  const ttsFormat = resolveCustomizableValue(data.get("ttsFormatPreset"), data.get("ttsFormatCustom"));
  return {
    profileName: String(elements.profileName.value || "").trim() || "Untitled Profile",
    theme: String(elements.themeSelect.value || "light").trim() || "light",
    sttEndpoint: sanitizeUrl(data.get("sttEndpoint")),
    speechKey: String(data.get("speechKey") || "").trim(),
    sttLocale,
    sttLocalePreset: String(data.get("sttLocalePreset") || ""),
    sttLocaleCustom: String(data.get("sttLocaleCustom") || "").trim(),
    useCustomSpeech: Boolean(elements.settingsForm.elements.namedItem("useCustomSpeech").checked),
    customSpeechEndpointId: String(data.get("customSpeechEndpointId") || "").trim(),
    translatorEndpoint: sanitizeUrl(data.get("translatorEndpoint")),
    translatorKey: String(data.get("translatorKey") || "").trim(),
    translatorRegion,
    translatorRegionPreset: String(data.get("translatorRegionPreset") || ""),
    translatorRegionCustom: String(data.get("translatorRegionCustom") || "").trim(),
    useCustomTranslator: Boolean(elements.settingsForm.elements.namedItem("useCustomTranslator").checked),
    translatorCategory: String(data.get("translatorCategory") || "").trim(),
    translatorFromPreset: String(data.get("translatorFromPreset") || ""),
    translatorFromCustom: String(data.get("translatorFromCustom") || "").trim(),
    translatorToPreset: String(data.get("translatorToPreset") || ""),
    translatorToCustom: String(data.get("translatorToCustom") || "").trim(),
    ttsEndpoint: sanitizeUrl(data.get("ttsEndpoint")),
    ttsKey: String(data.get("ttsKey") || "").trim(),
    ttsLanguage,
    ttsLanguagePreset: String(data.get("ttsLanguagePreset") || ""),
    ttsLanguageCustom: String(data.get("ttsLanguageCustom") || "").trim(),
    ttsVoice,
    ttsVoicePreset: String(data.get("ttsVoicePreset") || ""),
    ttsVoiceCustom: String(data.get("ttsVoiceCustom") || "").trim(),
    ttsFormat,
    ttsFormatPreset: String(data.get("ttsFormatPreset") || ""),
    ttsFormatCustom: String(data.get("ttsFormatCustom") || "").trim(),
    ttsRate: String(data.get("ttsRate") || "").trim(),
  };
}

function getSettings() {
  const profile = collectProfileFromForm();
  return {
    ...profile,
    translatorFrom: resolveTranslatorCode(profile.translatorFromPreset, profile.translatorFromCustom),
    translatorTo: resolveTranslatorCode(profile.translatorToPreset, profile.translatorToCustom),
  };
}

function resolveTranslatorCode(presetValue, customValue) {
  return presetValue === CUSTOM_OPTION ? customValue.trim() : presetValue;
}

function resolveCustomizableValue(presetValue, customValue) {
  return presetValue === CUSTOM_OPTION ? String(customValue || "").trim() : String(presetValue || "").trim();
}

function ensureTranslatorPresetMatchesCustom(presetFieldName, customFieldName) {
  const profile = getActiveProfile();
  const presetField = elements.settingsForm.elements.namedItem(presetFieldName);
  const customField = elements.settingsForm.elements.namedItem(customFieldName);
  const presetValue = profile[presetFieldName];
  if ([...presetField.options].some((option) => option.value === presetValue)) {
    presetField.value = presetValue;
    return;
  }
  presetField.value = CUSTOM_OPTION;
  customField.value = profile[customFieldName] || presetValue || "";
}

function ensurePresetMatchesCustom(presetField, customField, effectiveValue) {
  if ([...presetField.options].some((option) => option.value === effectiveValue)) {
    presetField.value = effectiveValue;
    customField.value = "";
    return;
  }
  presetField.value = CUSTOM_OPTION;
  customField.value = effectiveValue || "";
}

function handleThemeChange() {
  persistActiveProfileDraft();
  applyTheme(getActiveProfile().theme);
}

function togglePasswordField(button) {
  const targetName = button.dataset.target;
  const input = elements.settingsForm.elements.namedItem(targetName);
  if (!input) {
    return;
  }
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  button.textContent = isHidden ? "🙉" : "🙈";
  button.setAttribute("aria-label", `${isHidden ? "Hide" : "Show"} ${targetName}`);
}

function toggleSettingsPanel() {
  setSettingsOpen(!appState.settingsOpen);
}

function renderSettingsVisibility() {
  elements.settingsContent.classList.remove("is-collapsed");
  elements.settingsDrawer.classList.toggle("is-open", appState.settingsOpen);
  elements.settingsDrawer.setAttribute("aria-hidden", String(!appState.settingsOpen));
  elements.settingsBackdrop.hidden = !appState.settingsOpen;
  elements.openSettingsFab.setAttribute("aria-expanded", String(appState.settingsOpen));
  elements.toggleSettingsBtn.setAttribute("aria-expanded", String(appState.settingsOpen));
  elements.toggleSettingsBtn.textContent = "Close";
}

function setSettingsOpen(nextOpen) {
  appState.settingsOpen = nextOpen;
  saveUiState();
  renderSettingsVisibility();
}

function toggleHistoryPanel() {
  setHistoryOpen(!appState.historyOpen);
}

function setHistoryOpen(nextOpen) {
  appState.historyOpen = nextOpen;
  saveUiState();
  renderHistoryVisibility();
}

function renderHistoryVisibility() {
  elements.historyContent.classList.remove("is-collapsed");
  elements.historyBackdrop.hidden = !appState.historyOpen;
  elements.historyDrawer.classList.toggle("is-open", appState.historyOpen);
  elements.historyDrawer.setAttribute("aria-hidden", String(!appState.historyOpen));
  elements.openHistoryFab.setAttribute("aria-expanded", String(appState.historyOpen));
  elements.toggleHistoryBtn.setAttribute("aria-expanded", String(appState.historyOpen));
  elements.toggleHistoryBtn.textContent = "Close";
}

function applyTheme(themeName = getActiveProfile()?.theme || "light") {
  document.body.setAttribute("data-theme", themeName);
}

async function beginRecording() {
  if (recorderState.activeRecordingPromise) return;
  recorderState.pendingPressStart = true;
  triggerHapticFeedback(12);
  playRadioClick("press");
  const settings = getSettings();
  const missing = validateBeforeRecording(settings);
  if (missing.length > 0) {
    recorderState.isPressing = false;
    recorderState.pendingPressStart = false;
    setStatus("error", "Missing Settings");
    log(`Cannot start recording. Missing: ${missing.join(", ")}`);
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    recorderState.isPressing = false;
    recorderState.pendingPressStart = false;
    setStatus("error", "Mic Not Supported");
    log("This browser does not support getUserMedia.");
    return;
  }
  try {
    resetPerformanceSummary();
    await startSpeechRecognition(settings);
    const stream = await getRecordingStream();
      const mimeType = getSupportedMimeType();
      const mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      recorderState.stream = stream;
      recorderState.mediaRecorder = mediaRecorder;
      recorderState.chunks = [];
      recorderState.recordedMimeType = mediaRecorder.mimeType || mimeType || "audio/webm";
      if (!recorderState.isPressing) {
        stopStream(stream);
        recorderState.stream = null;
        recorderState.mediaRecorder = null;
        recorderState.chunks = [];
        recorderState.recordedMimeType = "";
        recorderState.pendingPressStart = false;
        await stopSpeechRecognition(true);
        setStatus("idle", "Ready");
        return;
      }
      mediaRecorder.addEventListener("dataavailable", (event) => {
        if (event.data && event.data.size > 0) recorderState.chunks.push(event.data);
      });
      mediaRecorder.start();
      recorderState.pendingPressStart = false;
      elements.recordBtn.classList.add("recording");
      elements.vuMeter.classList.add("is-recording");
      setStatus("processing", "Recording");
      log("Recording started.");
    } catch (error) {
      recorderState.isPressing = false;
      recorderState.pendingPressStart = false;
      await stopSpeechRecognition(true);
      setStatus("error", "Mic Error");
      log(`Microphone access failed: ${formatError(error)}`);
    }
  }

async function finishRecording() {
  if (recorderState.pendingPressStart && (!recorderState.mediaRecorder || recorderState.mediaRecorder.state === "inactive")) {
    recorderState.isPressing = false;
    recorderState.pendingPressStart = false;
    await stopSpeechRecognition(true);
    cleanupRecorder();
    setStatus("idle", "Ready");
    return;
  }
  if (!recorderState.mediaRecorder || recorderState.mediaRecorder.state === "inactive") return;
  triggerHapticFeedback(16);
  playRadioClick("release");
  recorderState.isPressing = false;
  recorderState.pendingPressStart = false;
  recorderState.releaseStartedAt = performance.now();
  setStatus("processing", "Processing");
  log("Recording stopped. Running STT, translation, and TTS.");
  recorderState.activeRecordingPromise = new Promise((resolve) => {
    recorderState.mediaRecorder.addEventListener("stop", async () => {
      try {
        const recordingBlob = new Blob(recorderState.chunks, { type: recorderState.recordedMimeType });
        const transcript = await stopSpeechRecognition(false);
        await processRecording(recordingBlob, transcript);
      } catch (error) {
        setStatus("error", "Failed");
        log(`Pipeline failed: ${formatError(error)}`);
      } finally {
        cleanupRecorder();
        recorderState.activeRecordingPromise = null;
        resolve();
      }
    }, { once: true });
  });
  recorderState.mediaRecorder.stop();
  stopStream(recorderState.stream);
}

async function initMicrophonePermissionState() {
  if (!navigator.permissions?.query) {
    updateMicPermission("unknown");
    return;
  }
  try {
    const result = await navigator.permissions.query({ name: "microphone" });
    updateMicPermission(result.state);
    result.addEventListener("change", () => {
      updateMicPermission(result.state);
    });
  } catch {
    updateMicPermission("unknown");
  }
}

async function handleEnableMicrophone() {
  if (!navigator.mediaDevices?.getUserMedia) {
    setStatus("error", "Mic Not Supported");
    log("This browser does not support getUserMedia.");
    return;
  }
  try {
    if (recorderState.permissionStream) {
      await ensureVuMeter();
      updateMicPermission("granted");
      log("Microphone permission already granted.");
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorderState.permissionStream = stream;
    await ensureVuMeter();
    updateMicPermission("granted");
    log("Microphone permission granted and ready.");
  } catch (error) {
    updateMicPermission("denied");
    log(`Microphone permission request failed: ${formatError(error)}`);
  }
}

async function getRecordingStream() {
  if (recorderState.permissionStream) {
    await ensureVuMeter();
    return cloneAudioStream(recorderState.permissionStream);
  }
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  recorderState.permissionStream = stream;
  await ensureVuMeter();
  updateMicPermission("granted");
  return cloneAudioStream(stream);
}

function cloneAudioStream(sourceStream) {
  const tracks = sourceStream.getAudioTracks().map((track) => track.clone());
  return new MediaStream(tracks);
}

async function startSpeechRecognition(settings) {
  const sdk = window.SpeechSDK;
  if (!sdk) {
    throw new Error("Azure Speech SDK failed to load.");
  }

  await handleEnableMicrophone();

  if (recorderState.recognizer) {
    await stopSpeechRecognition(true);
  }

  recorderState.recognizedSegments = [];
  const speechConfig = createSpeechConfig(settings, sdk);
  speechConfig.speechRecognitionLanguage = settings.sttLocale;
  const recognizerStream = cloneAudioStream(recorderState.permissionStream);
  const audioConfig = sdk.AudioConfig.fromStreamInput(recognizerStream);
  const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

  recognizer.recognized = (_sender, event) => {
    if (event.result?.reason === sdk.ResultReason.RecognizedSpeech && event.result.text) {
      recorderState.recognizedSegments.push(event.result.text.trim());
    }
  };

  recognizer.canceled = (_sender, event) => {
    if (event.errorDetails) {
      log(`STT canceled: ${event.errorDetails}`);
    }
  };

  recorderState.recognizer = recognizer;
  recorderState.recognizerStream = recognizerStream;

  await new Promise((resolve, reject) => {
    recognizer.startContinuousRecognitionAsync(resolve, reject);
  });
}

async function stopSpeechRecognition(discardTranscript) {
  if (!recorderState.recognizer) {
    return discardTranscript ? "" : recorderState.recognizedSegments.join(" ").trim();
  }

  const recognizer = recorderState.recognizer;
  const recognizerStream = recorderState.recognizerStream;
  recorderState.recognizer = null;
  recorderState.recognizerStream = null;

  await new Promise((resolve, reject) => {
    recognizer.stopContinuousRecognitionAsync(resolve, reject);
  });
  recognizer.close();
  stopStream(recognizerStream);

  const transcript = discardTranscript ? "" : recorderState.recognizedSegments.join(" ").trim();
  recorderState.recognizedSegments = [];
  return transcript;
}

function createSpeechConfig(settings, sdk) {
  const endpoint = normalizeSpeechSdkEndpoint(settings.sttEndpoint);
  const speechConfig = sdk.SpeechConfig.fromEndpoint(new URL(endpoint), settings.speechKey);
  if (settings.useCustomSpeech && settings.customSpeechEndpointId) {
    speechConfig.endpointId = settings.customSpeechEndpointId;
  }
  return speechConfig;
}

function normalizeSpeechSdkEndpoint(endpoint) {
  const normalized = stripTrailingSlash(endpoint);
  try {
    const url = new URL(normalized);
    if (url.pathname && url.pathname !== "/") {
      return url.toString();
    }
    return `${url.origin}/speech/recognition/conversation/cognitiveservices/v1`;
  } catch {
    return normalized;
  }
}

function updateMicPermission(state) {
  recorderState.permissionState = state;
  const labels = {
    granted: "Mic permission: granted",
    denied: "Mic permission: denied",
    prompt: "Mic permission: prompt",
    unknown: "Mic permission: unknown",
  };
  const pillMode = state === "granted" ? "success" : state === "denied" ? "error" : "idle";
  elements.micPermissionPill.className = `status-pill ${pillMode}`;
  elements.micPermissionPill.textContent = labels[state] || labels.unknown;
  if (state !== "granted") {
    stopVuMeter();
    setVuMeterLevel(0);
  } else if (recorderState.permissionStream) {
    ensureVuMeter().catch(() => {});
  }
  updateMicGuidance(state);
}

function updateMicGuidance(state) {
  const card = elements.micGuidanceCard;
  card.className = "mic-guidance";

  if (state === "granted") {
    card.classList.add("mic-guidance-success");
    elements.micGuidanceTitle.textContent = "Microphone is ready";
    elements.micGuidanceText.textContent = "Permission has been granted. You can now use Hold To Record without re-enabling the microphone.";
    return;
  }

  if (state === "denied") {
    card.classList.add("mic-guidance-error");
    elements.micGuidanceTitle.textContent = "Microphone access was denied";
    elements.micGuidanceText.textContent = "Please reopen microphone access in your browser site settings, then click Enable Microphone again.";
    return;
  }

  card.classList.add("mic-guidance-idle");
  elements.micGuidanceTitle.textContent = "Please enable microphone first";
  elements.micGuidanceText.textContent = "Click Enable Microphone once before using Hold To Record.";
}

async function ensureVuMeter() {
  if (!recorderState.permissionStream || !elements.vuMeter) return;

  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) return;

  if (!recorderState.meterContext) {
    recorderState.meterContext = new AudioContextCtor();
  }

  if (recorderState.meterContext.state === "suspended") {
    await recorderState.meterContext.resume();
  }

  if (!recorderState.meterAnalyser) {
    recorderState.meterAnalyser = recorderState.meterContext.createAnalyser();
    recorderState.meterAnalyser.fftSize = 512;
    recorderState.meterAnalyser.smoothingTimeConstant = 0.82;
    recorderState.meterData = new Uint8Array(recorderState.meterAnalyser.fftSize);
  }

  if (recorderState.meterSource) {
    recorderState.meterSource.disconnect();
  }

  recorderState.meterSource = recorderState.meterContext.createMediaStreamSource(recorderState.permissionStream);
  recorderState.meterSource.connect(recorderState.meterAnalyser);
  elements.vuMeter.classList.add("is-active");
  startVuMeterLoop();
}

function startVuMeterLoop() {
  if (recorderState.meterAnimationFrame || !recorderState.meterAnalyser) return;

  const update = () => {
    if (!recorderState.meterAnalyser || !recorderState.meterData) {
      recorderState.meterAnimationFrame = 0;
      return;
    }

    recorderState.meterAnalyser.getByteTimeDomainData(recorderState.meterData);
    let sum = 0;
    for (const value of recorderState.meterData) {
      const normalized = (value - 128) / 128;
      sum += normalized * normalized;
    }
    const rms = Math.sqrt(sum / recorderState.meterData.length);
    const boostedLevel = Math.min(1, rms * 5.5);
    recorderState.meterLevel = (recorderState.meterLevel * 0.72) + (boostedLevel * 0.28);
    setVuMeterLevel(recorderState.meterLevel);
    recorderState.meterAnimationFrame = window.requestAnimationFrame(update);
  };

  recorderState.meterAnimationFrame = window.requestAnimationFrame(update);
}

function stopVuMeter() {
  if (recorderState.meterAnimationFrame) {
    window.cancelAnimationFrame(recorderState.meterAnimationFrame);
    recorderState.meterAnimationFrame = 0;
  }
  if (recorderState.meterSource) {
    recorderState.meterSource.disconnect();
    recorderState.meterSource = null;
  }
  recorderState.meterLevel = 0;
  elements.vuMeter.classList.remove("is-active", "is-recording");
  elements.vuMeter.classList.remove("is-peak");
}

function setVuMeterLevel(level) {
  if (!elements.vuMeter) return;
  const clamped = Math.max(0, Math.min(1, level || 0));
  const leds = Array.from(document.querySelectorAll(".vu-meter-led"));
  const totalSteps = 12;
  const litCount = Math.max(1, Math.round(clamped * totalSteps));
  leds.forEach((led, index) => {
    const stepIndex = totalSteps - (index % totalSteps);
    const isOn = litCount >= stepIndex && clamped > 0.02;
    led.classList.toggle("is-on", isOn);
    led.classList.toggle("is-warn", isOn && stepIndex <= 3 && stepIndex > 1);
    led.classList.toggle("is-peak", isOn && stepIndex <= 1);
  });
}

function buildVuMeter() {
  if (!elements.vuMeterColumns.length) return;
  elements.vuMeterColumns.forEach((column) => {
    if (column.children.length) return;
    for (let i = 0; i < 12; i += 1) {
      const led = document.createElement("span");
      led.className = "vu-meter-led";
      column.appendChild(led);
    }
  });
}

async function processRecording(audioBlob, transcript) {
  const settings = getSettings();
  const startedAt = new Date().toISOString();
  const apiCalls = [];
  const performanceStats = {
    sttMs: 0,
    translationMs: 0,
    ttsMs: 0,
    totalMs: 0,
  };
  setResultText(elements.sttText, "Transcribing...");
  setResultText(elements.translatedText, "Translating...");
  elements.sttMeta.textContent = "STT";
  elements.translatorMeta.textContent = "Translator";
  elements.audioMeta.textContent = "TTS";
  elements.ttsPlayer.removeAttribute("src");
  elements.ttsPlayer.load();

  const sttCompletedAt = performance.now();
  const sttUrl = normalizeSpeechSdkEndpoint(settings.sttEndpoint);
  apiCalls.push({
    service: "Speech-to-Text",
    method: "POST",
    url: sttUrl,
    params: {
      recognitionLanguage: settings.sttLocale,
      mode: "continuous microphone recognition while button is held",
      endpointId: settings.useCustomSpeech ? settings.customSpeechEndpointId : "",
    },
  });
  const detectedLocale = settings.sttLocale || settings.translatorFrom;
  if (!transcript) throw new Error("Speech-to-Text returned no transcript.");
  performanceStats.sttMs = Math.round(sttCompletedAt - recorderState.releaseStartedAt);

  setResultText(elements.sttText, transcript);
  elements.sttMeta.textContent = detectedLocale || "Done";
  log(`STT result: ${transcript}`);

  const translationStartedAt = performance.now();
  const translatorResponse = await translateText(transcript, settings, apiCalls);
  performanceStats.translationMs = Math.round(performance.now() - translationStartedAt);
  const translatedText = extractTranslation(translatorResponse);
  setResultText(elements.translatedText, translatedText);
  elements.translatorMeta.textContent = `${settings.translatorFrom || detectedLocale} -> ${settings.translatorTo}`;
  log(`Translation result: ${translatedText}`);

  const ttsStartedAt = performance.now();
  const ttsAudioBlob = await synthesizeSpeech(translatedText, settings, apiCalls);
  performanceStats.ttsMs = Math.round(performance.now() - ttsStartedAt);
  performanceStats.totalMs = performanceStats.sttMs + performanceStats.translationMs + performanceStats.ttsMs;
  setAudioPlayer(ttsAudioBlob);
  elements.audioMeta.textContent = settings.ttsVoice || settings.ttsLanguage || "Done";
  log("TTS audio generated.");
  updatePerformanceSummary(performanceStats);

  setApiCallDuration(apiCalls, "Speech-to-Text", "POST", performanceStats.sttMs);
  setApiCallDuration(apiCalls, "Translator", "POST", performanceStats.translationMs);
  setApiCallDuration(apiCalls, "Text-to-Speech", "POST", performanceStats.ttsMs);

  const sequence = await getNextHistorySequence();
  await saveHistoryEntry({
    sequence,
    createdAt: startedAt,
    profileName: settings.profileName,
    transcript,
    translatedText,
    detectedLocale,
    sourceLanguage: settings.translatorFrom || detectedLocale,
    targetLanguage: settings.translatorTo,
    sttEndpoint: settings.sttEndpoint,
    translatorEndpoint: settings.translatorEndpoint,
    ttsEndpoint: settings.ttsEndpoint,
    ttsVoice: settings.ttsVoice,
    audioMimeType: audioBlob.type || "audio/webm",
    recordingBlob: audioBlob,
    ttsAudioBlob: ttsAudioBlob,
    ttsAudioMimeType: ttsAudioBlob.type || "audio/mpeg",
    performanceStats,
    apiCalls,
  });
  await pruneHistoryEntries();

  await renderHistory();
  setStatus("success", "Complete");
}

async function translateText(text, settings, apiCalls) {
  const headers = {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": settings.translatorKey,
    "X-ClientTraceId": crypto.randomUUID(),
  };
  if (settings.translatorRegion) headers["Ocp-Apim-Subscription-Region"] = settings.translatorRegion;

  const url = buildTranslatorUrl(settings);
  const body = [{ Text: text }];
  apiCalls.push({
    service: "Translator",
    method: "POST",
    url,
    params: { body, from: settings.translatorFrom, to: settings.translatorTo, category: settings.useCustomTranslator ? settings.translatorCategory : "" },
  });

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  return parseJsonResponse(response, "Translator");
}

async function synthesizeSpeech(text, settings, apiCalls) {
  const url = buildTtsUrl(settings.ttsEndpoint);
  const ssml = buildSsml(text, settings);
  apiCalls.push({
    service: "Text-to-Speech",
    method: "POST",
    url,
    params: {
      voiceLocale: settings.ttsLanguage,
      voiceName: settings.ttsVoice,
      outputFormat: settings.ttsFormat,
      rate: settings.ttsRate,
      text,
    },
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": settings.ttsKey,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": settings.ttsFormat || defaultProfileSettings.ttsFormat,
      "User-Agent": "AzureAiVoiceFlowTester",
    },
    body: ssml,
  });
  if (!response.ok) throw await createHttpError(response, "Text-to-Speech");
  return await response.blob();
}

function setApiCallDuration(apiCalls, service, method, durationMs) {
  const targetCall = apiCalls.find((call) => call.service === service && call.method === method);
  if (targetCall) {
    targetCall.durationMs = durationMs;
  }
}

async function handleLoadVoices() {
  const settings = getSettings();
  if (!settings.ttsEndpoint || !settings.ttsKey) {
    log("TTS endpoint and key are required before loading voices.");
    return;
  }
  try {
    const response = await fetch(buildVoiceListUrl(settings.ttsEndpoint), {
      method: "GET",
      headers: { "Ocp-Apim-Subscription-Key": settings.ttsKey },
    });
    const voices = await parseJsonResponse(response, "Voice List");
    if (Array.isArray(voices) && voices.length > 0) {
      appState.voices = voices.map((voice) => ({
        locale: voice.Locale,
        shortName: voice.ShortName,
        displayName: voice.DisplayName || voice.ShortName,
      }));
      renderVoiceLocaleOptions();
      renderVoiceOptions(resolveCustomizableValue(elements.ttsLanguagePreset.value, elements.ttsLanguageCustom.value));
      persistActiveProfileDraft();
    }
    log(`Loaded ${Array.isArray(voices) ? voices.length : 0} voices.`);
  } catch (error) {
    log(`Failed to load voices: ${formatError(error)}`);
  }
}

async function renderHistory() {
  const entries = await getAllHistoryEntries();
  elements.historyList.innerHTML = "";
  elements.historyPaginationTop.innerHTML = "";
  elements.historyPagination.innerHTML = "";
  renderPerformanceTrend(entries);
  if (entries.length === 0) {
    const empty = document.createElement("p");
    empty.className = "result-text empty";
    empty.textContent = "No history yet.";
    elements.historyList.appendChild(empty);
    return;
  }

  const totalPages = Math.max(1, Math.ceil(entries.length / HISTORY_PAGE_SIZE));
  if (appState.historyPage > totalPages) {
    appState.historyPage = totalPages;
  }
  const startIndex = (appState.historyPage - 1) * HISTORY_PAGE_SIZE;
  const pageEntries = entries.slice(startIndex, startIndex + HISTORY_PAGE_SIZE);

  for (const entry of pageEntries) {
    const fragment = elements.historyTemplate.content.cloneNode(true);
    const title = fragment.querySelector(".history-title");
    const subtitle = fragment.querySelector(".history-subtitle");
    const time = fragment.querySelector(".history-time");
    const stt = fragment.querySelector(".history-stt");
    const translation = fragment.querySelector(".history-translation");
    const performance = fragment.querySelector(".history-performance");
    const apiWrap = fragment.querySelector(".history-api");
    const audio = fragment.querySelector(".history-audio");
    const ttsAudio = fragment.querySelector(".history-tts-audio");
    const removeBtn = fragment.querySelector(".history-delete");
    const card = fragment.querySelector(".history-item");

    title.textContent = `#${entry.sequence || 0}  ${entry.profileName || "Profile"}`;
    subtitle.textContent = "";
    card.id = `history-seq-${entry.sequence || 0}`;
    time.textContent = formatDateTime(entry.createdAt);
    stt.textContent = entry.transcript || "(empty)";
    translation.textContent = entry.translatedText || "(empty)";
    performance.innerHTML = buildHistoryPerformanceMarkup(entry.performanceStats);

    if (Array.isArray(entry.apiCalls)) {
      entry.apiCalls.forEach((call) => {
        const card = document.createElement("div");
        card.className = "api-call";
        const heading = document.createElement("h5");
        heading.textContent = `${call.service} | ${call.method}`;
        const context = document.createElement("p");
        context.className = "api-call-context";
        if (call.service === "Speech-to-Text") {
          context.textContent = [`Locale: ${entry.detectedLocale || "-"}`, `Audio: ${entry.audioMimeType || "-"}`].join(" | ");
        } else if (call.service === "Translator") {
          context.textContent = [`From: ${entry.sourceLanguage || entry.detectedLocale || "-"}`, `To: ${entry.targetLanguage || "-"}`].join(" | ");
        } else if (call.service === "Text-to-Speech") {
          context.textContent = [`Voice: ${entry.ttsVoice || "-"}`, `Output: ${entry.ttsAudioMimeType || "-"}`].join(" | ");
        }
        const url = document.createElement("p");
        url.className = "api-call-url";
        url.textContent = call.url;
        const pre = document.createElement("pre");
        pre.textContent = JSON.stringify(call.params, null, 2);
        if (typeof call.durationMs === "number") {
          const duration = document.createElement("p");
          duration.className = "api-call-duration";
          duration.textContent = `Duration: ${formatMilliseconds(call.durationMs)}`;
          card.append(heading, context);
          if (call.url) {
            card.appendChild(url);
          }
          card.append(duration, pre);
        } else {
          card.append(heading, context);
          if (call.url) {
            card.appendChild(url);
          }
          card.appendChild(pre);
        }
        apiWrap.appendChild(card);
      });
    }

    if (entry.recordingBlob) audio.src = URL.createObjectURL(entry.recordingBlob);
    if (entry.ttsAudioBlob) ttsAudio.src = URL.createObjectURL(entry.ttsAudioBlob);
    removeBtn.addEventListener("click", async () => {
      await deleteHistoryEntry(entry.id);
      if (audio.src) URL.revokeObjectURL(audio.src);
      if (ttsAudio.src) URL.revokeObjectURL(ttsAudio.src);
      const remainingEntries = await getAllHistoryEntries();
      const totalPagesAfterDelete = Math.max(1, Math.ceil(remainingEntries.length / HISTORY_PAGE_SIZE));
      if (appState.historyPage > totalPagesAfterDelete) {
        appState.historyPage = totalPagesAfterDelete;
      }
      await renderHistory();
      log("History item deleted.");
    });
    elements.historyList.appendChild(fragment);
  }

  renderHistoryPagination(totalPages);
}

async function handleClearHistory() {
  appState.historyPage = 1;
  await clearHistoryEntries();
  await renderHistory();
  log("History cleared.");
}

async function jumpToHistorySequence(targetSequence, logIfMissing = false) {
  const entries = await getAllHistoryEntries();
  const sortedDescending = entries;
  const targetIndex = sortedDescending.findIndex((entry) => (entry.sequence || 0) === targetSequence);
  if (targetIndex === -1) {
    if (logIfMissing) {
      log(`History sequence #${targetSequence} was not found.`);
    }
    return false;
  }

  if (!appState.historyOpen) {
    setHistoryOpen(true);
  }
  appState.historyPage = Math.floor(targetIndex / HISTORY_PAGE_SIZE) + 1;
  await renderHistory();

  requestAnimationFrame(() => {
    const targetCard = document.querySelector(`#history-seq-${targetSequence}`);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
      targetCard.classList.remove("history-flash");
      void targetCard.offsetWidth;
      targetCard.classList.add("history-flash");
      window.setTimeout(() => {
        targetCard.classList.remove("history-flash");
      }, 10000);
    }
  });

  return true;
}

function renderHistoryPagination(totalPages) {
  if (totalPages <= 1) {
    return;
  }
  renderHistoryPaginationInto(elements.historyPaginationTop, totalPages);
  renderHistoryPaginationInto(elements.historyPagination, totalPages);
}

function renderHistoryPaginationInto(container, totalPages) {
  const firstButton = document.createElement("button");
  firstButton.className = "ghost-button";
  firstButton.type = "button";
  firstButton.textContent = "First";
  firstButton.disabled = appState.historyPage === 1;
  firstButton.addEventListener("click", async () => {
    if (appState.historyPage !== 1) {
      appState.historyPage = 1;
      await renderHistory();
    }
  });

  const prevButton = document.createElement("button");
  prevButton.className = "ghost-button";
  prevButton.type = "button";
  prevButton.textContent = "Previous";
  prevButton.disabled = appState.historyPage === 1;
  prevButton.addEventListener("click", async () => {
    if (appState.historyPage > 1) {
      appState.historyPage -= 1;
      await renderHistory();
    }
  });

  const info = document.createElement("span");
  info.className = "history-page-info";
  info.textContent = `Page ${appState.historyPage} / ${totalPages}`;

  const nextButton = document.createElement("button");
  nextButton.className = "ghost-button";
  nextButton.type = "button";
  nextButton.textContent = "Next";
  nextButton.disabled = appState.historyPage === totalPages;
  nextButton.addEventListener("click", async () => {
    if (appState.historyPage < totalPages) {
      appState.historyPage += 1;
      await renderHistory();
    }
  });

  container.append(firstButton, prevButton, info, nextButton);
}

function setStatus(mode, text) {
  elements.statusPill.className = `status-pill ${mode}`;
  elements.statusPill.textContent = text;
}

function triggerHapticFeedback(duration = 10) {
  try {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(duration);
    }
  } catch {
    // Ignore unsupported haptics or browser restrictions.
  }
}

function playRadioClick(type = "press") {
  try {
    const context = getUiAudioContext();
    if (!context) return;
    if (context.state === "suspended") {
      context.resume().catch(() => {});
    }

    const now = context.currentTime + 0.002;
    const isRelease = type === "release";
    const masterGain = context.createGain();
    const filter = context.createBiquadFilter();
    const compressor = context.createDynamicsCompressor();

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(isRelease ? 980 : 860, now);
    filter.Q.value = isRelease ? 1.9 : 1.7;

    compressor.threshold.setValueAtTime(-28, now);
    compressor.knee.setValueAtTime(24, now);
    compressor.ratio.setValueAtTime(7, now);
    compressor.attack.setValueAtTime(0.002, now);
    compressor.release.setValueAtTime(0.08, now);

    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.exponentialRampToValueAtTime(isRelease ? 0.11 : 0.16, now + 0.003);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + (isRelease ? 0.085 : 0.16));

    filter.connect(compressor);
    compressor.connect(masterGain);
    masterGain.connect(context.destination);

    const toneA = context.createOscillator();
    toneA.type = isRelease ? "square" : "sawtooth";
    toneA.frequency.setValueAtTime(isRelease ? 760 : 620, now);
    toneA.frequency.exponentialRampToValueAtTime(isRelease ? 560 : 430, now + (isRelease ? 0.05 : 0.11));
    toneA.connect(filter);
    toneA.start(now);
    toneA.stop(now + (isRelease ? 0.068 : 0.128));

    const toneB = context.createOscillator();
    toneB.type = "square";
    toneB.frequency.setValueAtTime(isRelease ? 1140 : 930, now + 0.004);
    toneB.frequency.exponentialRampToValueAtTime(isRelease ? 800 : 640, now + (isRelease ? 0.052 : 0.11));
    toneB.connect(filter);
    toneB.start(now + 0.005);
    toneB.stop(now + (isRelease ? 0.062 : 0.118));

    const thump = context.createOscillator();
    const thumpGain = context.createGain();
    thump.type = "sine";
    thump.frequency.setValueAtTime(isRelease ? 180 : 150, now);
    thump.frequency.exponentialRampToValueAtTime(isRelease ? 110 : 90, now + (isRelease ? 0.045 : 0.06));
    thumpGain.gain.setValueAtTime(isRelease ? 0.05 : 0.08, now);
    thumpGain.gain.exponentialRampToValueAtTime(0.0001, now + (isRelease ? 0.045 : 0.06));
    thump.connect(thumpGain);
    thumpGain.connect(filter);
    thump.start(now);
    thump.stop(now + (isRelease ? 0.05 : 0.065));

    const noise = context.createBufferSource();
    const noiseBuffer = context.createBuffer(1, Math.max(1, Math.floor(context.sampleRate * 0.03)), context.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i += 1) {
        noiseData[i] = (Math.random() * 2 - 1) * (isRelease ? 0.14 : 0.2);
    }
    noise.buffer = noiseBuffer;

    const noiseGain = context.createGain();
    noiseGain.gain.setValueAtTime(isRelease ? 0.03 : 0.042, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + (isRelease ? 0.034 : 0.055));
    noise.connect(noiseGain);
    noiseGain.connect(filter);
    noise.start(now);
    noise.stop(now + (isRelease ? 0.034 : 0.055));
  } catch {
    // Ignore unsupported audio feedback or browser autoplay restrictions.
  }
}

function getUiAudioContext() {
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) return null;
  if (!recorderState.uiAudioContext) {
    recorderState.uiAudioContext = new AudioContextCtor();
  }
  return recorderState.uiAudioContext;
}

function resetPerformanceSummary() {
  elements.perfStt.textContent = "-- ms";
  elements.perfTranslation.textContent = "-- ms";
  elements.perfTts.textContent = "-- ms";
  elements.perfTotal.textContent = "-- ms";
}

function updatePerformanceSummary(stats) {
  elements.perfStt.textContent = formatMilliseconds(stats.sttMs);
  elements.perfTranslation.textContent = formatMilliseconds(stats.translationMs);
  elements.perfTts.textContent = formatMilliseconds(stats.ttsMs);
  elements.perfTotal.textContent = formatMilliseconds(stats.totalMs);
}

function formatMilliseconds(value) {
  return `${Math.max(0, Math.round(value || 0))} ms`;
}

function formatPerformanceSummary(stats = {}) {
  return [
    `STT: ${formatMilliseconds(stats.sttMs)}`,
    `Translation: ${formatMilliseconds(stats.translationMs)}`,
    `TTS: ${formatMilliseconds(stats.ttsMs)}`,
    `Total: ${formatMilliseconds(stats.totalMs)}`,
  ].join(" | ");
}

function buildHistoryPerformanceMarkup(stats = {}) {
  return [
    `<span>STT: ${formatMilliseconds(stats.sttMs)}</span>`,
    `<span>Translation: ${formatMilliseconds(stats.translationMs)}</span>`,
    `<span>TTS: ${formatMilliseconds(stats.ttsMs)}</span>`,
    `<span class="history-performance-total">Total: ${formatMilliseconds(stats.totalMs)}</span>`,
  ].join(" | ");
}

function renderPerformanceTrend(entries) {
  const svg = elements.perfTrendChart;
  svg.innerHTML = "";
  updatePerformanceViewButtons();
  const selectedView = appState.performanceView;
  const metricNameMap = {
    total: "Total",
    stt: "STT",
    translation: "Translation",
    tts: "TTS",
  };
  if (!entries.length) {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "320");
    text.setAttribute("y", "110");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "currentColor");
    text.setAttribute("opacity", "0.6");
    text.textContent = "No performance samples yet";
    svg.appendChild(text);
    return;
  }

  const sorted = [...entries].sort((a, b) => (a.sequence || 0) - (b.sequence || 0));
  const viewAriaLabels = {
    total: "API response time trend",
    stt: "STT response time trend",
    translation: "Translation response time trend",
    tts: "TTS response time trend",
  };
  svg.setAttribute("aria-label", viewAriaLabels[selectedView] || viewAriaLabels.total);
  const metricValues = sorted.map((entry) => getPerformanceMetric(entry.performanceStats, selectedView));
  const maxValue = Math.max(...metricValues, 1);
  const width = 640;
  const height = 220;
  const padding = { top: 24, right: 20, bottom: 38, left: 44 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const axisColor = "currentColor";
  const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const guide = document.createElementNS("http://www.w3.org/2000/svg", "line");
  const hoverGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const hoverBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  const hoverText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  const points = sorted.map((entry, index) => {
    const x = padding.left + (sorted.length === 1 ? chartWidth / 2 : (index / (sorted.length - 1)) * chartWidth);
    const metricValue = getPerformanceMetric(entry.performanceStats, selectedView);
    const y = padding.top + chartHeight - (metricValue / maxValue) * chartHeight;
    return { x, y, sequence: entry.sequence || index + 1, metricValue };
  });
  line.setAttribute("fill", "none");
  line.setAttribute("stroke", "var(--primary)");
  line.setAttribute("stroke-width", "3");
  line.setAttribute("d", points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" "));

  const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  xAxis.setAttribute("x1", `${padding.left}`);
  xAxis.setAttribute("y1", `${height - padding.bottom}`);
  xAxis.setAttribute("x2", `${width - padding.right}`);
  xAxis.setAttribute("y2", `${height - padding.bottom}`);
  xAxis.setAttribute("stroke", axisColor);
  xAxis.setAttribute("opacity", "0.2");

  const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  yAxis.setAttribute("x1", `${padding.left}`);
  yAxis.setAttribute("y1", `${padding.top}`);
  yAxis.setAttribute("x2", `${padding.left}`);
  yAxis.setAttribute("y2", `${height - padding.bottom}`);
  yAxis.setAttribute("stroke", axisColor);
  yAxis.setAttribute("opacity", "0.2");

  guide.setAttribute("y1", `${padding.top}`);
  guide.setAttribute("y2", `${height - padding.bottom}`);
  guide.setAttribute("stroke", "var(--primary)");
  guide.setAttribute("stroke-dasharray", "4 4");
  guide.setAttribute("opacity", "0");

  hoverGroup.setAttribute("opacity", "0");
  hoverBox.setAttribute("rx", "10");
  hoverBox.setAttribute("ry", "10");
  hoverBox.setAttribute("height", "28");
  hoverBox.setAttribute("fill", "var(--panel-strong)");
  hoverBox.setAttribute("stroke", "var(--line)");
  hoverText.setAttribute("y", "30");
  hoverText.setAttribute("font-size", "12");
  hoverText.setAttribute("font-weight", "700");
  hoverText.setAttribute("text-anchor", "middle");
  hoverText.setAttribute("fill", "var(--primary-deep)");
  hoverGroup.append(hoverBox, hoverText);

  svg.append(xAxis, yAxis, guide, line, hoverGroup);

  const setTrendDetail = (point) => {
    const label = `${metricNameMap[selectedView]} #${point.sequence}: ${formatMilliseconds(point.metricValue)}`;
    const x = Math.min(Math.max(point.x, 92), width - 92);
    guide.setAttribute("x1", `${point.x}`);
    guide.setAttribute("x2", `${point.x}`);
    guide.setAttribute("opacity", "0.4");
    hoverText.textContent = label;
    hoverText.setAttribute("x", `${x}`);
    const estimatedWidth = Math.max(120, label.length * 7.1);
    hoverBox.setAttribute("x", `${x - estimatedWidth / 2}`);
    hoverBox.setAttribute("y", "12");
    hoverBox.setAttribute("width", `${estimatedWidth}`);
    hoverGroup.setAttribute("opacity", "1");
  };

  const resetTrendDetail = () => {
    guide.setAttribute("opacity", "0");
    hoverGroup.setAttribute("opacity", "0");
  };

  svg.onmouseleave = resetTrendDetail;

  points.forEach((point, index) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", `${point.x}`);
    circle.setAttribute("cy", `${point.y}`);
    circle.setAttribute("r", "4");
    circle.setAttribute("fill", "var(--primary-deep)");
    circle.style.cursor = "pointer";
    const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
    title.textContent = `#${point.sequence}: ${formatMilliseconds(point.metricValue)}`;
    circle.appendChild(title);
    circle.addEventListener("mouseenter", () => setTrendDetail(point));
    circle.addEventListener("click", async () => {
      await jumpToHistorySequence(point.sequence, true);
    });
    svg.appendChild(circle);
  });

  const maxLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
  maxLabel.setAttribute("x", "2");
  maxLabel.setAttribute("y", `${padding.top - 8}`);
  maxLabel.setAttribute("font-size", "11");
  maxLabel.setAttribute("fill", axisColor);
  maxLabel.setAttribute("opacity", "0.72");
  maxLabel.textContent = formatMilliseconds(maxValue);
  svg.appendChild(maxLabel);

  const oldestLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
  oldestLabel.setAttribute("x", `${padding.left}`);
  oldestLabel.setAttribute("y", `${height - 15}`);
  oldestLabel.setAttribute("font-size", "10");
  oldestLabel.setAttribute("text-anchor", "start");
  oldestLabel.setAttribute("fill", axisColor);
  oldestLabel.setAttribute("opacity", "0.58");
  oldestLabel.textContent = "Oldest";
  svg.appendChild(oldestLabel);

  const latestLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
  latestLabel.setAttribute("x", `${width - padding.right}`);
  latestLabel.setAttribute("y", `${height - 15}`);
  latestLabel.setAttribute("font-size", "10");
  latestLabel.setAttribute("text-anchor", "end");
  latestLabel.setAttribute("fill", axisColor);
  latestLabel.setAttribute("opacity", "0.58");
  latestLabel.textContent = "Latest";
  svg.appendChild(latestLabel);
}

function getPerformanceMetric(stats = {}, view = "total") {
  if (view === "stt") return stats.sttMs || 0;
  if (view === "translation") return stats.translationMs || 0;
  if (view === "tts") return stats.ttsMs || 0;
  return stats.totalMs || 0;
}

function setPerformanceView(view) {
  appState.performanceView = view || "total";
  updatePerformanceViewButtons();
  renderHistory();
}

function updatePerformanceViewButtons() {
  elements.perfViewButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === appState.performanceView);
  });
}

function setResultText(element, text) {
  element.textContent = text;
  element.classList.toggle("empty", false);
}

function setAudioPlayer(audioBlob) {
  if (recorderState.activeAudioUrl) URL.revokeObjectURL(recorderState.activeAudioUrl);
  recorderState.activeAudioUrl = URL.createObjectURL(audioBlob);
  elements.ttsPlayer.src = recorderState.activeAudioUrl;
  elements.ttsPlayer.load();
  elements.ttsPlayer.play().catch(() => {
    log("Autoplay blocked by browser. Use the audio controls to play.");
  });
}

function cleanupRecorder() {
  elements.recordBtn.classList.remove("recording");
  elements.vuMeter.classList.remove("is-recording");
  recorderState.mediaRecorder = null;
  recorderState.stream = null;
  recorderState.chunks = [];
  recorderState.recordedMimeType = "";
  recorderState.releaseStartedAt = 0;
}

function validateBeforeRecording(settings) {
  const missing = [];
  if (!settings.sttEndpoint) missing.push("STT Endpoint");
  if (!settings.speechKey) missing.push("Speech Key");
  if (!settings.sttLocale) missing.push("STT Locale");
  if (settings.useCustomSpeech && !settings.customSpeechEndpointId) missing.push("Custom Speech Endpoint ID");
  if (!settings.translatorEndpoint) missing.push("Translator Endpoint");
  if (!settings.translatorKey) missing.push("Translator Key");
  if (!settings.translatorFrom) missing.push("Translator From");
  if (!settings.translatorTo) missing.push("Translator To");
  if (!settings.ttsEndpoint) missing.push("TTS Endpoint");
  if (!settings.ttsKey) missing.push("TTS Key");
  if (!settings.ttsLanguage) missing.push("TTS Voice Locale");
  if (!settings.ttsVoice) missing.push("TTS Voice");
  if (!settings.ttsFormat) missing.push("TTS Output Format");
  return missing;
}

function buildTranslatorUrl(settings) {
  const normalized = stripTrailingSlash(settings.translatorEndpoint);
  const url = new URL(normalized.endsWith("/translate") ? normalized : `${normalized}/translate`);
  url.searchParams.set("api-version", "3.0");
  if (settings.translatorFrom) url.searchParams.set("from", settings.translatorFrom);
  if (settings.translatorTo) url.searchParams.append("to", settings.translatorTo);
  if (settings.useCustomTranslator && settings.translatorCategory) url.searchParams.set("category", settings.translatorCategory);
  return url.toString();
}

function buildTtsUrl(endpoint) {
  const normalized = stripTrailingSlash(endpoint);
  return normalized.endsWith("/cognitiveservices/v1") ? normalized : `${normalized}/cognitiveservices/v1`;
}

function buildVoiceListUrl(endpoint) {
  const normalized = stripTrailingSlash(endpoint);
  return normalized.endsWith("/cognitiveservices/voices/list") ? normalized : `${normalized}/cognitiveservices/voices/list`;
}

function buildSsml(text, settings) {
  return `
<speak version="1.0" xml:lang="${escapeXml(settings.ttsLanguage || "en-US")}">
  <voice name="${escapeXml(settings.ttsVoice || "")}">
    <prosody rate="${escapeXml(settings.ttsRate || "+0%")}">${escapeXml(text)}</prosody>
  </voice>
</speak>`.trim();
}

function extractTranslation(response) {
  const translation = response?.[0]?.translations?.[0]?.text;
  if (!translation) throw new Error("Translator returned no translated text.");
  return translation;
}

function bindPressAndHold(element, callbacks) {
  const start = async (event) => {
    event.preventDefault();
    if (recorderState.isPressing || recorderState.pendingPressStart) return;
    recorderState.isPressing = true;
    recorderState.pressPointerId = typeof event.pointerId === "number" ? event.pointerId : null;
    if (typeof event.pointerId === "number" && element.setPointerCapture) element.setPointerCapture(event.pointerId);
    await callbacks.onPressStart();
  };
  const end = async (event) => {
    if (event?.preventDefault) event.preventDefault();
    if (recorderState.isEndingPress) return;
    if (!recorderState.isPressing && !recorderState.mediaRecorder) return;
    recorderState.isEndingPress = true;
    if (
      recorderState.pressPointerId !== null &&
      element.releasePointerCapture &&
      element.hasPointerCapture &&
      element.hasPointerCapture(recorderState.pressPointerId)
    ) {
      element.releasePointerCapture(recorderState.pressPointerId);
    }
    recorderState.pressPointerId = null;
    try {
      await callbacks.onPressEnd();
    } finally {
      recorderState.isEndingPress = false;
    }
  };
  const endIfActive = async (event) => {
    if (!recorderState.isPressing && !recorderState.mediaRecorder) return;
    await end(event);
  };
  element.addEventListener("pointerdown", start);
  element.addEventListener("pointerup", end);
  element.addEventListener("lostpointercapture", (event) => {
    if (recorderState.isPressing) end(event);
  });
  element.addEventListener("pointercancel", (event) => {
    if (recorderState.isPressing) end(event);
  });
  window.addEventListener("pointerup", endIfActive);
  window.addEventListener("mouseup", endIfActive);
  window.addEventListener("blur", endIfActive);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) endIfActive();
  });
  element.addEventListener("keydown", async (event) => {
    if ((event.code === "Space" || event.code === "Enter") && !recorderState.isPressing) await start(event);
  });
  element.addEventListener("keyup", async (event) => {
    if (event.code === "Space" || event.code === "Enter") await end(event);
  });
}

function getSupportedMimeType() {
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"];
  return candidates.find((mimeType) => typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(mimeType)) || "";
}

function stopStream(stream) {
  if (!stream) return;
  stream.getTracks().forEach((track) => track.stop());
}

async function parseJsonResponse(response, serviceName) {
  if (!response.ok) throw await createHttpError(response, serviceName);
  return await response.json();
}

async function createHttpError(response, serviceName) {
  const body = await response.text();
  return new Error(`${serviceName} request failed (${response.status} ${response.statusText})${body ? `: ${body}` : ""}`);
}

function populateSelect(select, options) {
  const currentValue = select.value;
  select.innerHTML = "";
  options.forEach((option) => {
    const node = document.createElement("option");
    node.value = option.value;
    node.textContent = option.label;
    select.appendChild(node);
  });
  if (options.some((option) => option.value === currentValue)) select.value = currentValue;
}

function populateSelectWithCustom(select, options) {
  const withCustom = [...options];
  if (!withCustom.some((option) => option.value === CUSTOM_OPTION)) {
    withCustom.push({ value: CUSTOM_OPTION, label: "Custom" });
  }
  populateSelect(select, withCustom);
}

function normalizePresetAndCustom(value, options) {
  const normalizedValue = String(value || "").trim();
  if (!normalizedValue) {
    return { value: "", preset: CUSTOM_OPTION, custom: "" };
  }
  if (options.includes(normalizedValue)) {
    return { value: normalizedValue, preset: normalizedValue, custom: "" };
  }
  return { value: normalizedValue, preset: CUSTOM_OPTION, custom: normalizedValue };
}

function log(message) {
  const line = document.createElement("div");
  line.className = "log-line";
  line.textContent = `[${new Date().toLocaleTimeString("en-US", { hour12: false })}] ${message}`;
  elements.logOutput.prepend(line);
  while (elements.logOutput.childElementCount > MAX_LOG_LINES) {
    elements.logOutput.removeChild(elements.logOutput.lastChild);
  }
}

function formatError(error) {
  return error instanceof Error ? error.message : String(error);
}

function sanitizeUrl(value) {
  return String(value || "").trim();
}

function stripTrailingSlash(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}

function formatDateTime(value) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return String(value);
  }
}

function mimeTypeToExtension(mimeType) {
  if (mimeType.includes("webm")) return "webm";
  if (mimeType.includes("ogg")) return "ogg";
  if (mimeType.includes("mp4")) return "mp4";
  if (mimeType.includes("mpeg")) return "mp3";
  return "dat";
}

function escapeXml(value) {
  return String(value || "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.addEventListener("upgradeneeded", () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(HISTORY_STORE)) {
        const store = db.createObjectStore(HISTORY_STORE, { keyPath: "id", autoIncrement: true });
        store.createIndex("createdAt", "createdAt", { unique: false });
      }
    });
    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error));
  });
}

async function withStore(mode, callback) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(HISTORY_STORE, mode);
    const store = tx.objectStore(HISTORY_STORE);
    const result = callback(store);
    tx.addEventListener("complete", () => {
      db.close();
      resolve(result);
    });
    tx.addEventListener("error", () => {
      db.close();
      reject(tx.error);
    });
  });
}

async function saveHistoryEntry(entry) {
  return withStore("readwrite", (store) => store.add(entry));
}

async function pruneHistoryEntries() {
  const entries = await getAllHistoryEntries();
  if (entries.length <= HISTORY_MAX_ITEMS) {
    return;
  }

  const sortedAscending = [...entries].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const overflowEntries = sortedAscending.slice(0, entries.length - HISTORY_MAX_ITEMS);
  await withStore("readwrite", (store) => {
    overflowEntries.forEach((entry) => store.delete(entry.id));
  });
}

async function getNextHistorySequence() {
  const entries = await getAllHistoryEntries();
  const maxSequence = entries.reduce((maxValue, entry) => Math.max(maxValue, entry.sequence || 0), 0);
  return maxSequence + 1;
}

async function getAllHistoryEntries() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(HISTORY_STORE, "readonly");
    const store = tx.objectStore(HISTORY_STORE);
    const request = store.getAll();
    request.addEventListener("success", () => {
      const ascending = [...request.result].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      ascending.forEach((entry, index) => {
        if (!entry.sequence) {
          entry.sequence = index + 1;
        }
      });
      const items = ascending.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      db.close();
      resolve(items);
    });
    request.addEventListener("error", () => {
      db.close();
      reject(request.error);
    });
  });
}

async function deleteHistoryEntry(id) {
  return withStore("readwrite", (store) => store.delete(id));
}

async function clearHistoryEntries() {
  return withStore("readwrite", (store) => store.clear());
}
