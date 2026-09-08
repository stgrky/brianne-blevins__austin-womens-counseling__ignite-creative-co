import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: "austin-womens-counseling",
  deployment: { autoUpdates: true, appId: "h2r44iaztsn7ve6nasguqo05" },
});
