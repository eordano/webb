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
    name = "main_roll",
    config_file = ":rollup.config.js",
    entry_point = "src/main.tsx",
    format = "umd",
    deps = [
        ":webb_code",
        "//config",
        "//kernel",
        "//protos:broker_lib",
        "//protos:comms_lib",
        "//rpc",
        "//scene-api",
        "//utils",
        "@npm//rollup-plugin-commonjs",
        "@npm//rollup-plugin-json",
        "@npm//rollup-plugin-node-builtins",
        "@npm//rollup-plugin-node-globals",
        "@npm//rollup-plugin-node-resolve",
    ],
)

ts_devserver(
    name = "devserver",
    additional_root_paths = [":static"],
    entry_module = "main_roll",
    port = 3000,
    serving_path = "/bundle.js",
    static_files = ["index.html"],
    deps = [
        "static/r.js",
        "static/config.js",
        "@npm//react-is:react-is__umd",
        "@npm//react-fast-compare:react-fast-compare__umd",
        "@npm//react-inner-html:react-inner-html__umd",
    ],
    data = [
        ":main_roll",
        ":webb_code",
        ":static",
        "//:node_modules",
        "@npm//react",
        "@npm//react-dom",
        "@npm//redux",
        "@npm//connected-react-router",
        "@npm//redux-saga",
        "@npm//babel-runtime",
        "@npm//@babel/runtime",
    ]
)
