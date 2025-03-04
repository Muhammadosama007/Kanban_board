export const getActionStyle = (action) => {
    switch (action) {
        case "Created":
          return "bg-green-700 text-green-200 border border-green-500 ";
        case "Updated":
          return "bg-blue-700 text-blue-200 border border-blue-500 ";
        case "Deleted":
          return "bg-red-700 text-red-200 border border-red-500 ";
        default:
          return "bg-gray-700 text-gray-300 border border-gray-600 ";
      }
};

export const bgColor = (status) => {
  switch (status) {
    case "Todo":
        return "bg-gray-700 text-blue-300 border border-blue-500 ";
    case "In-progress":
        return "bg-gray-700 text-orange-300 border border-yellow-500 ";
    case "Done":
        return "bg-gray-700 text-green-300 border border-green-500  ";
    default:
        return "bg-gray-700 text-gray-300 border border-gray-600 ";
}
}