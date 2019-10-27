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
    tsconfig = ":tsconfig.json",
    deps = [
        "//kernel",
        "//protos:comms",
        "//protos:broker",
        "//utils",
        "//config",
        "//rpc",
        "//scene-api",
        # App Dependencies
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
load("@npm_bazel_rollup//:index.bzl", "rollup_bundle")

rollup_bundle(
    name = "main_roll",
    config_file = ":rollup.config.js",
    entry_point = "src/main.tsx",
    output_dir = True,
    format = "amd",
    deps = [
        "//config",
        "//kernel",
        "//protos:broker_lib",
        "//protos:comms_lib",
        "//rpc",
        "//scene-api",
        "//utils",
        ":webb_code",
        "@npm//jsonwebtoken",
        "@npm//rollup-plugin-commonjs",
        "@npm//rollup-plugin-json",
        "@npm//rollup-plugin-node-builtins",
        "@npm//rollup-plugin-node-globals",
        "@npm//rollup-plugin-node-resolve",
    ],
)

ts_library(
    name = "jsonwebtoken_lib",
    srcs = glob(
        include = [
            "static/vendor-jsonwebtoken/jsonwebtoken.ts"
        ],
    ),
    deps = [
        "@npm//secp256k1",
        "@npm//jsonwebtoken",
    ],
)
rollup_bundle(
    name = "jsonwebtoken",
    entry_point = "static/vendor-jsonwebtoken/jsonwebtoken.ts",
    config_file = ":rollup.jsonwebtoken.js",
    output_dir = False,
    format = "amd",
    sourcemap = 'false',
    deps = [
        ":jsonwebtoken_lib",
        "@npm//jsonwebtoken",
        "@npm//rollup-plugin-commonjs",
        "@npm//rollup-plugin-json",
        "@npm//rollup-plugin-node-globals",
        "@npm//rollup-plugin-node-resolve",
        "@npm//rollup-plugin-node-builtins",
    ],
)
ts_library(
    name = "secp256k1_lib",
    srcs = glob(
        include = [
            "static/vendor-secp256k1/secp256k1.ts"
        ],
    ),
    deps = [
        "@npm//secp256k1"
    ],
)
rollup_bundle(
    name = "secp256k1",
    entry_point = "static/vendor-secp256k1/secp256k1.ts",
    config_file = ":rollup.secp256k1.js",
    output_dir = False,
    format = "amd",
    sourcemap = 'false',
    deps = [
        ":secp256k1_lib",
        "@npm//secp256k1",
        "@npm//rollup-plugin-commonjs",
        "@npm//rollup-plugin-json",
        "@npm//rollup-plugin-node-globals",
        "@npm//rollup-plugin-node-resolve",
        "@npm//rollup-plugin-node-builtins",
    ],
)

ts_devserver(
    name = "devserver",
    additional_root_paths = [":static", ":main_roll__files"],
    entry_module = "webb/main_roll/main_roll",
    port = 3000,
    serving_path = "/bundle.js",
    static_files = ["index.html"],
    deps = [
        "static/config.js",
        "//protos:broker",
        "//protos:comms",
        "@npm//babel-runtime:babel-runtime",
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
        ":main_roll",
        ":webb_code",
        ":static",
        "//:node_modules",
        "@npm//react",
        "@npm//react-dom",
        "@npm//prop-types",
        "@npm//react-redux",
        "@npm//react-router-dom",
        "@npm//hoist-non-react-statics",
        "@npm//redux",
        "@npm//redux-saga",
        "@npm//babel-runtime",
        "@npm//@babel/runtime",
    ]
)
