package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "webapp",
    srcs = glob(
        include = [
            "*.tsx",
        ],
    ),
    deps = [
        "//jslibs/sail",
        "@npm//@types/react",
        "@npm//@types/react-dom",
        "@npm//react",
        "@npm//react-dom",
        "@npm//react-markdown",
    ],
)

filegroup(
    name = "static",
    srcs = glob(
        include = [
            "index.*",
        ],
    ),
)

load("@npm_bazel_typescript//:index.bzl", "ts_devserver")

ts_devserver(
    name = "devserver",
    additional_root_paths = [":static"],
    entry_module = "dcl/memories/webapp/index",
    port = 9002,
    serving_path = "/bundle.js",
    static_files = [
        "index.html",
        "index.css",
        "@npm//react-markdown:react-markdown/umd/react-markdown.js",
        ":static",
    ],
    deps = [
        ":react-dom_umd",
        ":webapp",
        "@npm//react:react.umd.js",
    ],
)

load("@build_bazel_rules_nodejs//internal/npm_install:npm_umd_bundle.bzl", "npm_umd_bundle")

npm_umd_bundle(
    name = "react-dom_umd",
    package_name = "react-dom",
    entry_point = "@npm//:node_modules/react-dom/index.js",
    excluded = ["react"],
    package = "@npm//react-dom",
)
