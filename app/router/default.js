module.exports = app => {
  const { router, controller } = app
  router.get('/default/index', controller.default.home.index)
  router.get('/default/getAtrticleList', controller.default.home.getAtrticleList)
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById)
}