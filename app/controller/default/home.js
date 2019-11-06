'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "api hi";
  }

  // 列表查询
  async getAtrticleList() {
    let sql = 'SELECT article.id as id ,' + 
              'article.title as title ,' +
              'article.introduce as introduce ,' +
              "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime ," +
              'article.viewCount as viewCount ,' +
              'type.typeName as typeName ' +
              'FROM article LEFT JOIN type ON article.typeId = type.id'

    const results = await this.app.mysql.query(sql)
    this.ctx.body = { data: results }
  }

  // 通过id查询文章详情
  async getArticleById() {
    let id = this.ctx.params.id

    let sql = 'SELECT article.id as id ,'+ 
              'article.title as title ,'+
              'article.introduce as introduce ,'+
              'article.articleContent as articleContent ,'+
              "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime ,"+
              'article.viewCount as viewCount ,'+
              'type.typeName as typeName ,'+
              'type.id as typeId '+
              'FROM article LEFT JOIN type ON article.typeId = type.id '+ 
              'WHERE article.id='+id

    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data: result}
  }

  // 得到类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('type')
    this.ctx.body = {data: result}
  }

  // 根据类别id获得文章列表
  async getListById() {
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id ,' + 
              'article.title as title ,' +
              'article.introduce as introduce ,' +
              "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime ," +
              'article.viewCount as viewCount ,' +
              'type.typeName as typeName ' +
              'FROM article LEFT JOIN type ON article.typeId = type.id ' + 
              'WHERE typeId='+id

    const results = await this.app.mysql.query(sql)
    this.ctx.body = { data: results }
  }


}

module.exports = HomeController;
