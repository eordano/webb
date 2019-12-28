package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

ts_library(
    name = "server_lib",
    srcs = glob(
        include = [
            "*.ts",
            "**/*.ts",
        ]
    ),
    module_name = "dcl/poi/server",
    deps = [
        "@npm//@types",
        "@npm//@types/express",
        "@npm//@types/cors",
        "@npm//@types/body-parser",
        "@npm//@types/node",
        "@npm//@types/node-fetch",
        "@npm//express",
        "@npm//cors",
        "@npm//serve",
        "@npm//body-parser",
    ],
)

nodejs_binary(
    name = "server",
    data = [
        ":server_lib",
        "@npm//express",
        "@npm//cors",
        "@npm//body-parser",
        "@npm//typescript",
    ],
    entry_point = "server.ts",
)
