/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie", "terrace"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."
 */
function calculateTicketPrice(ticketData, ticketInfo) {

  let tickType = ticketInfo.ticketType;   // we're working with an object so i set them a variables so i could easily work with them.
  let entrant = ticketInfo.entrantType;
  let theExtras = ticketInfo.extras;
  let addOns = 0

  if (ticketData[tickType] === undefined) {  // checking if the key given by ticketInfo is (general//membership) or the elusive 'other'.
    return "Ticket type 'incorrect-type' cannot be found."
  }

  if (ticketData[tickType].priceInCents[entrant] === undefined) {
    return "Entrant type 'incorrect-entrant' cannot be found."
  }

  for (let extra of theExtras) {     // there's an array in ticketInfo using loop to access it's information. luckily it's keys for ticketData
    if (ticketData.extras[extra] === undefined) {
      return "Extra type 'incorrect-extra' cannot be found."
    }
    if (ticketData.extras[extra].priceInCents[entrant]) {          
      addOns += ticketData.extras[extra].priceInCents[entrant]   // this value is .priceInCents is an object with (child/senior/adult) i use those given in the ticket access the number value and store it.
    }
  }

  let ticket = ticketData[tickType].priceInCents[entrant]
  return ticket + addOns
}

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: ["movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];
    purchaseTickets(tickets, purchases);
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

 * EXAMPLE:
    const purchases = [
      {
        ticketType: "discount", // Incorrect
        entrantType: "adult",
        extras: ["movie", "terrace"],
      }
    ]
    purchaseTickets(tickets, purchases);
    //> "Ticket type 'discount' cannot be found."
 */
function purchaseTickets(ticketData, purchases) {  // Sam suggested I rewrite it and It worked ot. I changed the location of a few variables due to scope reasons.
  let grandTotal = 0;
  let headLine = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";
  let receipt = "";      

  for (let ticketStub of purchases) {
    let tickType = ticketStub.ticketType; // gemeral
    let entrant = ticketStub.entrantType;
    let extras = ticketStub.extras;

    if (ticketData[tickType] === undefined) {
      return `Ticket type '${tickType}' cannot be found.`;
    };
    if (ticketData[tickType].priceInCents[entrant] === undefined) {
      return `Entrant type '${entrant}' cannot be found.`;
    };
    let tickCost = ticketData[tickType].priceInCents[entrant] / 100;
    let extraList = "";
    let addOns = 0;

    for (let extra of extras) {
      if (ticketData.extras[extra] === undefined) {
        return `Extra type '${extra}' cannot be found.`;
      };
      extraList += `${ticketData.extras[extra].description}`;             
      addOns += ticketData.extras[extra].priceInCents[entrant] / 100;
    };
    tickCost += addOns;    // i changed where this variable appears so it won't increase my price considerably by doubling up with repeated extras
    receipt += `\n${entrant.charAt(0).toUpperCase() + entrant.slice(1).toLowerCase()} ${ticketData[tickType].description}: $${tickCost}.00 (${extraList})`;
    grandTotal += tickCost;
  };
  return `${headLine} ${receipt}\n-------------------------------------------\nTOTAL: $${grandTotal}.00`;
};






// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
