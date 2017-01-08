import { EventEmitter } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable, BehaviorSubject } from 'rxjs';

export type CacheOfObservables<T> = {
    [key: string]: BehaviorSubject<T>
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
            return new BehaviorSubject<Array<T>>(JSON.parse(localStorage.getItem(key)) || []);
            // return this.af.database.list(this.firebasePath, { query, });
        });
    }

    public cachedObject(key: string) {
        return this.cacheOrBuild(this.objectIndex, key, () => {
            return new BehaviorSubject<T>(JSON.parse(localStorage.getItem(key)) || {});
            // return this.af.database.object(`${this.firebasePath}/${key}`);
        });
    }

    public cacheOrBuild(cache: CacheOfObservables<any>, key: any, builder: Function) {
        if (!cache[key]) {
            console.log('adding cached observable', key);
            cache[key] = builder();
            cache[key].subscribe(val => console.log('emitted', this.firebasePath, key, val));
            // cache[key].emit(JSON.parse(localStorage.getItem(key)));
        }
        return cache[key];
    }
}
