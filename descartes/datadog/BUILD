package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")

ts_library(
    name = "datadog",
    tsconfig = "//:tsconfig.json",
    srcs = glob(
        include = [
            "*.ts",
        ]
    ),
    module_name = "@dcl/descartes/datadog",
    deps = [
        "@npm//@types/express",
        "@npm//@types/cors",
        "@npm//@types/node",
        "@npm//@types/node-fetch",
        "@npm//fp-future",
        "@npm//node-fetch",
        "@npm//express",
        "@npm//cors",
        "@npm//typescript",
    ],
)

nodejs_binary(
    name = "datadog_test",
    data = [
        ":datadog",
        "//:secrets",
        "//:tsconfig.json",
        "@npm//@types/express",
        "@npm//@types/cors",
        "@npm//@types/node",
        "@npm//@types/node-fetch",
        "@npm//fp-future",
        "@npm//node-fetch",
        "@npm//express",
        "@npm//cors",
        "@npm//typescript",
    ],
    entry_point = "getConnectedUsers.ts",
)
