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

filegroup(
    name = "sources",
    srcs = glob(
        include = [
            "**/*.ts",
            "**/*.tsx",
        ],
    ),
)

ts_library(
    name = "horus",
    srcs = glob(
        include = [
            "**/*.ts",
            "**/*.tsx",
        ],
    ),
    deps = [
        "@npm//@types/defaults",
        "@npm//@types/history",
        "@npm//@types/prop-types",
        "@npm//@types/react",
        "@npm//@types/react-dom",
        "@npm//@types/react-redux",
        "@npm//@types/react-router",
        "@npm//@types/stringify-object",
        "@npm//defaults",
        "@npm//history",
        "@npm//prop-types",
        "@npm//fp-future",
        "@npm//decentraland-ui",
        "@npm//react",
        "@npm//react-dom",
        "@npm//react-fast-compare",
        "@npm//react-inner-html",
        "@npm//react-redux",
        "@npm//react-router",
        "@npm//react-console-emulator",
        "@npm//redux",
        "@npm//redux-saga",
        "@npm//stringify-object",
    ],
)

load("@npm_bazel_typescript//:index.bzl", "ts_devserver")

ts_devserver(
    name = "devserver",
    additional_root_paths = [":static"],
    entry_module = "dcl/horus/webapp/index",
    port = 3000,
    serving_path = "/bundle.js",
    static_files = ["index.html", "static/index.css"],
    deps = [
        "static/config.js",
        ":horus",
        "@npm//typesafe-actions:typesafe-actions__umd",
        "@npm//fp-future:fp-future__umd",
        "@npm//react-is:react-is__umd",
        "@npm//react-fast-compare:react-fast-compare__umd",
        "@npm//react-inner-html:react-inner-html__umd",
        "@npm//path-to-regexp:path-to-regexp__umd",
        "@npm//uuid:uuid__umd",
        "@npm//history:history__umd",
        "@npm//events:events__umd",
        "@npm//google-protobuf:google-protobuf__umd",
        "@npm//auth0-js:auth0-js__umd",
    ],
    data = [
        ":static",
        "//:node_modules",
        "@npm//react",
        "@npm//react-dom",
        "@npm//prop-types",
        "@npm//react-redux",
        "@npm//react-router-dom",
        "@npm//decentraland-ui",
        "@npm//hoist-non-react-statics",
        "@npm//redux",
        "@npm//redux-saga",
        "@npm//babel-runtime",
        "@npm//@babel/runtime",
    ]
)
