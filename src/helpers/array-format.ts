export function arrayFormat(data: any) {
  const result = data === undefined ? '' : data.busAllLocations.edges;
  return result;
}

export function startLocationFormat(data: any) {
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

export function stopLocationFormat(data: any) {
  const arr = [];
  data &&
    data.map(element =>
      arr.push({
        id: element.node.id,
        name: element.node.name,
      })
    );
  return arr;
}

export function endLocationFormat(data: any) {
  const arr = [];
  data &&
    data.map(element =>
      arr.push({
        id: element.node.id,
        name:
          element.node.locationEnd.name +
          ' /' +
          element.node.locationEnd.location.name +
          '/',
      })
    );
  return arr;
}

export function arrayFilterSeat(data: any, value: String, scheduleId: String) {
  let result =
    data &&
    data.filter(function (currentElement) {
      return (
        currentElement.seatNumber.indexOf(value) > -1 &&
        currentElement.scheduleId.indexOf(scheduleId) > -1
      );
    });
  return result;
}

export function arrayFilterSchedule(data: any, value: String) {
  let result =
    data &&
    data.filter(function (currentElement) {
      return currentElement.scheduleId.indexOf(value) > -1;
    });
  return result;
}
