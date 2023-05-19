export const sortedTicketsByCheapest = (ticketsToSort) => {
  return ticketsToSort.slice().sort((t1, t2) => t1.price - t2.price)
}
