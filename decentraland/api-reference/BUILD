package(default_visibility = ["//visibility:public"])

load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

filegroup(
    name = "template",
    srcs = glob([
        "template/**/*",
    ]),
)

nodejs_binary(
    name = "build",
    entry_point = "build.js",
    args = [
        "decentraland/c1-basics",
        "decentraland/00-book/build"
    ],
    data = [
        ":template",
        "//decentraland/c1-basics",
        "@npm//typedoc",
        "@npm//typedoc-plugin-sourcefile-url",
    ],
)
