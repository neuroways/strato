import { defineConfig } from "/usr/lib/sfs-assistant-dev/platform-config.js";
import excelUploadPlugin from './vite-plugin-excel-upload.js';

export default defineConfig({
  plugins: [excelUploadPlugin()]
});