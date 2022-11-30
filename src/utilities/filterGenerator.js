const filterGenerator = (obj) => {
  const filterStore = [];
  for (let property in obj) {
    const copyObj = { ...obj[property] };
    copyObj.name = property;
    filterStore.push(copyObj);
  }
  return filterStore;
};

export default filterGenerator;
