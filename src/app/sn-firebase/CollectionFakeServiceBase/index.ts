import { EventEmitter } from '@angular/core';
import { AngularFire } from 'angularfire2';

export type CacheOfObservables<T> = {
    [key: string]: EventEmitter<T>
};

export class CollectionFakeServiceBase<T> {
    public firebasePath: string;
    public listIndex: CacheOfObservables<Array<T>> = {};
    public objectIndex: CacheOfObservables<T> = {};

    constructor(public af: AngularFire) {}

    public byKey(key: string) { return this.cachedObject(key); }

    public all() { return this.cachedList('all', {}); }

    public byChildKey(orderByChild: string, equalTo: any) {
        return this.cachedList([orderByChild, equalTo], {
            orderByChild,
            equalTo,
        });
    }

    public cachedList(key: any, query: Object) {
        return this.cacheOrBuild(this.listIndex, key, () => {
            const e = new EventEmitter<Array<T>>();
            setTimeout(() => e.emit(JSON.parse(localStorage.getItem(key)) || []), 100);
            return e;
        });
    }

    public cachedObject(key: string) {
        return this.cacheOrBuild(this.objectIndex, key, () => {
            const e = new EventEmitter<T>();
            setTimeout(() => e.emit(JSON.parse(localStorage.getItem(key)) || {}), 100);
            return e;
        });
    }

    public cacheOrBuild(cache: CacheOfObservables<any>, key: any, builder: Function) {
        if (!cache[key]) {
            console.log('FAKE SERVICE: adding cached observable', this.firebasePath, key);
            cache[key] = builder();
        }
        return cache[key];
    }
}
