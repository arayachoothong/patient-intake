import type { NextConfig } from "next";

type WebpackRule = {
  use?: unknown;
  loader?: unknown;
  exclude?: unknown;
  oneOf?: WebpackRule[];
  rules?: WebpackRule[];
};

function loaderHint(rule: WebpackRule): string {
  try {
    return JSON.stringify({ use: rule.use, loader: rule.loader });
  } catch {
    return String(rule.loader ?? "");
  }
}

function excludeAblyFromSwc(rule: unknown): void {
  if (!rule || rule === "..." || typeof rule !== "object") return;
  const r = rule as WebpackRule;

  const hint = loaderHint(r);
  if (hint.includes("next-swc-loader") || hint.includes("flight-client-module-loader")) {
    const ablyExclude = [
      /[\\/]node_modules[\\/]ably[\\/]/,
      /[\\/]node_modules[\\/]\.pnpm[\\/]ably@[^/]+[\\/]/,
    ];
    if (Array.isArray(r.exclude)) {
      r.exclude.push(...ablyExclude);
    } else if (r.exclude) {
      r.exclude = [r.exclude, ...ablyExclude];
    } else {
      r.exclude = ablyExclude;
    }
  }

  if (Array.isArray(r.oneOf)) {
    for (const nested of r.oneOf) {
      excludeAblyFromSwc(nested);
    }
  }
  if (Array.isArray(r.rules)) {
    for (const nested of r.rules) {
      excludeAblyFromSwc(nested);
    }
  }
}

const nextConfig: NextConfig = {
  transpilePackages: ["@patient/ui", "@patient/validation"],
  serverExternalPackages: ["ably"],
  webpack: (config) => {
    for (const rule of config.module.rules) {
      excludeAblyFromSwc(rule);
    }
    return config;
  },
};

export default nextConfig;
