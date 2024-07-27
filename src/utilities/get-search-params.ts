'use client';
export function getSearchParams<T>(searchString: string): T {
    const params = searchString.split('?')[1].split('&');
    let obj: T = {} as T;
    for (let i in params) {
        Object.defineProperty(obj, params[i].split('=')[0], {
            value: params[i].split('=')[1],
        });
    }
    console.log('params', obj);
    return obj;
}
