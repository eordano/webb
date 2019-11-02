package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

filegroup(
    name = "srcs",
    srcs = glob(
        include = ["**/*.ts"],
        exclude = [
            "node_modules/**/*",
            "**/*.spec.ts",
        ],
    ),
)

ts_library(
    name = "kernel",
    srcs = glob(
        include = [
            "index.ts",
            "**/*.ts",
        ],
        exclude = [
            "**/*.spec.ts",
        ],
    ),
    module_name = "@dcl/kernel",
    deps = [
        "//config",
        "//protos:comms",
        "//protos:broker",
        "//rpc",
        "//scene-api",
        "//utils",
        "@npm//@types",
        "@npm//@types/auth0-js",
        "@npm//@types/events",
        "@npm//@types/secp256k1",
        "@npm//auth0-js",
        "@npm//decentraland-auth-protocol",
        "@npm//devtools-protocol",
        "@npm//fp-future",
        "@npm//google-protobuf",
        "@npm//redux",
        "@npm//redux-saga",
        "@npm//reselect",
        "@npm//secp256k1",
        "@npm//typesafe-actions",
        "@npm//uuid",
        "@npm//webrtc-adapter",
        "@npm//webworker-threads",
    ],
)


load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")

jasmine_node_test(
    name = "test",
    coverage = True,
    deps = [
        ":kernel_spec",
        "//utils",
        "@npm//jasmine",
    ],
)

load("@npm_bazel_rollup//:index.bzl", "rollup_bundle")

ts_library(
    name = "gamekit",
    srcs = glob(
        include = [
            "scene-scripts/userSpace/**/*.ts",
        ],
        exclude = [
            "**/*.spec.ts",
        ],
    ),
    deps = [
        ":kernel",
        "//utils",
        "//config",
        "//rpc",
        "@npm//@types/node",
    ],
)


rollup_bundle(
    name = "gamekit_bundle",
    config_file = ":rollup.config.js",
    entry_point = "scene-scripts/userSpace/GamekitFactory.ts",
    output_dir = True,
    format = "amd",
    deps = [
        ":gamekit",
        "//config",
        "//rpc",
        "//scene-api",
        "//utils",
        "@npm//rollup-plugin-commonjs",
        "@npm//rollup-plugin-json",
        "@npm//rollup-plugin-node-builtins",
        "@npm//rollup-plugin-node-globals",
        "@npm//rollup-plugin-node-resolve",
    ],
)

rollup_bundle(
    name = "kernel_bundle",
    config_file = ":rollup.config.js",
    entry_point = "core/store.ts",
    output_dir = True,
    format = "amd",
    deps = [
        ":kernel",
        "//config",
        "//protos:broker_lib",
        "//protos:comms_lib",
        "//rpc",
        "//synced-ecs",
        "//scene-api",
        "//utils",
        "@npm//rollup-plugin-commonjs",
        "@npm//rollup-plugin-json",
        "@npm//rollup-plugin-node-builtins",
        "@npm//rollup-plugin-node-globals",
        "@npm//rollup-plugin-node-resolve",
    ],
)

load("//tools/npm:package.bzl", "dcl_npm_package")

dcl_npm_package(
    name = "package",
    package_layers = [
        "//:common.package.json",
        "//:tslib.package.json",
        "kernel.package.json",
    ],
    deps = [":kernel"],
)
