# Tasks API (NestJS)

API REST de gestion de tâches (stockage en mémoire).

## Lancer

```bash
npm install
npm run start:dev   # http://localhost:3000
```

Swagger : http://localhost:3000/api (JSON : `/api-json`)

## Endpoints

| Méthode | Route         | Description                     |
|---------|---------------|---------------------------------|
| GET     | `/tasks`      | Lister les tâches               |
| GET     | `/tasks/:id`  | Détail d'une tâche              |
| POST    | `/tasks`      | Créer une tâche `{ title, description? }` |
| PATCH   | `/tasks/:id`  | Changer le statut `{ done }`    |

Variables : `PORT` (défaut 3000), `CORS_ORIGIN` (défaut `http://localhost:5173`).

## Tests

```bash
npm run test:e2e
```
