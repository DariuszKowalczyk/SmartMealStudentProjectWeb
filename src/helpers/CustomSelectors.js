export const findElementNameById = (array, id) => {
  if (array) {
    const el = array.find(el => {
      if (el.id === parseInt(id)) {
        return el;
      }
    });
    if (el) {
      return el.name;
    }
  }
};
