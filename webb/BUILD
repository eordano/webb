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
        "@npm//redux",
        "@npm//react-dom",
        "@npm//react-redux",
    ]
)

load("@npm_bazel_typescript//:index.bzl", "ts_devserver")

ts_devserver(
    name = "devserver",
    port = 3000,
    entry_module = "dcl/webb/src/main",
    deps = [
        ":static",
        ":webb_code",
        "@npm//react:react__umd",
        "@npm//react-dom:react-dom__umd",
        "@npm//redux:redux__umd"
    ],
    serving_path = "/main.js",
    static_files = ["index.html"],
    additional_root_paths = [":static"],
)