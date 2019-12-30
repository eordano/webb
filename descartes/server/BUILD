package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

ts_library(
    name = "server_lib",
    srcs = glob(
        include = [
            "*.ts",
            "**/*.ts",
        ],
    ),
    module_name = "@dcl/descartes/server",
    deps = [
        "//config",
        "//descartes",
        "//collections",
        "//descartes/datadog",
        "//descartes/metabase",
        "//kernel",
        "//protos:broker",
        "//protos:comms",
        "//rpc",
        "//scene-api",
        "//utils",
        "//vangogh",
        "@npm//@types",
        "@npm//@types/cors",
        "@npm//@types/events",
        "@npm//@types/express",
        "@npm//@types/node",
        "@npm//@types/node-fetch",
        "@npm//cors",
        "@npm//express",
        "@npm//file-type",
        "@npm//fp-future",
        "@npm//google-protobuf",
        "@npm//redux",
        "@npm//redux-saga",
        "@npm//reselect",
        "@npm//serve",
        "@npm//typesafe-actions",
        "@npm//typescript",
    ],
)

nodejs_binary(
    name = "server",
    data = [
        ":server_lib",
        "//collections:collections_assets",
        "//descartes",
        "//collections",
        "//descartes/datadog",
        "//descartes/metabase",
        "//:secrets",
        "//vangogh",
        "//kernel",
        "//rpc",
        "//utils",
        "//config",
        "//protos:broker",
        "//protos:comms",
        # App Dependencies
        "@npm//express",
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
    entry_point = "server.ts",
)
