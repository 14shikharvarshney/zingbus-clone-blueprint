export interface Trip {
  id: string;
  route: string;
  date: string;
  time: string;
  pnr: string;
  status: string;
  busType: string;
  seatNumber: string;
  hasUpgradeOption: boolean;
  isNewBooking?: boolean;
}