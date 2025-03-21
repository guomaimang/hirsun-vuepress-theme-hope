import { getDirname, path } from "@vuepress/utils";
import { Logger, ensureEndingSlash } from "vuepress-shared/node";

const __dirname = getDirname(import.meta.url);

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../client/")
);

export const WORKER_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../worker/")
);

export const PLUGIN_NAME = "vuepress-plugin-search-pro";

export const logger = new Logger(PLUGIN_NAME);

export const getLocaleChunkName = (locale: string): string =>
  locale.replace(/\//g, "") || "root";
