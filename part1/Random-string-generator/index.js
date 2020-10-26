const randomString = () => Math.random().toString(36).slice(2);

const randomStringGen = () => {
const timestamp = new Date().toISOString();
const str = `${timestamp}: ${randomString()}-${randomString()}-${randomString()}-${randomString()}`
console.log(str);
};

setInterval(() => {
    randomStringGen()
}, 5000);

