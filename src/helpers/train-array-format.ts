export function availableDatesFormat(data: any) {
  const arr = [];
  data &&
    data.map(element =>
      arr.push({
        date: element.voyage_date,
      })
    );
  return arr;
}

export function ClassPublicFormat(data) {
  const arr = [];
  const n = data?.length;
  let l = data?.length - 1;
  let i1, k1;
  for (let i = 0, k = 0; i < n / 9; i++) {
    const row = [];
    for (let j = 0; j < 9; k++, j++) {
      row[j] = data[k];
      if (j >= 6) {
        row[j] = data[l];
        l--;
      }
    }
    arr[i] = row;
    i1 = i;
    k = k - 3;
    k1 = k;
  }

  return arr;
}

export function arrayFilterSeat(data: any, value: String) {
  let result =
    data &&
    data.filter(function (currentElement) {
      return currentElement.seatNumber === value;
    });
  return result;
}
