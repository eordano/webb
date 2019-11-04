package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")

filegroup(
    name = "static",
    srcs = glob(
        include = [
            "static/**/*",
        ],
    ),
)

load("@npm_bazel_typescript//:index.bzl", "ts_devserver")

ts_devserver(
    name = "devserver",
    additional_root_paths = [":static"],
    entry_module = "dcl/horus/webapp/Sections",
    port = 3000,
    serving_path = "/bundle.js",
    static_files = ["index.html", "static/index.css"],
    deps = [
        "static/config.js",
        "//horus/webapp",
    ],
    data = [
        ":static",
        "@npm//react",
        "@npm//react-dom",
        "@npm//react-redux",
        "@npm//react-router",
        "@npm//react-router-dom",
        "@npm//typesafe-actions",
        "@npm//redux",
        "@npm//redux-saga",
        "@npm//babel-runtime",
        "@npm//decentraland-ui",
        "@npm//@babel/runtime",
    ]
)
