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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: env.POSTGRES_PORT,
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: false,
    }),
    TenantsModule,
    UsersModule,
    PagesModule,
    ComponentsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
