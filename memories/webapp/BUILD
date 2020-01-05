package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "webapp",
    srcs = glob(
        include = [
            "index.tsx",
        ],
    ),
    deps = [
        "//jslibs/sail",
        "@npm//@types/react",
        "@npm//@types/react-dom",
        "@npm//react",
        "@npm//react-dom",
    ],
)

filegroup(
    name = "static",
    srcs = glob(
        include = [
            "static/**/*",
            "static/ethereum-cryptography/*",
        ],
    ),
)

load("@npm_bazel_typescript//:index.bzl", "ts_devserver")

ts_devserver(
    name = "devserver",
    additional_root_paths = [":static"],
    entry_module = "dcl/memories/webapp/index",
    port = 3000,
    serving_path = "/bundle.js",
    static_files = [
        "index.html",
        "static/index.css",
        ":static",
        "@npm//react",
        "@npm//react-dom",
    ]
)