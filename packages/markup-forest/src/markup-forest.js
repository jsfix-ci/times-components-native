export const render = (renderers) => {
  const run = (tree, key = "0", indx = 0, log = false) => {
    if (log) console.log("tree:", tree, tree.children);
    const { name, attributes, children } = tree;
    const renderer = renderers[name] || renderers.unknown;
    if (log) console.log("renderer: ", renderer);
    if (!renderer) return null;
    const renderedChildren = children.map((child, index) =>
      run(child, `${key}.${index}`, index, log),
    );
    if (log) console.log("renderer:key: ", key);
    const result = renderer.call(
      renderers,
      key,
      attributes,
      renderedChildren,
      indx,
      tree,
    );
    return result;
  };
  return run;
};

export const renderTree = (tree, renderers, key = 0, indx = 0) =>
  render(renderers)(tree, key, indx);

export const renderTreeAsText = (
  { attributes: { value } = {}, children, name },
  key = "0",
) =>
  (name === "text" && value) ||
  (children
    ? children
        .map((child, index) => renderTreeAsText(child, `${key}.${index}`))
        .join("")
    : "");

export const renderTreeArrayAsText = (markupTree) =>
  markupTree.map((tree) => renderTreeAsText(tree)).join("");

export default (trees, renderers) =>
  trees.map((tree, index) => renderTree(tree, renderers, `${index}`, index));
