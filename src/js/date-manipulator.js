import { formatISO } from "date-fns"

export const dateSetter = {
  getCurrentDay(){
    const currentDayInISO = formatISO(new Date(), { representation: 'date' })
    return currentDayInISO
  }
}
