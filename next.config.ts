import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Stop `next dev` from appending its own agent notes to the project's CLAUDE.md.
  agentRules: false,
};

export default nextConfig;
