## connected-react-router "named umd"

Because Bazel is failing to re-compile connected-react-router as a named UMD dependency.

This is because `react-dom` is expected to be in the global scope