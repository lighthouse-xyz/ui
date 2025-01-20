const isCi = process.env.NODE_ENV !== undefined;
if (!isCi) {
  require("husky").install();
}
