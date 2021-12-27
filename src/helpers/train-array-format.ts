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
