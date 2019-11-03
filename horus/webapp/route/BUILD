package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

filegroup(
    name = "sources",
    srcs = glob(
        include = [
            "*.ts",
            "*.tsx",
        ],
    ),
)

ts_library(
    name = "route",
    srcs = glob(
        include = [
            "*.ts",
            "*.tsx",
        ],
    ),
    deps = [
        "//horus/webapp/sail",
        "@npm//@types/defaults",
        "@npm//@types/react",
        "@npm//defaults",
        "@npm//history",
        "@npm//react",
        "@npm//decentraland-ui",
        "@npm//redux",
        "@npm//redux-saga",
    ],
)