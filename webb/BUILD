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
    tsconfig = ":tsconfig.json",
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
    ]
)

load("@npm_bazel_typescript//:index.bzl", "ts_devserver")

load("@npm_bazel_rollup//:index.bzl", "rollup_bundle")

rollup_bundle(
    name='webb_roll',
    srcs = [
        ":webb_code"
    ],
    deps = [
        ":webb_code",
    ],
    entry_point = "src/main.tsx",
)

ts_devserver(
    name = "devserver",
    port = 3000,
    entry_module = "dcl/webb/src/main",
    deps = [
        ":static",
        ":webb_roll",
        "//utils",
        "//config",
        "//rpc",
        "//scene-api",
        "//protos:comms_lib",
        "//protos:broker_lib",
        "@npm//history:history__umd",
        "@npm//react:react__umd",
        "@npm//react-dom:react-dom__umd",
        "@npm//react-router:react-router__umd",
        "@npm//redux:redux__umd",
        "@npm//redux-saga:redux-saga__umd",
        "@npm//@types/react-redux",
    ],
    serving_path = "/main.js",
    static_files = ["index.html"],
    additional_root_paths = [":static"],
)