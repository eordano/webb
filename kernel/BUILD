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
    name = "kernel_",
    srcs = glob(
        include = [
            "index.ts",
            "**/*.ts",
        ],
        exclude = [
            "**/*.spec.ts",
        ],
    ),
    module_name = "dcl/kernel",
    deps = [
        "//config",
        "//protos:broker",
        "//protos:comms",
        "//rpc",
        "//scene-api",
        "//utils",
        "@npm//@types",
        "@npm//@types/events",
        "@npm//devtools-protocol",
        "@npm//ethereum-cryptography",
        "@npm//fp-future",
        "@npm//google-protobuf",
        "@npm//jsonwebtoken",
        "@npm//redux",
        "@npm//redux-saga",
        "@npm//reselect",
        "@npm//typesafe-actions",
        "@npm//uuid",
        "@npm//webrtc-adapter",
        "@npm//webworker-threads",
    ],
)

load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")

ts_library(
    name = "kernel_spec",
    srcs = glob([
        "**/*.spec.ts",
    ]),
    deps = [
        ":kernel_",
        "//config",
        "//utils",
        "@npm//@types/jasmine",
        "@npm//@types/node",
        "@npm//@types/sinon",
        "@npm//ethereum-cryptography",
        "@npm//fp-future",
        "@npm//jsonwebtoken",
        "@npm//redux-saga",
        "@npm//redux-saga-test-plan",
        "@npm//sinon",
        "@npm//webworker-threads",
    ],
)

jasmine_node_test(
    name = "test",
    coverage = True,
    deps = [
        ":kernel_spec",
        "//utils",
        "@npm//jasmine",
    ],
)
