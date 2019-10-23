workspace(name = "dcl")

load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

skylib_version = "0.9.0"

http_archive(
    name = "bazel_skylib",
    sha256 = "1dde365491125a3db70731e25658dfdd3bc5dbdfd11b840b3e987ecf043c7ca0",
    type = "tar.gz",
    url = "https://github.com/bazelbuild/bazel-skylib/releases/download/{}/bazel_skylib-{}.tar.gz".format(skylib_version, skylib_version),
)

load("@bazel_skylib//:workspace.bzl", "bazel_skylib_workspace")

bazel_skylib_workspace()

load("@bazel_skylib//lib:versions.bzl", "versions")

versions.check(minimum_bazel_version = "1.0.0")

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

git_repository(
    name = "bazel_javascript",
    branch = "master",
    remote = "https://github.com/zenclabs/bazel-javascript.git",
)

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "ad4be2c6f40f5af70c7edf294955f9d9a0222c8e2756109731b25f79ea2ccea0",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/0.38.3/rules_nodejs-0.38.3.tar.gz"],
)

load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories")
node_repositories(
    package_json = ["//:package.json"],
    node_version = "12.13.0",

    node_repositories = {
        "12.13.0-darwin_amd64": ("node-v12.13.0-darwin-x64.tar.gz", "node-v12.13.0-darwin-x64", "49a7374670a111b033ce16611b20fd1aafd3296bbc662b184fe8fb26a29c22cc"),
        "12.13.0-linux_amd64": ("node-v12.13.0-linux-x64.tar.gz", "node-v12.13.0-linux-x64", "c69671c89d0faa47b64bd5f37079e4480852857a9a9366ee86cdd8bc9670074a"),
        "12.13.0-windows_amd64": ("node-v12.13.0-win-x64.zip", "node-v12.13.0-win-x64", "6f920cebeecb4957b4ef0def6d9b04c49d4582864f8d1a207ce8d0665865781a"),
    },
    node_urls = [
        "https://nodejs.org/dist/v{version}/{filename}",
    ],
)

load("@build_bazel_rules_nodejs//:defs.bzl", "yarn_install")
yarn_install(
    name = "npm",
    package_json = "//:package.json",
    symlink_node_modules = False,
    yarn_lock = "//:yarn.lock",
)

load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")
install_bazel_dependencies()

load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")
ts_setup_workspace()

http_archive(
    name = "rules_typescript_proto",
    sha256 = "dc5c66ae8adac62a8fa36a49180e9ef54fc8d53a61a44abfa4b1e3c5faedb6ca",
    strip_prefix = "rules_typescript_proto-9bcb491d0c074cba737725e9086293cd7f1c7bf7",
    urls = [
        "https://github.com/Dig-Doug/rules_typescript_proto/archive/9bcb491d0c074cba737725e9086293cd7f1c7bf7.tar.gz",
    ],
)

load("@rules_typescript_proto//:index.bzl", "rules_typescript_proto_dependencies")

rules_typescript_proto_dependencies()

http_archive(
    name = "io_bazel_rules_webtesting",
    sha256 = "f89ca8e91ac53b3c61da356c685bf03e927f23b97b086cc593db8edc088c143f",
    urls = [
        "https://github.com/bazelbuild/rules_webtesting/releases/download/0.3.1/rules_webtesting.tar.gz",
    ],
)

load("@io_bazel_rules_webtesting//web:repositories.bzl", "web_test_repositories")
web_test_repositories()

load("@io_bazel_rules_webtesting//web/versioned:browsers-0.3.1.bzl", "browser_repositories")
browser_repositories(chromium=True)
