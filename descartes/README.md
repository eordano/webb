# descartes

> Divide each difficulty into as many parts as is feasible and necessary to resolve it.
>
> René Descartes

## Decentraland Content Server Snapshot & Caching

`descartes` is a tool to take a snapshot of the world for batch processing and evaluation.

* `bazel run //descartes:snapshot`: stores a snapshot of the content server
  - Set `DECENTRALAND_ENV` to `org`, `zone`, `today`, or the full base path of the target content server
  - Set `DESCARTES_TARGET` to the *absolute* path to save the information
  - Set `DESCARTES_MODE` to `mappings` to download only the mappings, scene.json files, and main entry point (this is the default mode).
  - Set `DESCARTES_MODE` to `full` to download all assets referred to on the deployment.
