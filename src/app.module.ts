import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.configuratio';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';
import { ArticleFeature } from 'entities/article-feature.entity';
import { Article } from 'entities/аrticle.entity';
import { ArticlePrice } from 'entities/article-price.entity';
import { CartArticle } from 'entities/cart-article.entity';
import { Cart } from 'entities/cart.entity';
import { Category } from 'entities/category.entity';
import { Feature } from 'entities/feature.entity';
import { Order } from 'entities/order.entity';
import { Photo } from 'entities/photo.entity';
import { User } from 'entities/user.entity';
import { AdministratorController } from './controllers/api/administrator.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [ 
        Administrator,
        ArticleFeature,
        Article,
        ArticlePrice,
        CartArticle,
        Cart,
        Category,
        Feature,
        Order,
        Photo,
        User,
      ]
    }),
    TypeOrmModule.forFeature([ Administrator ])
  ],
  controllers: [
    AppController,
    AdministratorController
    ],
  providers: [AdministratorService],
})
export class AppModule {}
