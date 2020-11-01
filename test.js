const colors = [
  'red',
  'blue',
  'purple',
  'yellow',
  'green',
  'orange',
  'brown',
  'black',
]

const choseColor = (number) => {
  let newColors = []
  for (i = 0; i < number; i++) {
    newColors.push(colors[i])
  }
  return newColors
}

choseColor(3)
