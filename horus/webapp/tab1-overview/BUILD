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
    name = "tab1-overview",
    srcs = glob(
        include = [
            "*.ts",
            "*.tsx",
        ],
    ),
    deps = [
        "//horus/webapp/useFetch",
        "//horus/webapp/datefun",
        "//horus/webapp/sail",
        "//horus/webapp/route",
        "//descartes/datadog",
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
        "@npm//redux-saga",
    ],
)