import type { PluginFunction } from "@vuepress/core";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { addViteOptimizeDepsExclude, checkVersion } from "vuepress-shared/node";

import type { LightGalleryOptions } from "./options.js";
import { prepareLightGalleryPlugins } from "./prepare.js";
import { CLIENT_FOLDER, PLUGIN_NAME, logger } from "./utils.js";

export const lightgalleryPlugin =
  (options: LightGalleryOptions = {}): PluginFunction =>
  (app) => {
    checkVersion(app, PLUGIN_NAME, "2.0.0-beta.63");

    if (app.env.isDebug) logger.info("Options:", options);

    const plugins = options.plugins || ["pager", "share", "zoom"];

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: PLUGIN_NAME,

      define: (): Record<string, unknown> => ({
        IMAGE_SELECTOR:
          options.selector ||
          ".theme-default-content :not(a) > img:not([no-view])",
        LIGHT_GALLERY_DELAY: options.delay || 800,
        LIGHT_GALLERY_AUTOPLAY: plugins.includes("autoplay"),
        LIGHT_GALLERY_FULLSCREEN: plugins.includes("fullscreen"),
        LIGHT_GALLERY_PAGER: plugins.includes("pager"),
        LIGHT_GALLERY_THUMBNAIL: plugins.includes("thumbnail"),
        LIGHT_GALLERY_ROTATE: plugins.includes("rotate"),
        LIGHT_GALLERY_SHARE: plugins.includes("share"),
        LIGHT_GALLERY_ZOOM: plugins.includes("zoom"),
      }),

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteOptimizeDepsExclude(bundlerOptions, app, [
          "lightgallery/lightgallery.es5.js",
          ...plugins.map(
            (name) => `lightgallery/plugins/${name}/lg-${name}.es5.js`
          ),
        ]);
        addViteOptimizeDepsExclude(bundlerOptions, app, ["lightgallery"]);
      },

      onPrepared: (app): Promise<void> =>
        prepareLightGalleryPlugins(app, options.plugins),

      clientConfigFile: `${CLIENT_FOLDER}config.js`,
    };
  };
