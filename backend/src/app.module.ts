import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantsModule } from './tenants/tenants.module';
import { env } from './config/env';
import { UsersModule } from './users/users.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { ComponentsModule } from './components/components.module';
import { SetupModule } from './setup/setup.module';
//composant recuperer la liste de tout les utilisasteurs dans la base de donne
//consomation 
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(env.DATABASE_URL
        ? {
            url: env.DATABASE_URL,
          }
        : {
            host: env.POSTGRES_HOST,
            port: env.POSTGRES_PORT,
            username: env.POSTGRES_USER,
            password: env.POSTGRES_PASSWORD,
            database: env.POSTGRES_DB,
          }),
      ...(env.POSTGRES_SSL
        ? {
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {}),
      autoLoadEntities: true,
      synchronize: false,
    }),
    TenantsModule,
    UsersModule,
    PagesModule,
    ComponentsModule,
    SetupModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
