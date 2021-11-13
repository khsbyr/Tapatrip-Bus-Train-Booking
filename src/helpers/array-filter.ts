export default function arrayFilter(data: any, value: String) {
  let result = data.filter(function (currentElement) {
    return currentElement.name.toString().indexOf(value) > -1;
  });
  return result;
}
