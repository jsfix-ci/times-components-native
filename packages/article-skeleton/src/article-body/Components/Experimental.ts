const para = {
  name: "italic",
  children: [
    {
      name: "text",
      children: [],
      attributes: {
        value: "Clarissa Eden, who ",
      },
    },
    {
      name: "link",
      children: [
        {
          name: "text",
          children: [],
          attributes: {
            value: "died on Monday at 101",
          },
        },
      ],
      attributes: {
        href:
          "https://www.thetimes.co.uk/article/clarissa-eden-countess-of-avon-dies-aged-101-g0fhbnltw",
        type: "article",
        canonicalId: "clarissa-eden-countess-of-avon-dies-aged-101-g0fhbnltw",
      },
    },
    {
      name: "text",
      children: [],
      attributes: {
        value:
          ", outlived her husband, the former prime minister, by almost 45 years. After Anthony’s death, she indulged all the cultural interests he hadn’t cared for, such as opera — both high and soap. Her friend Hugo Vickers recalled that she was a great fan of Dallas. “I think she thought it was genuine,” he said. “She liked all those oil barons talking about their daddies.”",
      },
    },
  ],
};

const componentMapFromTimesToReact = {
  text: "Text",
  link: "Link",
};

const mapTextToText = (branch, parent) => ({
  component: "Text",
  props: {
    style: {
      fontStyle: parent.name === "italic" ? "italic" : "normal",
    },
  },
  children: branch.attributes.value,
});

const mapLinkToLink = (branch, parent) => ({
  component: "Link",
  props: {
    style: {
      fontStyle: parent.name === "italic" ? "italic" : "normal",
    },
    ...branch.attributes,
  },
  children: branch.children[0].attributes.value,
});

const getReactTreeFromTimesTree = (timesTree) => {
  let reactTree = [];
  const parent = timesTree;
  timesTree.children.map((branch) => {
    const component = componentMapFromTimesToReact[branch.name];
    if (component === "Text") reactTree.push(mapTextToText(branch, parent));
    if (component === "Link") reactTree.push(mapLinkToLink(branch, parent));
  });
  return reactTree;
};

let compuutedResult = getReactTreeFromTimesTree(para);

let r = compuutedResult[0].props;

let result = [
  {
    component: "Text",
    props: {
      style: {
        fontStyle: "italic",
      },
    },
    children: "Clarissa Eden, who ",
  },
  {
    component: "Link",
    props: {
      style: {
        fontStyle: "italic",
      },
      href:
        "https://www.thetimes.co.uk/article/clarissa-eden-countess-of-avon-dies-aged-101-g0fhbnltw",
      type: "article",
      canonicalId: "clarissa-eden-countess-of-avon-dies-aged-101-g0fhbnltw",
    },
    children: "Clarissa Eden, who ",
  },
  {
    component: "Text",
    props: {
      style: {
        fontStyle: "italic",
      },
    },
    children:
      ", outlived her husband, the former prime minister, by almost 45 years. After Anthony’s death, she indulged all the cultural interests he hadn’t cared for, such as opera — both high and soap. Her friend Hugo Vickers recalled that she was a great fan of Dallas. “I think she thought it was genuine,” he said. “She liked all those oil barons talking about their daddies.”",
  },
];
