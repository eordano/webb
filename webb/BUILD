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
    srcs = glob(
        include = [
            "src/**/*.ts",
            "src/**/*.tsx",
        ],
    ),
    # tsconfig = ":tsconfig.json",
    deps = [
        "//kernel",
        "//protos:comms",
        "//protos:broker",
        "//utils",
        "//config",
        "//rpc",
        "//scene-api",
        # App Dependencies
        "@npm//@types/history",
        "@npm//@types/react",
        "@npm//@types/react-dom",
        "@npm//@types/react-redux",
        "@npm//@types/react-router",
        "@npm//connected-react-router",
        "@npm//history",
        "@npm//react",
        "@npm//react-dom",
        "@npm//react-redux",
        "@npm//react-router",
        "@npm//react-console-emulator",
        "@npm//redux",
        "@npm//redux-saga",
    ],
)

load("@npm_bazel_typescript//:index.bzl", "ts_devserver")
load("@npm_bazel_rollup//:index.bzl", "rollup_bundle")

rollup_bundle(
    name = "webb_roll",
    entry_point = "src/main.tsx",
    config_file = ":rollup.config.js",
    deps = [
        ":webb_code",
        "@npm//rollup-plugin-commonjs",
        "@npm//rollup-plugin-node-builtins",
        "@npm//rollup-plugin-node-globals",
        "@npm//rollup-plugin-node-resolve",
    ],
)

ts_devserver(
    name = "devserver",
    additional_root_paths = [":static"],
    entry_module = "dcl/webb/src/main",
    port = 3000,
    serving_path = "/main.js",
    static_files = ["index.html"],
    deps = [
        ":webb_roll",
        "//config",
        "//protos:broker_lib",
        "//protos:comms_lib",
        "//rpc",
        "//scene-api",
        "//utils",
        "@npm//events:events__umd",
        "@npm//history:history__umd",
        "@npm//react:react__umd",
        "@npm//react-dom:react-dom__umd",
        "@npm//react-router:react-router__umd",
        "@npm//redux:redux__umd",
        "@npm//redux-saga:redux-saga__umd",
        "@npm//uuid:uuid__umd",
    ],
)
