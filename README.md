## About this Project

On March 16, 2023, Arbitrum announced their first airdrop. I decided to build an application that would index information pertaining to the airdrop and an interface to show the statistics around the Airdrop. The application also allows you to claim your tokens if you connect your wallet.

## Getting Started

This is structured as a yarn monorepo, in anticipation that there may be more than one app. Currently, there is only one app in the `apps/web` folder, which is Next.js app. You can navigate to this folder to run it.

```
cd apps/web
```

First, install all dependencies and generate the migration:

```
yarn
yarn prisma:migrate
```

To run the development server:

```
yarn dev
```

## Environment

Please refer to the `.env.example` file the environment variables nececesary.

- `ALCHEMY_API_KEY_ARB_MAINNET` - This is an Alchemy SDK API key for Arbitrum Mainnet.
- `DATABASE_URL` - This project uses a PostgreSQL database.
