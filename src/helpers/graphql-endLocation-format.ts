export default function graphqlArrayEndFormat(data: any) {
  const arr = [];
  data &&
    data.map(element =>
      arr.push({
        id: element.node.id,
        name: element.node.locationEnd.name,
      })
    );
  return arr;
}
