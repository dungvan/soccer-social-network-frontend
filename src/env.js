var env = {};
if (process.env.SSN_ENV === 'development') {
    env = {
        url: 'http://localhost:3000',
        api: 'http://localhost',
        s3Endpoint: 'http://29574d29.ngrok.io/soccer-social-network/'
    }
} else {
    env = {
        url: 'http://localhost:3000',
        api: 'http://localhost',
        s3Endpoint: 'http://29574d29.ngrok.io/soccer-social-network/'
    }
}

export default env;