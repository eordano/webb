package(default_visibility = ["//visibility:public"])

load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")

exports_files(
    [
        "tsconfig.json",
        "package.json",
        "tslib.package.json",
        "common.package.json",
    ],
    visibility = ["//visibility:public"],
)

filegroup(
    name = "global-tsconfig",
    srcs = ["tsconfig.json"],
)
