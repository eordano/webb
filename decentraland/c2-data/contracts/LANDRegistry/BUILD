package(default_visibility = ["//visibility:public"])

load("//decentraland/c2-data/contracts:solc_contract.bzl", "solc_contract")
load("//decentraland/c2-data/contracts:web3x_codegen.bzl", "web3x_codegen")
load("@npm//solc4:index.bzl", _solc_4 = "solcjs")

solc_contract(
    name = "LANDRegistry",
    solc = _solc_4,
)

web3x_codegen(name = "LANDRegistry")
