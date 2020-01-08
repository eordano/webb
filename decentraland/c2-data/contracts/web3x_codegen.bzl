load("@npm//web3x-codegen:index.bzl", _web3x = "web3x_codegen")
load("@bazel_skylib//lib:paths.bzl", "paths")

def web3x_codegen(name):
    base = paths.split_extension(name)[0]
    src = base + ".abi"
    configFilename = base + ".web3x"
    command = ('{ "outputPath": "$(RULEDIR)", "contracts": {"' + base + '": {"source": "files", "abiFile": "$(RULEDIR)/' + src + '" } } }').replace('"', '\\\"')

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
        name = base + "_contract",
        data = [":" + configFilename + "_lib", "//:package.json"],
        outs = [base + ".ts"],
        args = ["$(RULEDIR)/" + configFilename],
    )
