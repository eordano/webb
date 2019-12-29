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
    name = "tab6-scenerepo",
    srcs = glob(
        include = [
            "*.ts",
            "*.tsx",
        ],
    ),
    deps = [
        "//horus/kernel",
        "//horus/route",
        "//jslibs/sail",
        "//kernel",
        "//rpc",
        "//synced-ecs",
        "//utils",
        "//scene-api",
        "//vangogh",
        "@npm//@types/defaults",
        "@npm//@types/react",
        "@npm//@types/react-router",
        "@npm//@types/react-router-dom",
        "@npm//decentraland-ui",
        "@npm//defaults",
        "@npm//history",
        "@npm//react",
        "@npm//react-router",
        "@npm//react-router-dom",
        "@npm//redux",
        "@npm//redux-saga",
    ],
)
