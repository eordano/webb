package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

ts_library(
    name = "metabase",
    tsconfig = "//:tsconfig.json",
    srcs = glob(
        include = [
            "*.ts",
        ]
    ),
    module_name = "@dcl/descartes/metabase",
    deps = [
        "@npm//@types/express",
        "@npm//@types/cors",
        "@npm//@types/node",
        "@npm//@types/node-fetch",
        "@npm//fp-future",
        "@npm//node-fetch",
        "@npm//typescript",
    ],
)
