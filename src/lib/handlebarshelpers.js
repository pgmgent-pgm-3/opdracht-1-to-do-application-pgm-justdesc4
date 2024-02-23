export default {
  em: function (options) {
    return `<em>${options.fn()}</em>`;
  },
  ifCategoryDefault: function (options, category) {
    if (category === "Default") {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },
};
