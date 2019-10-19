package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")

ts_library(
    name = "vangogh",
    srcs = glob(
        include = [
            "**/*.ts",
        ]
    ),
    module_name = "@dcl/vangogh",
    deps = [
        "//config",
        "//kernel",
        "//protos:broker",
        "//protos:comms",
        "//rpc",
        "//scene-api",
        "//synced-ecs",
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
    name = "ears",
    data = [
        ":vangogh",
        # Other modules
        "//kernel",
        "//scene-api",
        "//synced-ecs",
        "//rpc",
        "//utils",
        "//config",
        "//protos:broker",
        "//protos:comms",
        # App Dependencies
        "@npm//history",
        "@npm//fp-future",
        "@npm//google-protobuf",
        "@npm//redux",
        "@npm//node-fetch",
        "@npm//redux-saga",
        "@npm//reselect",
        "@npm//typesafe-actions",
        "@npm//typescript",
    ],
    entry_point = "ears.ts",
)
