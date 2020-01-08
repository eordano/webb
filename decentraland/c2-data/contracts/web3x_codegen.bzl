load("@npm//web3x-codegen:index.bzl", _web3x = "web3x_codegen")
load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@bazel_skylib//lib:paths.bzl", "paths")

def web3x_codegen(name):
    base = paths.split_extension(name)[0]
    src = base + ".abi"
    configFilename = base + ".web3x"
    command = ('{ "outputPath": "$(RULEDIR)/tmp", "contracts": {"' + base + '": {"source": "files", "abiFile": "$(RULEDIR)/' + src + '" } } }').replace('"', '\\\"')

    native.genrule(
        name = configFilename + "_lib",
        srcs = [":" + src],
        outs = [
            configFilename,
        ],
        cmd = "echo {} > $(RULEDIR)/{}".format(
            command,
            configFilename,
        ),
    )
    _web3x(
        name = base + "_tmplib",
        data = [":" + configFilename + "_lib", ":" + src, "//:package.json"],
        outs = ["tmp/" + base + ".ts", "tmp/" + base + "Abi.ts"],
        args = ["$(RULEDIR)/" + configFilename],
    )
    native.genrule(
        name = base + "_internallib",
        srcs = [base + "_tmplib"],
        outs = [base + ".ts"],
        cmd = "sed '$$d' < $(RULEDIR)/tmp/{0}.ts > $(RULEDIR)/{0}.ts".format(base),
    )
    native.genrule(
        name = base + "_abilib",
        srcs = [base + "_tmplib"],
        outs = [base + "Abi.ts"],
        cmd = "cp $(RULEDIR)/tmp/{0} $(RULEDIR)/{0}".format(base + "Abi.ts"),
    )

    ts_library(
        name = base,
        srcs = [base + "_internallib", base + "_abilib"],
        module_name = "dcl/decentraland/c2-data/contracts/" + base,
        deps = [
            "@npm//@types",
            "@npm//web3x",
        ],
    )
