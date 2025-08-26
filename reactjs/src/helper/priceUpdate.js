import { BackendPort } from '../Const/url';

export async function priceUpdate (Pricelistcopy){
  const response = await fetch(`${BackendPort}/prices`);
  const data = await response.json();
  const prices = data.allPrices;

  if (prices) {
    // Create a Set of newNames from prices
    const newNames = new Set(prices.map((data) => data.Name));

    // Filter out items from Pricelistcopy that already exist in prices
    const filteredList = Pricelistcopy.filter((data) => !newNames.has(data.Name));

    // Combine filtered old prices with new prices
    const combinedList = [...filteredList, ...prices];

    // Sort the combined list by Id in ascending order
    const sortedList = combinedList.sort((a, b) => parseInt(a.Id) - parseInt(b.Id));

    // Update the state with the sorted list
    return sortedList;
  }

}
