import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';

export type CacheOfObservables<T> = {
    [key: string]: Observable<T>
};

export class CollectionServiceBase<T> {
    public firebasePath: string;
    public queryIndex: CacheOfObservables<Array<T>> = {};
    public objectIndex: CacheOfObservables<T> = {};

    constructor(public af: AngularFire) {}

    public byKey(key: string): Observable<T> { return this.cachedObject(key); }

    public all() { return this.cachedList('all', {}); }

    public byChildKey(orderByChild: string, equalTo: any) {
        return this.cachedList([orderByChild, equalTo], {
            orderByChild,
            equalTo,
        });
    }

    public cachedList(key: any, query: Object) {
        return this.cacheOrBuild(this.queryIndex, key, () => {
            return this.af.database.list(this.firebasePath, { query, });
        });
    }

    public cachedObject(key: string): Observable<T> {
        return this.cacheOrBuild(this.objectIndex, key, () => {
            return this.af.database.object(`${this.firebasePath}/${key}`);
        });
    }

    public cacheOrBuild(cache: CacheOfObservables<any>, key: any, builder: Function) {
        // wrap everything in Observable bc fb observable doesnt have all operators
        if (!cache[key]) { cache[key] = Observable.from(builder()); }
        return cache[key];
    }
}
