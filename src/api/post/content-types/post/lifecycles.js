module.exports = {
  async beforeCreate(event) {

    const title = event.params.data.title;
    const titleExists = await strapi.entityService.findMany(
      "api::post.post",
      {
        filters: { title },
      }
    );

    //  if (titleExists) {
    //  throw new Error("title provided has already been taken");
    // } 
  },

  afterCreate(event) {
    const { title } = event.params.data;
    const slug = title.trim().toLowerCase().replace(/\s+/g, "-");
    strapi.entityService.update("api::post.post", event.result.id, {
      data: { slug: slug },
    });
  },
};
