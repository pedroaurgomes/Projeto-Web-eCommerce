export const Role = {
  Newcomer: 0b001,
  Customer: 0b010,
  Admin:    0b100,

  // Marker roles
  None:     0b000,
  Any:      0b111,
};

export function userTypeToRole(type) {
  switch (type) {
    case "newcomer": return Role.Newcomer;
    case "customer": return Role.Customer;
    case "admin":    return Role.Admin;
    default:         return Role.None;
  }
}