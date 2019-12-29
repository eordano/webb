package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

filegroup(
    name = "static",
    srcs = glob(
        include = [
            "static/**/*",
            "static/ethereum-cryptography/*",
        ],
    ),
)

load("@npm_bazel_typescript//:index.bzl", "ts_devserver")

ts_devserver(
    name = "devserver",
    additional_root_paths = [":static"],
    entry_module = "dcl/horus/webapp/index",
    port = 3000,
    serving_path = "/bundle.js",
    static_files = [
        "index.html",
        "static/index.css",
        ":static",
        "//gamekit:gamekit_bundle",
        "@npm//@babel/runtime",
        "@npm//babel-runtime",
        "@npm//decentraland-ui",
        "@npm//react",
        "@npm//react-dom",
        "@npm//react-redux",
        "@npm//react-router",
        "@npm//react-router-dom",
        "@npm//redux",
        "@npm//redux-saga",
        "@npm//typesafe-actions",
    ],
    deps = [
        "static/config.js",
        ":static/jsonwebtoken.js",
        "//config",
        "//gamekit",
        "//horus/webapp",
        "//kernel",
        "//protos:broker_lib",
        "//protos:comms_lib",
        "//rpc",
        "//scene-api",
        "//utils",
        "@npm//auth0-js:auth0-js__umd",
        "@npm//buffer:buffer__umd",
        "@npm//events:events__umd",
        "@npm//fp-future:fp-future__umd",
        "@npm//google-protobuf:google-protobuf__umd",
        "@npm//reselect:reselect__umd",
        "@npm//stream:stream__umd",
        "@npm//typesafe-actions:typesafe-actions__umd",
        "@npm//util:util__umd",
        "@npm//uuid:uuid__umd",
    ],
)
