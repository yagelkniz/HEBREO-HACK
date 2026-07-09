# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Grammify Buddy is a Hebrew-language-learning web app (Vite + React + TypeScript + shadcn-ui + Tailwind), originally scaffolded and synced via [Lovable](https://lovable.dev/projects/15cd81cd-5ccc-42e2-bda1-2b20683dabdb). It's a large collection of standalone practice/quiz modules (verb conjugation, vocabulary, reading comprehension, pronouns, etc.) for learning Hebrew grammar, mostly presented bilingually (Hebrew/English).

## Commands

- `npm i` — install dependencies (bun.lock/bun.lockb also present; either npm or bun works)
- `npm run dev` — start Vite dev server on port 8080 (`http://localhost:8080`)
- `npm run build` — production build
- `npm run build:dev` — build in development mode
- `npm run lint` — ESLint (flat config in `eslint.config.js`)
- `npm run preview` — preview a production build

There is no test runner configured in this repo.

## Architecture

**Two navigation systems coexist in `src/App.tsx`:**
1. The root route `/` renders `src/pages/Index.tsx`, which is *not* URL-routed internally. It drives a single giant state object from `src/hooks/useIndexState.ts` (dozens of `showX`/`setShowX` booleans and a few enums like `selectedPractice`, `verbTense`, `selectedTextComp`) and passes it to `src/components/IndexRouter.tsx`. `IndexRouter` is a long if-chain that returns the one practice component whose flag is currently `true`. `resetToMainMenu()` clears every flag back to the main menu.
   - **When adding a new practice module reachable from the main menu**, you must: add a `showX`/`setShowX` (or extend an existing union) to `useIndexState.ts`, add it to `resetToMainMenu()`, add the `if (showX) return <XPractice .../>` branch in `IndexRouter.tsx`, and wire up the menu button that sets it (in `IndexMainMenu.tsx` or the relevant submenu component).
2. `/hebrew-flow/*` is a separate, actually URL-routed sub-app (nested `<Route>`s in `App.tsx` under `HebrewFlowLayout`), living in `src/components/hebrewFlow/` with its data in `src/data/hebrewFlow/`. New Hebrew Flow features should follow normal react-router conventions instead of the boolean-flag pattern above.

**Practice module conventions:**
- Most practice components live flat in `src/components/` (e.g. `PresentTenseVerbPractice.tsx`), often paired with a data file in `src/data/` or a co-located `*Data.ts`/`*Questions.ts`/`*.json` file holding the questions/vocab content. Some larger topics get their own subfolder with `Data.ts` + `Practice.tsx` (e.g. `src/components/hifil/`, `src/components/piel/`, `src/components/binyanRecognition/`, `src/data/pronounSuffixReflexive/`).
- Common props: `onBack: () => void` to return to the caller, and often `lang: "he" | "en"` for bilingual text (see the `t(he, en)` helper pattern used in `IndexRouter.tsx`).
- Hebrew text-to-speech goes through `src/lib/speakHebrew.ts` (`speakHebrew(text, rate?)` / `stopSpeech()`), which wraps the Web Speech API (`he-IL` voice) and handles async voice loading. `SpeakableText.tsx` and `TranslatableText.tsx` are reusable wrapper components built on this.
- `src/lib/shuffleArray.ts` is the shared shuffle helper used across quiz/game modules.

**UI layer:** `src/components/ui/` is the shadcn-ui primitive set (managed via `components.json`, aliases `@/components`, `@/lib`, `@/hooks`, `@/components/ui`); treat these as generated/vendor components rather than hand-rolled ones.

**Supabase:** `src/integrations/supabase/client.ts` and `types.ts` are auto-generated (comment says "do not edit directly") and point at project `uxbpuadhwuiypkqvhduw` (see `supabase/config.toml`). There are no local migrations checked in — schema changes happen through the Supabase project directly.
