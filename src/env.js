var env = {};
if (process.env.SSN_ENV === 'development') {
    env = {
        url: 'http://localhost:3000',
        api: 'http://localhost',
        s3Endpoint: 'http://d24a855e.ngrok.io/socker-social-network-api/'
    }
} else {
    env = {
        url: 'http://localhost:3000',
        api: 'http://localhost',
        s3Endpoint: 'http://d24a855e.ngrok.io/soccer-social-network-api/'
    }
}

export default env;