import { loadEnvConfig } from "@next/env";
const projectDir = process.cwd();
loadEnvConfig(projectDir);

import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_SUBGRAPH_URL!,
  documents: ["./lib/queries/*.ts"],
  generates: {
    "./lib/gql/": {
      preset: "client",
    },
  },
};
export default config;
