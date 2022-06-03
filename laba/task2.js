const fetchURL = (url) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                requestedUrl: url
            })
        }, 500)
    })
};

const urlsToFetch = [
    '/home',
    '/lib',
    '/account',
    '/friends'
];

console.log('start:');

Promise.all(urlsToFetch.map(url => fetchURL(url))).then(value =>
{
    console.log(value);
    console.log('end;');
});

