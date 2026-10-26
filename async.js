function getProfile() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: "Asha" });
        }, 300)
    })
}

function getJobs() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['Developer', 'Designer', 'Tester']);
        }, 500)
    })
}
function getSalaryData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Salary service down')
        }, 200)
    })
}
function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(`Timed out after ${ms} ms`)
        }, ms)
    })
}
async function main() {
    // Sequential
    let start = Date.now();
    const profile = await getProfile();
    const jobs = await getJobs();
    let time = Math.round((Date.now() - start) / 100) * 100;
    console.log(`Sequential: ${profile.name} with ${jobs.length} jobs in ~${time} ms`);
    // Parallel
    start = Date.now();
    const [p, j] = await Promise.all([getProfile(), getJobs()]);
    time = Math.round((Date.now() - start) / 100) * 100;
    console.log(`Parallel: ${p.name} with ${j.length} jobs in ~${time} ms`);
    // Promise.all with a failing service
    try {
        await Promise.all([getProfile(), getJobs(), getSalaryData()]);
    } catch (err) {
        console.log(`Promise.all failed: ${err}`);
    }
    // Promise.allSettled
    const results = await Promise.allSettled([getProfile(), getJobs(), getSalaryData()]);
    console.log(`allSettled: ${results.map(r => r.status).join(', ')}`);
    // Promise.race: jobs vs timeout(400)
    try {
        await Promise.race([getJobs(), timeout(400)]);
    } catch (err) {
        console.log(`race: ${err}`);
    }

    // Promise.race: profile vs timeout(400)
    try {
        await Promise.race([getProfile(), timeout(400)]);
        console.log('race: Asha arrived first');
    } catch (err) {
        console.log(`race: ${err}`);
    }
}

main();