export default function setRangeMap(seats) {
  const arr = [];
  const n = seats.length - 5;
  let i1, k1;
  for (let i = 0, k = 0; i < n / 4; i++) {
    const row = [];
    for (let j = 0; j < 4; k++, j++) {
      row[j] = seats[k];
    }
    arr[i] = row;
    i1 = i;
    k1 = k;
  }
  const row1 = [];
  for (let j = 0; j < 5; k1++, j++) {
    row1[j] = seats[k1];
  }
  arr[i1 + 1] = row1;

  return arr;
}
