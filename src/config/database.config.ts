import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dataBaseConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'db.youha',
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
    extra: {
        dateStrings: true,
    }
};

export default dataBaseConfig;
