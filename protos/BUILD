package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@ts_protoc_gen//:defs.bzl", "typescript_proto_library")

proto_library(
    name = "broker_lib",
    srcs = [
        "broker.proto",
    ],
)

typescript_proto_library(
    name = "broker",
    proto = ":broker_lib",
)

proto_library(
    name = "comms_lib",
    srcs = [
        "comms.proto",
    ],
)

typescript_proto_library(
    name = "comms",
    proto = ":comms_lib",
)

load("//tools/npm:package.bzl", "dcl_npm_package")

dcl_npm_package(
    name = "package",
    srcs = [
        "broker",
        "comms",
    ],
    package_layers = [
        "//:common.package.json",
        "protos.package.json",
    ],
    deps = [":broker", ":comms"],
)

