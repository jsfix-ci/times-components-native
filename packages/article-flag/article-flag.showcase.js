import React from "react";
import ArticleFlag from "./src/ArticleFlag";
import ArticleFlags from "./src/ArticleFlags";

export default {
  children: [
    {
      component: () => <ArticleFlag color="red" title="New" />,
      name: "Article Flag (New)",
      type: "story",
    },
    {
      component: () => (
        <ArticleFlags
          flags={[
            { expiryTime: "2030-03-13T12:00:00.000Z", type: "UPDATED" },
            { expiryTime: "2030-03-14T12:00:00.000Z", type: "EXCLUSIVE" },
            { expiryTime: "2030-03-14T12:00:00.000Z", type: "NEW" },
            { expiryTime: "2030-03-14T12:00:00.000Z", type: "SPONSORED" },
          ]}
        />
      ),
      name: "Article Flags",
      type: "story",
    },
    {
      component: () => (
        <ArticleFlags
          flags={[
            { expiryTime: "2030-03-13T12:00:00.000Z", type: "UPDATED" },
            { expiryTime: "2030-03-14T12:00:00.000Z", type: "EXCLUSIVE" },
            { expiryTime: "2030-03-14T12:00:00.000Z", type: "NEW" },
            { expiryTime: "2030-03-14T12:00:00.000Z", type: "SPONSORED" },
          ]}
          withContainer
        />
      ),
      name: "Article Flags with container",
      type: "story",
    },
  ],
  name: "Primitives/Article Flag",
};
