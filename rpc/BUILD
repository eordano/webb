package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "rpc",
    srcs = glob(["**/*.ts", "index.ts"]),
    module_name = "@dcl/rpc",
    deps = [
        "@npm//@types",
    ],
)

load("@npm_bazel_rollup//:index.bzl", "rollup_bundle")

rollup_bundle(
    name = "rpc_bundle",
    config_file = ":rollup.config.js",
    entry_point = "index.ts",
    output_dir = True,
    format = "umd",
    deps = [
        ":rpc",
        "@npm//rollup-plugin-json",
    ],
)

load("//tools/npm:package.bzl", "dcl_npm_package")

dcl_npm_package(
    name = "package",
    package_layers = [
        "//:common.package.json",
        "//:tslib.package.json",
        "rpc.package.json",
    ],
    deps = [
        ":rpc",
    ],
)
