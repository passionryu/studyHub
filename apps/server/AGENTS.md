# StudyHub Server

StudyHub server follows the backend shape used by Bix Biscuit in a smaller initial form.

## Modules

- `modules/domain`: pure Kotlin domain model and invariants
- `modules/application`: usecase services and ports
- `modules/infrastructure/persistence`: JPA and database adapters
- `modules/bootstrap/studyhub`: Spring Boot entrypoint and HTTP presentation

## Local Commands

```bash
docker compose -f docker-compose.infra.local.yml up -d
./gradlew :modules:bootstrap:studyhub:bootRun
./gradlew test
./gradlew build
./gradlew ktlintCheck
```

## Rules

- Keep domain free of Spring, DB, and web dependencies.
- Put orchestration usecases in `application`.
- Put persistence and external technology adapters under `infrastructure`.
- Keep controllers thin and convert domain/application results into response DTOs.
- Prefer explicit domain names over `Helper`, `Util`, `Manager`, `process`, or `handle`.

