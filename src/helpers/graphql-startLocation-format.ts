export default function graphqlArrayFormat(data: any) {
  const arr = [];
  data &&
    data.map(element =>
      arr.push({
        id: element.node.id,
        name: element.node.name,
        region: element.node.region,
        regionName: element.node.regionName,
        type: element.node.type,
        typeName: element.node.typeName,
      })
    );
  return arr;
}
