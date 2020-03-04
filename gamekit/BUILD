package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "gamekit",
    srcs = glob(
        include = [
            "**/*.ts",
        ],
        exclude = [
            "**/*.spec.ts",
        ],
    ),
    tsconfig = ":tsconfig.gamekit.json",
    deps = [
        "//config",
        "//rpc",
        "//scene-api",
        "//utils",
        "@npm//@types/node",
    ],
)

load("@npm_bazel_rollup//:index.bzl", "rollup_bundle")

rollup_bundle(
    name = "gamekit_bundle",
    config_file = ":rollup.config.js",
    entry_point = "GamekitFactory.ts",
    format = "iife",
    output_dir = False,
    deps = [
        ":gamekit",
        "//config",
        "//rpc",
        "//scene-api",
        "//utils",
        "@npm//fp-future",
        "@npm//google-protobuf",
        "@npm//@rollup/plugin-commonjs",
        "@npm//@rollup/plugin-json",
        "@npm//@rollup/plugin-node-resolve",
    ],
)
