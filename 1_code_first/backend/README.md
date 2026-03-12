# Code First

## Backend

### Apps used

- Postgres (https://www.postgresql.org/download/)
- pgAdmin 4 (https://www.pgadmin.org/download/)

### Commands

In inside root folder, to run the server:

```
bun index.ts
```

### Other commands

Generate migration

```
npx drizzle-kit generate
```

Apply migrations

```
npx drizzle-kit migrate
```

Drop migrations

```
npx drizzle-kit drop
```
