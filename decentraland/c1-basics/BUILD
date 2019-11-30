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
    name = "c1-basics",
    srcs = glob(
        include = [
            "**/*.ts",
            "*.ts",
        ],
        exclude = [
            "**/*.spec.ts",
            "*.spec.ts",
        ],
    ),
    module_name = "dcl/decentraland/c1-basics",
    deps = [
        "//utils",
        "@npm//@types",
        "@npm//@types/node",
        "@npm//ethereum-cryptography",
    ],
)

load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")

ts_library(
    name = "c1-basics-spec",
    srcs = glob([
        "*.spec.ts",
        "**/*.spec.ts",
    ]),
    deps = [
        ":c1-basics",
        "//utils",
        "@npm//@types/chai",
        "@npm//@types/jasmine",
        "@npm//@types/node",
        "@npm//ethereum-cryptography",
        "@npm//chai",
    ],
)

jasmine_node_test(
    name = "test",
    coverage = True,
    deps = [
        ":c1-basics-spec",
        "@npm//jasmine",
    ],
)
