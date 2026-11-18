# Contributing

## Development Setup

1. Fork and clone the repository.
2. Install dependencies in `server` and `client`.
3. Create `server/.env` and `client/.env` from the variables documented in [README.md](./README.md).
4. Start MongoDB, then run the backend and frontend in separate terminals.

## Workflow

1. Create a focused branch:

   ```bash
   git checkout -b feature/short-description
   ```

2. Keep changes scoped and follow the existing CommonJS backend and ES module frontend patterns.
3. Commit changes using Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, or `chore:`.
4. Run the available checks:

   ```bash
   cd client
   npm run lint
   npm run build
   ```

5. Push the branch and open a pull request describing the problem, implementation, and verification.
