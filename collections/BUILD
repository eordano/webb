package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

filegroup(
    name = "collections_assets",
    srcs = glob(
        [
            "base-avatars/**/*.*",
            "README.md",
            "LICENSE",
        ],
    ),
)

filegroup(
    name = "srcs",
    srcs = glob(
        include = ["**/*.ts"],
        exclude = [
            "node_modules/**/*",
        ],
    ),
)

ts_library(
    name = "collections",
    srcs = glob(
        include = [
            "**/*.ts",
        ],
        exclude = [
            "**/*.spec.ts",
        ],
    ),
    module_name = "dcl/collections",
    deps = [
        "@npm//@types",
        "@npm//@types/node",
        "@npm//@types/tmp",
        "@npm//tmp",
    ],
)

load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")

ts_library(
    name = "collections_spec",
    srcs = glob([
        "**/*.spec.ts",
    ]),
    deps = [
        ":collections",
        "@npm//@types/chai",
        "@npm//@types/jasmine",
        "@npm//@types/node",
        "@npm//@types/sinon",
        "@npm//@types/tmp",
        "@npm//async-iterator-all",
        "@npm//async-iterator-first",
        "@npm//aws-sdk",
        "@npm//chai",
        "@npm//fp-future",
        "@npm//gltf-pipeline",
        "@npm//ipfs-unixfs-importer",
        "@npm//ipld",
        "@npm//ipld-in-memory",
        "@npm//redux-saga",
        "@npm//redux-saga-test-plan",
        "@npm//sinon",
        "@npm//tmp",
    ],
)

jasmine_node_test(
    name = "test",
    coverage = True,
    deps = [
        ":collections_assets",
        ":collections_spec",
        "@npm//jasmine",
    ],
)
