import { EventEmitter } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';

export type CacheOfObservables<T> = {
    [key: string]: EventEmitter<T>
};

export class CollectionFakeServiceBase<T> {
    public firebasePath: string;
    public queryIndex: CacheOfObservables<Array<T>> = {};
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
        return this.cacheOrBuild(this.queryIndex, key, () => {
            return new EventEmitter<Array<T>>();
            // return this.af.database.list(this.firebasePath, { query, });
        });
    }

    public cachedObject(key: string) {
        return this.cacheOrBuild(this.objectIndex, key, () => {
            return new EventEmitter<T>();
            // return this.af.database.object(`${this.firebasePath}/${key}`);
        });
    }

    public cacheOrBuild(cache: CacheOfObservables<any>, key: any, builder: Function) {
        // wrap everything in Observable bc fb observable doesnt have all operators
        if (!cache[key]) {
            console.log('adding cached observable', key);
            cache[key] = builder();
        }
        cache[key].subscribe(val => console.log('updated', `Key:${key}`, val));
        return cache[key];
    }
}
