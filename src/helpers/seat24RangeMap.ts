export default function set24RangeMap(seats) {
  const arr = [];
  const n = seats?.length / 3 + 1;
  for (let k = 0, i = 0; i < n; i++) {
    const row = [];

    for (let j = 0; j < 3; k++, j++) {
      if (k == 0) {
        row[j] = '1';
        j++;
        row[j] = '1';
        j++;
        row[j] = seats[k];
      } else if (k == 5) {
        row[j] = seats[k];
        j++;
      } else {
        row[j] = seats[k];
      }
    }

    arr[i] = row;
  }

  return arr;
}
