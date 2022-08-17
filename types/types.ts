export type IUser = {
  id: string
  name: string
  email: string
  notes: string | null
  bookings: IBookingType[]
  transactions: ITransactions[]
}

export type IBookingType = {
  id: string
  user: IUser
  uiserId: string
  date: string
  createdAt: string
  updatedAt: string
  time: string
  total: number
  status: string
  notes: string | null
  transactions: ITransactions[]
}

export type ITransactions = {
  id: string
  datePaid: string
  amount: number
  method: string
  user: IUser
  userId: string
  booking: IBookingType
  bookingId: string
}