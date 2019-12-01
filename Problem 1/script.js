// Function for Part 2
function actualFuelFunc(mass) {
  let totalFuel = 0;
  let additionalFuel = Math.floor(mass / 3) - 2;
  while (additionalFuel > 0) {
    totalFuel = totalFuel + additionalFuel;
    additionalFuel = Math.floor(additionalFuel / 3) - 2;
  }
  return totalFuel;
}

// Part 1
const txtFile = './input.txt';
const answer = fetch(txtFile).then(resp => {
  resp.text().then(text => {
    const data = text.split('\n').filter(el => el.length > 0);
    const nums = data.map(str => parseInt(str));
    const fuelRequired = nums.map(mass => Math.floor(mass / 3) - 2);
    const totalFuelRequired = fuelRequired.reduce((prev, total) => (total += prev));
    console.log(totalFuelRequired);

    // Part 2
    const actualFuelRequired = nums.map(mass => actualFuelFunc(mass));
    const totalActualFuelRequired = actualFuelRequired.reduce((prev, total) => (total += prev));
    console.log(totalActualFuelRequired);
  });
});
