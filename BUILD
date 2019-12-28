package(default_visibility = ["//visibility:public"])

load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

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

filegroup(
    name = "node_modules",
    srcs = glob(
        include = ["node_modules/**/*"],
        exclude = [
          "node_modules/test/**",
          "node_modules/docs/**",
          "node_modules/**/* */**",
          "node_modules/**/* *",
        ],
    ),
)

filegroup(
    name = "secrets",
    srcs = glob(
        include = [
            ".secret"
        ],
    ),
)