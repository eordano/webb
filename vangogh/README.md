# van Gogh

> Great things are done by a series of small things brought together.
>
> Vincent Van Gogh

## CLI tool to take in-world snapshots and descriptions

`vangogh` is a tool that allows one to explore the world from the command line.

* `bazel run //vangogh:ears a,b t`: describes the tree of entity and components of the scene corresponding to parcel `a,b` after `t` seconds of running the scene
* `bazel run //vangogh:mouth a,b`: enter the world at coordinates `a,b` and chat with other users in that scene
* `bazel run //vangogh:eyes x,y,z a,b,c,d`: renders a screenshot by positioning the camera at the `x`,`y`,`z` coordinates and rotating according to the `a`,`b`,`c`,`d` quaternion
    * `bazel run //vangogh:eyes x,y`: renders a screenshot by spawning at the `x,y` scene and taking a snapshot

### Configuration options

- Set `DECENTRALAND_ENV` to `org`, `zone`, `today`, or the full base path of the target environment
- Set `DECENTRALAND_CONTENT` to the target URL of the content server (overrides `DECENTRALAND_ENV`)
- Set `DECENTRALAND_COMMS` to the target URL of the communications server (overrides `DECENTRALAND_ENV`), or null to prevent connecting to a comms server
