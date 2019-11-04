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
    name = "tab3-liveinfo",
    srcs = glob(
        include = [
            "*.ts",
            "*.tsx",
        ],
    ),
    deps = [
        "//kernel",
        "//horus/webapp/sail",
        "@npm//@types/defaults",
        "@npm//@types/react",
        "@npm//@types/react-router",
        "@npm//@types/react-router-dom",
        "@npm//defaults",
        "@npm//history",
        "@npm//decentraland-ui",
        "@npm//react",
        "@npm//react-router",
        "@npm//react-router-dom",
        "@npm//redux",
        "@npm//redux-saga",
    ],
)