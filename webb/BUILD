package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")

filegroup(
    name = "sources",
    srcs = glob(
        include = [
            "src/**/*.ts",
            "src/**/*.tsx",
        ],
    ),
)

ts_library(
    name = "webb_code",
    srcs = ["src/main.tsx"],
    tsconfig = ":tsconfig.json",
    deps = [
        # App Dependencies
        "@npm//@types/react",
        "@npm//@types/react-dom",
        "@npm//react",
        "@npm//react-dom",
    ]
)

load("@npm_bazel_typescript//:index.bzl", "ts_devserver")

ts_devserver(
    name = "devserver",
    port = 3000,
    deps = [
        ":webb_code",
        "@npm//react:react__umd",
        "@npm//react-dom:react-dom__umd"
    ],
    serving_path = "/main.js",
    static_files = ["index.html"],
)