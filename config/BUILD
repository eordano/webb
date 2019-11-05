package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

filegroup(
    name = "srcs",
    srcs = glob(
        include = ["**/*.ts"],
        exclude = ["node_modules/**/*"],
    ),
)

ts_library(
    name = "config",
    srcs = glob(
        include = ["**/*.ts"],
        exclude = ["node_modules/**/*"],
    ),
    module_name = "@dcl/config",
    deps = [
        "@npm//@types/events",
        "@npm//@types/node",
    ],
)

load("@npm_bazel_rollup//:index.bzl", "rollup_bundle")

rollup_bundle(
    name = "config_bundle",
    config_file = ":rollup.config.js",
    entry_point = "index.ts",
    output_dir = True,
    format = "amd",
    deps = [
        ":config",
        "@npm//rollup-plugin-json",
    ],
)
