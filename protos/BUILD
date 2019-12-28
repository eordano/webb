package(default_visibility = ["//visibility:public"])

load("@rules_proto//proto:defs.bzl", "proto_library")
load("@rules_typescript_proto//:index.bzl", "typescript_proto_library")

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
