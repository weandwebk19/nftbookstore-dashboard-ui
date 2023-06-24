const TypeDictionary = {
  1: "Multiple Choice",
  2: "Heading",
  3: "Paragraph",
};

export const typeMapper = (typeNumber) => {
  return TypeDictionary[typeNumber];
};
