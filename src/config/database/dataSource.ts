import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Role } from '../../entity/Role';
import { User } from '../../entity/User';
import { databaseValues } from '../constants/constants';

const {
    host,
    port,
    username,
    password,
    database,
} = databaseValues;

export const AppDataSource = new DataSource({
    type: 'mysql',
    host,
    port,
    username,
    password,
    database,
    synchronize: true,
    logging: false,
    entities: [Role, User],
    migrations: [],
    subscribers: [],
    dropSchema: true // Isso apagará o esquema ao iniciar
});

AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!");
        
        // Get repositories
        const roleRepository = AppDataSource.getRepository(Role);
        const userRepository = AppDataSource.getRepository(User);

        // Create roles
        const roleAdmin = roleRepository.create({ name: 'ROLE_ADMIN' });
        await roleRepository.save(roleAdmin);

        const roleUser = roleRepository.create({ name: 'ROLE_USER' });
        await roleRepository.save(roleUser);

        // Create users
        const userAdmin = userRepository.create({
            email: 'lucashtrigueiro@admin.com',
            password: User.hashPassword('123'),
            roles: [roleAdmin]
        });
        await userRepository.save(userAdmin);

        const user = userRepository.create({
            email: 'lucashtrigueiro@gmail.com',
            password: User.hashPassword('123'),
            roles: [roleUser]
        });
        await userRepository.save(user);

    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });