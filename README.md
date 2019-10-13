# Decentraland Kernel: Webb Project

## Running locally

To start hacking, run:

    bazel run webb:devserver

## Project overview

Dive into the different aspects of this repository, in increasing order of dependencies:

* `utils`: sets a shared language and constants to avoid repetition and synonyms across the different subprojects
* `config`: provides the basic set of configurable options for the client
* `collections`: base data for wearable items
* `protos`: protocol buffer definitions required for the communication protocol
* `rpc`: a small JSON-RPC library that allows for different encapsulation transports for RPC calls
* `scene-api`: formerly `decentraland-ecs`, this library is exposed to developers to define the behavior of a scene
* `kernel`: a standalone, browser/node compatible library that provides the core client functionality
* `synced-ecs`: a library to provide different models of doing state synchronization among scenes
* `descartes`: a content tool to make it easier to gather data and tests about deployments
* `webb`: the unity/webgl explorer

## Copyright info

This repository is protected with a standard Apache 2 license. See the terms and conditions in the [LICENSE](https://github.com/decentraland/client/blob/master/LICENSE) file.
