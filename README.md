# Autafrika Buildathon — Gestion de bibliothèque

Application Next.js (App Router) qui consomme une API de gestion de bibliothèque.

## Démarrer

```bash
npm install
cp .env.example .env   # puis renseigner BASE_API_URL et AUTH_TOKEN
npm run dev            # http://localhost:3000
```

L'API doit tourner à l'adresse indiquée dans `BASE_API_URL` (avec `http://`).

## Architecture (feature-driven)

```
app/                    Routing uniquement : pages minces qui assemblent des features
  books/page.tsx
features/               Une feature = un domaine métier = une équipe
  books/                ← feature de référence, à copier
    types.ts            Types du domaine (alignés sur l'API)
    api.ts              Appels HTTP à l'API (serveur uniquement)
    actions.ts          Server Actions : créer / modifier / supprimer
    components/         Composants propres à la feature
components/ui/          Composants visuels réutilisables (Button, Input…)
lib/axios.ts            Client HTTP partagé + gestion des erreurs
```

### Règles

1. **Les dépendances descendent** : `app → features → components / lib`.
   `components/` et `lib/` n'importent jamais une feature (ESLint bloque).
2. **Une feature est autonome** : ses endpoints, types, actions et composants
   restent dans son dossier. On évite ainsi les conflits Git entre équipes.
3. **Les pages restent minces** : pas d'appel API ni de logique dans `app/`.
4. **L'API n'est appelée que côté serveur** (`api.ts` importe `server-only`) :
   le jeton n'arrive jamais dans le navigateur.
5. **Lecture** → fonction dans `api.ts` appelée par un Server Component.
   **Écriture** → Server Action dans `actions.ts`, puis `revalidatePath()`.
6. Un composant n'a `"use client"` que s'il a besoin d'interactivité
   (état, événements, hooks).

### Ajouter une feature

1. Copier `features/books/` vers `features/<nom>/` (ex. `authors`, `members`, `loans`).
2. Adapter `types.ts` et les `ENDPOINTS` de `api.ts` à la doc de l'API.
3. Créer la page `app/<nom>/page.tsx` (+ `error.tsx`).
4. Ajouter le lien dans la navigation (`app/layout.tsx`) et sur l'accueil (`app/page.tsx`).

Features suggérées : `books`, `authors`, `categories`, `members`, `loans` (emprunts).

## Travailler en équipe

- Branche de base : `develop`. `main` = version stable.
- Une branche par tâche : `feature/<nom-feature>-<tâche>` (ex. `feature/loans-liste`).
- Commits courts et explicites : `feat(loans): liste des emprunts`.
- Avant chaque PR vers `develop` : `npm run lint` et `npm run build` doivent passer.
- Une PR = une feature (ou une partie), relue par au moins une autre personne.
- Toucher un fichier partagé (`components/`, `lib/`, `app/layout.tsx`) ? Prévenir l'équipe.
