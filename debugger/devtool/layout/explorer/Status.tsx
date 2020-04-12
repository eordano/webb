import React, { useCallback, useEffect, useState } from "react";
import { collapseAction, expandAction } from "./actionCreators";
import { store } from "./store";
import { EmptyTree, ExplorableTree } from "./types";

export function ExploreTree(props: {
  name: string;
  tree: ExplorableTree;
  path: string;
  offset: number;
}) {
  const { loading, hasKeys, expanded } = props.tree;

  const toggle = useCallback(
    () =>
      store.dispatch((expanded ? collapseAction : expandAction)(props.path)),
    [props.path, expanded]
  );
  return (
    <div style={{ marginLeft: props.offset + "px" }}>
      <pre onClick={toggle}>
        {loading ? "loading" : expanded ? "-" : "+"}{" "}
        {hasKeys
          ? `${props.name}: ${
              typeof props.tree.values === "object"
                ? props.tree.keys?.length + " values"
                : props.tree.values
            }`
          : `${props.name}: [?]`}
      </pre>
      {!loading &&
        hasKeys &&
        expanded &&
        typeof props.tree.values === "object" &&
        props.tree.keys!.map((name) => {
          return (
            <ExploreTree
              name={name}
              tree={props.tree.values![name]}
              path={props.path + "." + name}
              key={name}
              offset={props.offset + 8}
            />
          );
        })}
    </div>
  );
}

export function Status(props: any) {
  const [tree, setTree] = useState(EmptyTree as ExplorableTree);

  useEffect(() => {
    return store.subscribe(() => {
      setTree(store.getState());
    });
  });
  return (
    <div>
      <h2>Explorer info</h2>
      <ExploreTree name="Root" tree={tree} path="" offset={8} />
    </div>
  );
}
