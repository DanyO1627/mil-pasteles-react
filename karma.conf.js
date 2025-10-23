module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: [
      "src/**/*.logic.js",
      "src/**/*.logic.spec.js"
    ],
    preprocessors: {
      "src/**/*.logic.js": ["webpack", "sourcemap"],
      "src/**/*.logic.spec.js": ["webpack", "sourcemap"]
    },
    webpack: {
      mode: "development"
    },
    reporters: ["spec"],
    browsers: ["ChromeHeadless"],
    singleRun: true
  });
};


