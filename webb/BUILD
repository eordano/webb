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
        "//decentraland/c2-data/web3/browser",
        "//kernel",
        "//protos:comms",
        "//protos:broker",
        "//utils",
        "//collections",
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
        "@npm//@babylonjs/core",
        "@npm//@babylonjs/loaders",
        "@npm//@babylonjs/materials",
        "@npm//react",
        "@npm//react-babylonjs",
        "@npm//react-reconciler",
        "@npm//react-json-tree",
        "@npm//react-dom",
        "@npm//react-redux",
        "@npm//redux",
        "@npm//redux-saga",
    ],
)

load("@npm_bazel_typescript//:index.bzl", "ts_devserver")

ts_devserver(
    name = "devserver",
    entry_module = "dcl/webb/src/index",
    port = 3000,
    scripts = [
        "@npm//fp-future:fp-future.umd.js",
        "@npm//react:react.umd.js",
        "@npm//redux:redux.umd.js",
        "@npm//redux-saga:redux-saga.umd.js",
        "@npm//typesafe-actions:typesafe-actions.umd.js",
        "@npm//events:events.umd.js",
        "@npm//util:util.umd.js",
        ":babylon-core_umd",
        ":babylon-loaders_umd",
        ":babylon-materials_umd",
        ":react-dom_umd",
        ":react-babylonjs_umd",
        ":redux-saga-effects_umd",
        ":ethereum-cryptography-sha256_umd",
    ],
    serving_path = "/bundle.js",
    static_files = [
        "index.html",
        "static/index.css",
        "static/favicon.ico",
        "static/babylonEngine/environment.dds",
        "//gamekit:gamekit_bundle",
    ],
    deps = [
        ":webb_code",
    ],
)

load("@build_bazel_rules_nodejs//internal/npm_install:npm_umd_bundle.bzl", "npm_umd_bundle")

npm_umd_bundle(
    name = "babylon-core_umd",
    package_name = "@babylonjs/core",
    entry_point = "@npm//:node_modules/@babylonjs/core/index.js",
    package = "@npm//@babylonjs/core",
)

npm_umd_bundle(
    name = "babylon-loaders_umd",
    package_name = "@babylonjs/loaders",
    entry_point = "@npm//:node_modules/@babylonjs/loaders/index.js",
    package = "@npm//@babylonjs/loaders",
)

npm_umd_bundle(
    name = "babylon-materials_umd",
    package_name = "@babylonjs/materials",
    entry_point = "@npm//:node_modules/@babylonjs/materials/index.js",
    package = "@npm//@babylonjs/materials",
)

npm_umd_bundle(
    name = "react-dom_umd",
    package_name = "react-dom",
    entry_point = "@npm//:node_modules/react-dom/index.js",
    excluded = ["react"],
    package = "@npm//react-dom",
)

npm_umd_bundle(
    name = "react-babylonjs_umd",
    package_name = "react-babylonjs",
    entry_point = "@npm//:node_modules/react-babylonjs/dist/react-babylonjs.umd.js",
    excluded = [
        "react",
        "react-dom",
        "@babylonjs/core",
        "@babylonjs/loaders",
        "@babylonjs/gui",
        "@babylonjs/inspector",
    ],
    package = "@npm//react-babylonjs",
)

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
