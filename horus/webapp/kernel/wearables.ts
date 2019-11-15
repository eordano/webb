import { Store, AnyAction } from "redux";
import { baseCatalogsLoaded, getPlatformCatalog, getExclusiveCatalog, getCatalog, isCatalogLoaded } from "dcl/kernel/passports/selectors";
import { catalogsRequest } from "dcl/kernel/passports/actions";
import { RootPassportState } from "dcl/kernel/passports/types";

function storeRequestPromise<T>(store: Store,
    requestBuilder: () => AnyAction,
    completed: (s: RootPassportState) => Boolean,
    resultBuilder: (s: RootPassportState) => T): Promise<T> {
    return new Promise(resolve => {
        const unsubscribe = store.subscribe(() => {
            if (completed(store.getState())) {
                resolve(resultBuilder(store.getState()))
                unsubscribe()
            }
        });

        store.dispatch(requestBuilder());
    });
}

export function WearablesAsPromise(store: Store) {
    return () => storeRequestPromise(store, catalogsRequest, baseCatalogsLoaded, state => [...getPlatformCatalog(state), ...getExclusiveCatalog(state)])
}

export function CatalogAsPromise(store: Store) {
    return (name: string) => storeRequestPromise(store, catalogsRequest, isCatalogLoaded(name), state => getCatalog(state, name))
}