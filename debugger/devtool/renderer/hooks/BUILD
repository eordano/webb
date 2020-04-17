package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "hooks",
    srcs = glob(
        include = [
            "*.ts",
            "*.tsx",
        ],
    ),
    module_name = "@dcl/debugger/devtool/renderer/hooks",
    deps = [
        "//debugger/devtool/jslibs",
    ],
)
