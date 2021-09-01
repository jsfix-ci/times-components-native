/* eslint-disable global-require */

import withErrorBoundaries from "./with-error-boundaries";

export default (page) => {
  if (page === "Article") return require("./article").default;
  if (page === "AuthorProfile")
    return withErrorBoundaries(require("./author-profile").default);
  if (page === "Section")
    return withErrorBoundaries(require("./section").default);
  if (page === "Topic") return withErrorBoundaries(require("./topic").default);
  if (page === "Search")
    return withErrorBoundaries(require("./search").default);
  return withErrorBoundaries(require("./article").default);
};
