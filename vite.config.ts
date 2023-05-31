import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import UnoCSS from "unocss/vite";
import { presetAttributify, presetUno, presetIcons } from "unocss";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: [
        "vue",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar",
          ],
        },
        {
          from: "naive-ui",
          imports: ["MenuOption", "FormRules", "FormInst "],
          type: true,
        },
      ],
      dts: "./src/auto-imports.d.ts",
      dirs: ["./src/api/**"],
    }),
    Components({
      dirs: ["src/components", "src/views"],
      resolvers: [NaiveUiResolver()],
      dts: "./src/components.d.ts",
    }),
    UnoCSS({
      presets: [presetAttributify(), presetIcons(), presetUno()],
    }),
  ],
});
