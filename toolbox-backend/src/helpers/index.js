
export const validateData = (data) => {
  const rows = data.split('\n')
  const columns = rows[0].split(',')

  // validate columns and data in the first row
  if (
    !columns.every(
      col => col === 'file' || col === 'text' || col === 'number' || col === 'hex'
    ) || rows.length <= 1
  ) {
    return {
      isInvalid: true,
      data
    }
  }

  const obj = {
    file: rows[1].split(',')[0] // name of file
  }
  const arrLines = []
  for (let i = 1; i < rows.length; i++) {
    let lines = {}
    const values = rows[i].split(',')
    if (values.length === 4) {
      for (let j = 1; j < values.length; j++) {
        if (values[j] && values[j].length > 0) {
          switch (columns[j]) {
            case 'number':
              lines[columns[j]] = parseInt(values[j], 10)
              break
            case 'hex':
              // if your size is not 32, the line is discarded
              values[j].length === 32
                ? lines[columns[j]] = values[j]
                : lines = {}
              break
            default:
              lines[columns[j]] = values[j]
              break
          }
        }
      }
      arrLines.push(lines)
    }
  }
  obj.lines = arrLines
  return obj
}
