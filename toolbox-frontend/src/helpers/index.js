export const formattedData = (data) => {
  let newArr = [];
  data && data.forEach(item => {
    item && item.lines && item.lines.forEach(line => {
      newArr.push({
        ...line,
        file: item.file
      });
    });
  })
  return newArr;
};