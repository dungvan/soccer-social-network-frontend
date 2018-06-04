var env = {};
if (process.env.SSN_ENV === 'development') {
    env = {
        url: 'http://localhost:3000',
        api: 'http://soccersocial.sytes.net',
        s3Endpoint: 'https://s3-ap-southeast-1.amazonaws.com/soccer-social-network/'
    }
} else {
    env = {
        url: 'http://localhost:3000',
        api: 'http://localhost',
        s3Endpoint: 'https://s3-ap-southeast-1.amazonaws.com/soccer-social-network/'
    }
}

export default env;