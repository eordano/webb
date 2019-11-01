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
    deps = [
        "//kernel",
        "//protos:comms",
        "//protos:broker",
        "//utils",
        "//synced-ecs",
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
        "@npm//fp-future",
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
    name = "webb_bundle",
    config_file = ":rollup.config.js",
    entry_point = "src/index.tsx",
    output_dir = True,
    format = "amd",
    deps = [
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
        "@npm//assert",
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

ts_library(
    name = "deps",
    srcs = glob(
        include = [
            "vendor/*.ts"
        ],
    ),
    deps = [
        "@npm//fp-future",
        "@npm//secp256k1",
        "@npm//@types/node",
    ]
)

rollup_bundle(
    name = "deps_bundle",
    entry_points = {
        "vendor/fp-future.ts": "fp-future",
        "vendor/events.ts": "events",
        "vendor/crypto.ts": "crypto",
        "vendor/util.ts": "util",
        "vendor/secp256k1.ts": "secp256k1",
    },
    config_file = ":rollup.deps.js",
    output_dir = True,
    format = "amd",
    sourcemap = 'false',
    deps = [
        ":deps",
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
    entry_module = "webb/src/index",
    port = 3000,
    serving_path = "/bundle.js",
    static_files = ["index.html", "static/index.css"],
    deps = [
        "static/config.js",
        "//protos:broker",
        "//protos:comms",
        "@npm//typesafe-actions:typesafe-actions__umd",
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
        ":deps_bundle",
        ":webb_bundle",
        "//rpc:rpc_bundle",
        "//config:config_bundle",
        "//utils:utils_bundle",
        "//kernel:kernel_bundle",
        "//:node_modules",
        "@npm//react",
        "@npm//react-dom",
        "@npm//reselect",
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
