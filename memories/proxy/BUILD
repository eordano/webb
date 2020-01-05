package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

ts_library(
    name = "proxy_lib",
    srcs = glob(
        include = [
            "*.ts",
            "**/*.ts",
        ],
    ),
    module_name = "@dcl/memories/proxy",
    deps = [
        "//utils",
        "@npm//@types",
        "@npm//@types/cors",
        "@npm//@types/express",
        "@npm//@types/http-proxy",
        "@npm//@types/node",
        "@npm//cors",
        "@npm//express",
        "@npm//fp-future",
        "@npm//http-proxy",
        "@npm//typescript",
    ],
)

nodejs_binary(
    name = "proxy",
    data = [
        ":proxy_lib",
        "//utils",
        # App Dependencies
        "@npm//express",
        "@npm//http-proxy",
        "@npm//cors",
        "@npm//fp-future",
        "@npm//typescript",
    ],
    entry_point = "index.ts",
)
