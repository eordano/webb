package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

filegroup(
    name = "sources",
    srcs = glob(
        include = [
            "*.tsx",
        ],
    ),
)

ts_library(
    name = "webapp",
    srcs = glob(
        include = [
            "*.tsx",
        ],
    ),
    deps = [
        "@npm//@types/react",
        "@npm//@types/react-dom",
        "@npm//react",
        "@npm//decentraland-ui",
        "@npm//react-dom",
    ],
)