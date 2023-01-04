import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ArticleFeature } from "entities/article-feature.entity";
import { ArticlePrice } from "entities/article-price.entity";
import { Article } from "entities/аrticle.entity";
import { AddArticleDto } from "src/dtos/article/add.article.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { Repository } from "typeorm";

@Injectable()
export class ArticleService extends TypeOrmCrudService<Article> {
    constructor(
        @InjectRepository(Article)
        private readonly article: Repository<Article>,

        @InjectRepository(ArticlePrice)
        private readonly articlePrice: Repository<ArticlePrice>,

        @InjectRepository(ArticleFeature)
        private readonly articleFeature: Repository<ArticleFeature>,
    ) {
        super(article);
    }
    async createFullArticle(data: AddArticleDto): Promise<Article | ApiResponse> {
        let newAricle: Article = new Article();
        newAricle.name = data.name;
        newAricle.categoryId = data.categoryId;
        newAricle.excerpt = data.excerpt;
        newAricle.description = data.description;

        let savedArticle = await this.article.save(newAricle);
        
        let newAriclePrice: ArticlePrice = new ArticlePrice();
        newAriclePrice.articleId = savedArticle.articleId;
        newAriclePrice.price = data.price;

        await this.articlePrice.save(newAriclePrice);

        for (let feature of data.features) {
            let newArticleFeautre: ArticleFeature = new ArticleFeature();
            newArticleFeautre.articleId = savedArticle.articleId;
            newArticleFeautre.featureId = feature.featureId;
            newArticleFeautre.value     = feature.value;

            await this.articleFeature.save(newArticleFeautre);
        }
        return await this.article.findOne({where:
            {articleId: savedArticle.articleId},
                relations: {
                    category: true,
                    articleFeatures: true,
                    features: true,
                    articlePrices: true
            }}
            );
    }
}