package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")

ts_library(
    name = "descartes",
    srcs = glob(
        include = [
            "**/*.ts",
        ]
    ),
    module_name = "@dcl/descartes",
    deps = [
        "//config",
        "//kernel",
        "//protos",
        "//rpc",
        "//scene-api",
        "//utils",
        "@npm//@types",
        "@npm//@types/node",
        "@npm//@types/node-fetch",
        "@npm//@types/events",
        "@npm//fp-future",
        "@npm//google-protobuf",
        "@npm//redux",
        "@npm//redux-saga",
        "@npm//reselect",
        "@npm//typesafe-actions",
        "@npm//typescript",
    ],
)

nodejs_binary(
    name = "snapshot",
    data = [
        ":descartes",
        # Other modules
        "//kernel",
        "//rpc",
        "//utils",
        "//config",
        "//protos",
        # App Dependencies
        "@npm//history",
        "@npm//fp-future",
        "@npm//google-protobuf",
        "@npm//redux",
        "@npm//redux-saga",
        "@npm//reselect",
        "@npm//typesafe-actions",
        "@npm//typescript",
    ],
    entry_point = "bin/main.ts",
)
