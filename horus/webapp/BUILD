package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

filegroup(
    name = "sources",
    srcs = glob(
        include = [
            "Sections.tsx",
            "layout/*.ts",
            "layout/*.tsx"
        ],
    ),
)

ts_library(
    name = "webapp",
    srcs = glob(
        include = [
            "Sections.tsx",
            "layout/*.ts",
            "layout/*.tsx"
        ],
    ),
    deps = [
        "//horus/webapp/sail",
        "//horus/webapp/route",
        "//horus/webapp/tab1-overview",
        "//horus/webapp/tab2-users",
        "//horus/webapp/tab3-liveinfo",
        "//horus/webapp/tab4-assets",
        "//horus/webapp/tab5-deployments",
        "//horus/webapp/tab6-scenerepo",
        "@npm//@types/react",
        "@npm//@types/react-dom",
        "@npm//@types/react-router",
        "@npm//@types/history",
        "@npm//react",
        "@npm//react-router",
        "@npm//react-dom",
        "@npm//redbox-react",
        "@npm//history",
        "@npm//redux",
        "@npm//decentraland-ui",
    ],
)