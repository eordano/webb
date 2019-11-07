package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_devserver")

filegroup(
    name = "static",
    srcs = glob(
        include = [
            "index.html",
            "static/**/*",
        ],
    ),
)

ts_devserver(
    name = "devserver",
    data = [
        ":static",
        "@npm//decentraland-ui",
        "@npm//react",
        "@npm//react-dom",
    ],
    entry_module = "dcl/poi/webapp/Home",
    port = 3000,
    serving_path = "/bundle.js",
    static_files = [
        "index.html",
        "static/config.js",
    ],
    deps = [
        ":static/config.js",
        "//poi/webapp",
    ],
)
