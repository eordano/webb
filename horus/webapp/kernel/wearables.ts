import { Store } from "redux";
import { baseCatalogsLoaded, getPlatformCatalog, getExclusiveCatalog } from "dcl/kernel/passports/selectors";
import { catalogsRequest } from "dcl/kernel/passports/actions";

export function WearablesAsPromise(store: Store) {
    return function () {
        return new Promise(resolve => {
            const unsubscribe = store.subscribe(() => {
                if (baseCatalogsLoaded(store.getState())) {
                    resolve([...getPlatformCatalog(store.getState()), ...getExclusiveCatalog(store.getState())])
                    unsubscribe()
                }
            });

            store.dispatch(catalogsRequest());
        });
    }
}