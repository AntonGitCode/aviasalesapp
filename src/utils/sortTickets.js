export const sortTicketsByCheapest = (ticketsToSort) => {
  return ticketsToSort.slice().sort((t1, t2) => t1.price - t2.price)
}

export const sortTicketsByFastest = (ticketsToSort) => {
  return ticketsToSort.slice().sort((t1, t2) => {
    const t1Duration = t1.segments.reduce((acc, { duration }) => acc + duration, 0)
    const t2Duration = t2.segments.reduce((acc, { duration }) => acc + duration, 0)
    return t1Duration - t2Duration
  })
}
