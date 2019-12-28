package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

filegroup(
    name = "static",
    srcs = glob(
        include = [
            "static/**/*",
        ],
    ),
)

filegroup(
    name = "sources",
    srcs = glob(
        include = [
            "src/**/*.ts",
            "src/**/*.tsx",
        ],
    ),
)

ts_library(
    name = "webb_code",
    srcs = glob(
        include = [
            "src/**/*.ts",
            "src/**/*.tsx",
        ],
    ),
    deps = [
        "//kernel",
        "//protos:comms",
        "//protos:broker",
        "//utils",
        "//synced-ecs",
        "//config",
        "//vangogh",
        "//rpc",
        "//scene-api",
        # App Dependencies
        "@npm//@types/react",
        "@npm//@types/react-dom",
        "@npm//@types/react-redux",
        "@npm//ethereum-cryptography",
        "@npm//fp-future",
        "@npm//react",
        "@npm//react-dom",
        "@npm//react-redux",
        "@npm//redux",
        "@npm//redux-saga",
    ],
)

load("@npm_bazel_typescript//:index.bzl", "ts_devserver")

ts_devserver(
    name = "devserver",
    entry_module = "dcl/webb/src/main",
    port = 3000,
    scripts = [
        "@npm//fp-future:fp-future.umd.js",
        "@npm//react:react.umd.js",
        "@npm//react-dom:react-dom.umd.js",
        "@npm//react-json-tree:react-json-tree.umd.js",
        "@npm//redux:redux.umd.js",
        "@npm//redux-saga:redux-saga.umd.js",
        "@npm//typesafe-actions:typesafe-actions.umd.js",
        "@npm//events:events.umd.js",
        "@npm//util:util.umd.js",
        ":redux-saga-effects_umd",
        ":ethereum-cryptography-sha256_umd",
    ],
    serving_path = "/bundle.js",
    static_files = [
        "index.html",
        "static/index.css",
        "static/favicon.ico",
        "//gamekit:gamekit_bundle"
    ],
    deps = [
        ":webb_code",
    ],
)

load("@build_bazel_rules_nodejs//internal/npm_install:npm_umd_bundle.bzl", "npm_umd_bundle")

npm_umd_bundle(
    name = "redux-saga-effects_umd",
    package_name = "redux-saga/effects",
    entry_point = "@npm//:node_modules/redux-saga/dist/redux-saga-effects.umd.js",
    package = "@npm//redux-saga",
)

npm_umd_bundle(
    name = "ethereum-cryptography-sha256_umd",
    package_name = "ethereum-cryptography/sha256",
    entry_point = "@npm//:node_modules/ethereum-cryptography/pure/sha256.js",
    package = "@npm//ethereum-cryptography",
)
