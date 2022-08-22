const useInitField = () => {
  const generate = () => {
    const getNumbers = () => {
      const numbers = new Map();
      // array 0 - 35 with values 1 - 18 in random position
      for (let i = 1; i <= 18; i++) {
        numbers.set(i, 2);
      }
      return {
        numbers,
        updateNumber: (key: number) => {
          const oldNumberVal = numbers.get(key);
          numbers.set(key, oldNumberVal - 1);
          if (numbers.get(key) === 0) {
            numbers.delete(key);
          }
        },
      };
    };
    const numbersApi = getNumbers();
    const fieldData = Array.from(Array(36).fill(0));
    for (let i in fieldData) {
      // choose random key from map
      const keys = Array.from(numbersApi.numbers.keys());
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      // init cell in field
      fieldData[i] = randomKey;
      // decrease value in map - remove is 0
      numbersApi.updateNumber(randomKey);
    }
    return fieldData;
  };
  return generate;
};

export default useInitField;
