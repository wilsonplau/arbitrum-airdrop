import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://api.thegraph.com/subgraphs/name/wilsonplau/arb-subgraph",
  documents: ["./lib/queries/*.ts"],
  generates: {
    "./lib/gql/": {
      preset: "client",
    },
  },
};
export default config;
