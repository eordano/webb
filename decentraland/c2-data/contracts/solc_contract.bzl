load("@npm//solc:index.bzl", _solc_contract = "solcjs")
load("@bazel_skylib//lib:paths.bzl", "paths")

def solc_contract(name):
    src = name + ".sol"
    baseFolder = "decentraland/c2-data/contracts/" + name
    folder = baseFolder + "/"
    file_prefix = folder.replace("/", "_")
    internal_output = "_internal_{}".format(name)
    temp_bin = "{0}_sol_{0}.bin".format(name)
    temp_abi = "{0}_sol_{0}.abi".format(name)
    _solc_contract(
        name = internal_output,
        data = [":" + src],
        outs = [
            file_prefix + temp_abi,
            file_prefix + temp_bin,
        ],
        args = [folder + src, "--bin", "--abi", "-o", "$(RULEDIR)"],
    )
    abi_rulename = "{}_abi".format(name)
    final_abi = "{}.abi".format(name)
    abi_command = "mv {} {}".format("$(RULEDIR)/" + file_prefix + temp_abi, "$(RULEDIR)/" + final_abi)
    native.genrule(
        name = abi_rulename,
        srcs = [":" + file_prefix + temp_abi],
        outs = [final_abi],
        tools = ["@npm//solc"],
        cmd = abi_command,
    )
    bin_rulename = "{}_bin".format(name)
    final_bin = "{}.bin".format(name)
    bin_command = "mv {} {}".format("$(RULEDIR)/" + file_prefix + temp_bin, "$(RULEDIR)/" + final_bin)
    native.genrule(
        name = bin_rulename,
        srcs = [":" + file_prefix + temp_bin],
        outs = [final_bin],
        tools = ["@npm//solc"],
        cmd = bin_command,
    )
