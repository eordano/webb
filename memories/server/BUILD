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
    module_name = "@dcl/memories/server",
    deps = [
        "@npm//@types",
        "@npm//@types/cors",
        "@npm//@types/express",
        "@npm//@types/node",
        "@npm//cors",
        "//utils",
        "@npm//express",
        "@npm//fp-future",
        "@npm//typescript",
    ],
)

nodejs_binary(
    name = "server",
    data = [
        ":server_lib",
        "//utils",
        # App Dependencies
        "@npm//express",
        "@npm//cors",
        "@npm//fp-future",
        "@npm//typescript",
    ],
    entry_point = "server.ts",
)
