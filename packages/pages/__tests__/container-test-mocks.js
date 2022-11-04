const basicInput = {
  name: "StandardSection",
  slices: [
    {
      name: "ContainerSlice",
      collection: {
        title: "Container title",
        slices: [
          {
            name: "LeadTwoNoPicAndTwoSlice",
          },
        ],
      },
    },
    {
      name: "LeadTwoNoPicAndTwoSlice",
    },
    {
      name: "SecondaryFourSlice",
    },
    {
      name: "SecondaryFourSlice",
    },
    {
      name: "PuffSlice",
    },
    {
      name: "SecondaryTwoAndTwoSlice",
    },
    {
      name: "SecondaryFourSlice",
    },
    {
      name: "SecondaryFourSlice",
    },
    {
      name: "SecondaryOneSlice",
    },
    {
      name: "PuffSlice",
    },
    {
      name: "ContainerSlice",
      collection: {
        title: "Container title 2",
        slices: [
          {
            name: "LeadTwoNoPicAndTwoSlice",
          },
          {
            name: "LeadTwoNoPicAndTwoSlice",
          },
          {
            name: "LeadTwoNoPicAndTwoSlice",
          },
        ],
      },
    },
    {
      name: "SecondaryTwoAndTwoSlice",
    },
    {
      name: "PuffSlice",
    },
    {
      name: "SecondaryOneSlice",
    },
  ],
};

const basicOutput = {
  name: "StandardSection",
  slices: [
    {
      name: "LeadTwoNoPicAndTwoSlice",
      isInContainer: true,
      isFirstInContainer: true,
      isLastInContainer: true,
      containerTitle: "Container title",
    },
    {
      name: "LeadTwoNoPicAndTwoSlice",
    },
    {
      name: "SecondaryFourSlice",
    },
    {
      name: "SecondaryFourSlice",
    },
    {
      name: "PuffSlice",
    },
    {
      name: "SecondaryTwoAndTwoSlice",
    },
    {
      name: "SecondaryFourSlice",
    },
    {
      name: "SecondaryFourSlice",
    },
    {
      name: "SecondaryOneSlice",
    },
    {
      name: "PuffSlice",
    },

    {
      name: "LeadTwoNoPicAndTwoSlice",
      isInContainer: true,
      isFirstInContainer: true,
      isLastInContainer: false,
      containerTitle: "Container title 2",
    },
    {
      name: "LeadTwoNoPicAndTwoSlice",
      isInContainer: true,
      isFirstInContainer: false,
      isLastInContainer: false,
      containerTitle: "Container title 2",
    },
    {
      name: "LeadTwoNoPicAndTwoSlice",
      isInContainer: true,
      isFirstInContainer: false,
      isLastInContainer: true,
      containerTitle: "Container title 2",
    },

    {
      name: "SecondaryTwoAndTwoSlice",
    },
    {
      name: "PuffSlice",
    },
    {
      name: "SecondaryOneSlice",
    },
  ],
};

export { basicInput, basicOutput };
