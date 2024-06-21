
export const databaseValues = {
    host: process.env.BD_HOST,
    port: Number(process.env.BD_PORT),
    username: process.env.BD_USERNAME,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE,
};


export const jwtValues = {
    secretKey: process.env.SECRET_KEY,
    expiresIn: '1h'
};


export const appValues = {
    msPort: process.env.MS_PORT
};
