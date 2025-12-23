export function findAndAddChild(fields, parentId) {
  console.log(fields);
  console.log(parentId);

  return fields.map((field) => {
    if (field.id === parentId) {
      return {
        ...field,
        children: [
          ...field.children,
          {
            id: Date.now(),
            name: "",
            format: "randomstring",
            children: [],
          },
        ],
      };
    }
    if (field.children && field.children.length > 0) {
      return {
        ...field,
        children: findAndAddChild(field.children, parentId),
      };
    }
    return field;
  });
}
