# **CHANGE LOG**

---

## 1.0.4
1. Added `fallbackLanguage` optional property into `I18nConfig` interface
2. Added `updateFallbackLanguage(key: string)` function to update fallback language during runtime
3. Added `removeFallbackLanguage()` function to remove fallback language during runtime
4. When using `updateFallbackLanguage` if profided key is `null` or `undefined` then fallback langauge will be disabled.

## 1.0.1

1. Added font mappings for languges. Now it's possible to set fonts for each language you use.
2. Repo moved to github and it's now public. You're welcome to ask questions, feature requests or report issues.

## 1.0.0

1. Simple I18nPlugin, with base functionality
