package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")

filegroup(
    name = "static",
    srcs = glob(
        include = [
            "static/**/*",
        ],
    ),
)

load("@npm_bazel_rollup//:index.bzl", "rollup_bundle")

rollup_bundle(
    name = "bundle",
    config_file = ":rollup.config.js",
    entry_point = "//horus/webapp/Sections.tsx",
    format = "amd",
    output_dir = True,
    deps = [
        "//config",
        "//gamekit",
        "//kernel",
        "//protos:broker_lib",
        "//protos:comms_lib",
        "//rpc",
        "//scene-api",
        "//synced-ecs",
        "//utils",
        "@npm//jsonwebtoken",
        "@npm//rollup-plugin-commonjs",
        "@npm//rollup-plugin-json",
        "@npm//rollup-plugin-node-builtins",
        "@npm//rollup-plugin-node-globals",
        "@npm//rollup-plugin-node-resolve",
    ],
)

load("@npm_bazel_typescript//:index.bzl", "ts_devserver")
ts_devserver(
    name = "devserver",
    additional_root_paths = [
        ":static",
        ":bundle",
    ],
    data = [
        ":static",
        ":bundle",
        "@npm//@babel/runtime",
        "@npm//babel-runtime",
        "@npm//hoist-non-react-statics",
        "@npm//prop-types",
        "@npm//react",
        "@npm//react-dom",
        "@npm//react-redux",
        "@npm//react-router-dom",
        "@npm//redux",
        "@npm//reselect",
        "@npm//redux-saga",
    ],
    entry_module = "dcl/horus/webapp/Sections",
    port = 3000,
    serving_path = "/bundle.js",
    static_files = [
        "index.html",
        "static/index.css",
    ],
    deps = [
        "static/config.js",
        "//horus/webapp",
        "//protos:broker",
        "//protos:comms",
        "@npm//auth0-js:auth0-js__umd",
        "@npm//events:events__umd",
        "@npm//fp-future:fp-future__umd",
        "@npm//google-protobuf:google-protobuf__umd",
        "@npm//history:history__umd",
        "@npm//path-to-regexp:path-to-regexp__umd",
        "@npm//react-fast-compare:react-fast-compare__umd",
        "@npm//react-inner-html:react-inner-html__umd",
        "@npm//react-is:react-is__umd",
        "@npm//typesafe-actions:typesafe-actions__umd",
        "@npm//uuid:uuid__umd",
    ],
)
