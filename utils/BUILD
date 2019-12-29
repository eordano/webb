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
    name = "utils",
    srcs = glob(
        include = ["**/*.ts"],
        exclude = ["**/*.spec.ts"],
    ),
    module_name = "@dcl/utils",
    tsconfig = "//:global-tsconfig",
    deps = [
        "@npm//@types",
        "@npm//ethereum-cryptography",
        "@npm//fp-future",
        "//jslibs/stableStringify",
    ],
)

load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")

ts_library(
    name = "utils_spec",
    srcs = glob([
        "**/*.spec.ts",
    ]),
    deps = [
        ":utils",
        "@npm//@types/jasmine",
        "@npm//@types/node",
        "@npm//fp-future",
    ],
)

jasmine_node_test(
    name = "test",
    coverage = True,
    deps = [
        ":utils_spec",
        "@npm//jasmine",
    ],
)

load("@npm_bazel_rollup//:index.bzl", "rollup_bundle")

rollup_bundle(
    name = "utils_bundle",
    config_file = ":rollup.config.js",
    entry_point = "index.ts",
    output_dir = True,
    format = "amd",
    deps = [
        ":utils",
        ":srcs",
        "@npm//rollup-plugin-json",
        "@npm//rollup-plugin-node-resolve",
    ],
)
