workspace(
    name = "dcl",
    managed_directories = {"@npm": ["node_modules"]},
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
        name = "rules_proto",
            sha256 = "602e7161d9195e50246177e7c55b2f39950a9cf7366f74ed5f22fd45750cd208",
                strip_prefix = "rules_proto-97d8af4dc474595af3900dd85cb3a29ad28cc313",
                urls = [
                            "https://mirror.bazel.build/github.com/bazelbuild/rules_proto/archive/97d8af4dc474595af3900dd85cb3a29ad28cc313.tar.gz",
                                    "https://github.com/bazelbuild/rules_proto/archive/97d8af4dc474595af3900dd85cb3a29ad28cc313.tar.gz",
                                        
                    ],
                
    )
load("@rules_proto//proto:repositories.bzl", "rules_proto_dependencies", "rules_proto_toolchains")
rules_proto_dependencies()
rules_proto_toolchains()

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "c9e59009049fa42198f7087b80398fc4b2698a0f0c7fdde4fb3540c899c9b309",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/1.4.0/rules_nodejs-1.4.0.tar.gz"],
)

load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories")

node_repositories(
    node_repositories = {
        "10.16.3-darwin_amd64": ("node-v10.16.3-darwin-x64.tar.gz", "node-v10.16.3-darwin-x64", "6febc571e1543c2845fa919c6d06b36a24e4e142c91aedbe28b6ff7d296119e4"),
        "10.16.3-linux_amd64": ("node-v10.16.3-linux-x64.tar.xz", "node-v10.16.3-linux-x64", ""),
        "10.16.3-windows_amd64": ("node-v10.16.3-win-x64.zip", "node-v10.16.3-win-x64", ""),
    },
    node_urls = ["https://nodejs.org/dist/v{version}/{filename}"],
    node_version = "10.16.3",
    package_json = ["//:package.json"],
    yarn_repositories = {
        "1.17.3": ("yarn-v1.17.3.tar.gz", "yarn-v1.17.3", "e3835194409f1b3afa1c62ca82f561f1c29d26580c9e220c36866317e043c6f3"),
    },
    yarn_urls = ["https://github.com/yarnpkg/yarn/releases/download/v{version}/{filename}"],
    yarn_version = "1.17.3",
)

load("@build_bazel_rules_nodejs//:index.bzl", "yarn_install")

yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")

install_bazel_dependencies()

load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")

ts_setup_workspace()

http_archive(
    name = "rules_typescript_proto",
    sha256 = "56dce48f816ae5ad239b0ca5a55e7f774ca6866d3bd2306b26874445bc247eb7",
    strip_prefix = "rules_typescript_proto-0.0.4",
    urls = [
	"https://github.com/Dig-Doug/rules_typescript_proto/archive/0.0.4.tar.gz",
    ],
)

load("@rules_typescript_proto//:index.bzl", "rules_typescript_proto_dependencies")

rules_typescript_proto_dependencies()

http_archive(
    name = "io_bazel_rules_webtesting",
    sha256 = "9bb461d5ef08e850025480bab185fd269242d4e533bca75bfb748001ceb343c3",
    urls = [
        "https://github.com/bazelbuild/rules_webtesting/releases/download/0.3.3/rules_webtesting.tar.gz",
    ],
)

load("@io_bazel_rules_webtesting//web:repositories.bzl", "web_test_repositories")

web_test_repositories()

load("@io_bazel_rules_webtesting//web/versioned:browsers-0.3.1.bzl", "browser_repositories")

browser_repositories(chromium = True)
