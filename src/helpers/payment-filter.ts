export default function paymentFilter(data: any) {
  let result = data?.filter(function (currentElement) {
    return currentElement.currency.toString().indexOf('MNT') > -1;
  });
  return result;
}
