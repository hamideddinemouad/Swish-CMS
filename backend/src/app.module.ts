import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantsModule } from './tenants/tenants.module';
import { MembershipsModule } from './memberships/memberships.module';
import { env } from './config/env';
import { UsersModule } from './users/users.module';
import { ContentDefinitionsModule } from './content-definitions/content-definitions.module';
import { ContentEntriesModule } from './content-entries/content-entries.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: env.POSTGRES_PORT,
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TenantsModule,
    MembershipsModule,
    UsersModule,
    ContentDefinitionsModule,
    ContentEntriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
