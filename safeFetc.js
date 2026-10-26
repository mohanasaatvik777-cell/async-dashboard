async function safeFetch(url) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 5000);
    try {

        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) {
            return { data: null, error: "HTTP" + res.status }
        }
        const data = await res.json()
        return { data, error: null };
    } catch (err) {
        return { data: null, error: err.message };
    } finally {
        clearTimeout(timer);
    }
}

async function test() {
    console.log(await safeFetch('https://jsonplaceholder.typicode.com/posts/1'));
    console.log(await safeFetch('https://jsonplaceholder.typicode.com/posts/99999'));
    console.log(await safeFetch('https://this-domain-does-not-exist-xyz.com'));
}
test();