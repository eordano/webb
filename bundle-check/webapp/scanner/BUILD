package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "scanner",
    srcs = glob(
        include = [
            "*.ts",
            "*.tsx",
        ],
    ),
    deps = [
        "//kernel",
        "//utils",
        "@npm//@types/defaults",
        "@npm//@types/react",
        "@npm//@types/react-router",
        "@npm//@types/react-router-dom",
        "@npm//@types/d3",
        "@npm//defaults",
        "@npm//history",
        "@npm//decentraland-ui",
        "@npm//react",
        "@npm//d3",
        "@npm//react-router",
        "@npm//react-router-dom",
        "@npm//redux",
        "@npm//typesafe-actions",
        "@npm//redux-saga",
    ],
)