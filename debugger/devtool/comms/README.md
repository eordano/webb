## Comms module of the Devtool

* In order to get data about comms, this module injects a `setInterval` call in the inspected window that reports
the `window.__DEBUG_PEER.stats` data stored in the main thread.

* The store for this Module is pretty simple:
    - Keeps a historic of 10-15 values (configurable through the action `setHistoryLength`)
    - Keeps two values: metric "stat" and "message". These can be seen in `types.ts`
* The visual entry poin is `CommsPanel.tsx`
