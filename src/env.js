var env = {};
if (process.env.SSN_ENV === 'development') {
    env = {
        url: 'http://localhost:3000',
        api: 'http://a9eae468.ngrok.io',
        s3Endpoint: 'http://e78f6947.ngrok.io/socker-social-network-api/'
    }
} else {
    env = {
        url: 'http://localhost:3000',
        api: 'http://a9eae468.ngrok.io',
        s3Endpoint: 'http://e78f6947.ngrok.io/soccer-social-network-api/'
    }
}

export default env;