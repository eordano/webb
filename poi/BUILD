package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_devserver")

ts_devserver(
    name = "devserver",
    data = [
        "@npm//decentraland-ui",
        "@npm//react",
        "@npm//react-dom",
    ],
    entry_module = "webapp/Home.js",
    port = 3000,
    serving_path = "/bundle.js",
    static_files = [
        "index.html",
    ],
    deps = [
        "//poi/webapp",
        "@npm//decentraland-ui:decentraland-ui__umd",
        "@npm//react:react__umd",
        "@npm//react-dom:react-dom__umd",
    ],
)
