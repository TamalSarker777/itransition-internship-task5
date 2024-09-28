//-----------------------------------------
import seedrandom from "seedrandom";
import { fakerEN_US, fakerPL, fakerKA_GE, fakerEN } from "@faker-js/faker";

export const generateUserData = (region, seed, pageNumber) => {
  let faker;
  if (region === "usa") {
    faker = fakerEN_US;
  } else if (region === "poland") {
    faker = fakerPL;
  } else if (region === "georgia") {
    faker = fakerKA_GE;
  } else {
    faker = fakerEN;
  }

  const randomseed = seedrandom(seed + pageNumber);
  faker.seed(Math.floor(randomseed() * 10000) + 1);

  const users = [];
  let total_range;
  if (pageNumber === 1) {
    total_range = 20;
  } else {
    total_range = 10;
  }
  for (let i = 0; i < total_range; i++) {
    users.push({
      randomIdent: faker.string.uuid(),
      name: `${faker.person.firstName()} ${faker.person.middleName()} ${faker.person.lastName()}`,
      address: `${faker.location.city()}, ${faker.location.street()}, ${faker.location.buildingNumber()}, ${faker.string.numeric(
        { length: 3 }
      )}`,
      phone: faker.phone.number(),
    });
  }
  return users;
};

const swapRandomCharacter = (str) => {
  let charArray;
  if (Number.isInteger(str)) {
    str = str.toString();
  }
  charArray = str.split("");

  const t1 = Math.floor(Math.random() * charArray.length);
  const t2 = Math.floor(Math.random() * charArray.length);
  let mini = Math.min(t1, t2);
  let maxi = Math.max(t1, t2);

  const temp = charArray[mini];
  charArray[mini] = charArray[maxi];
  charArray[maxi] = temp;

  const strJoin = charArray.join("");

  return strJoin;
};

const deleteRandomCharacter = (str) => {
  if (Number.isInteger(str)) {
    str = str.toString();
  }

  const randomValue = Math.floor(Math.random() * str.length);

  let final_str = str.slice(0, randomValue) + str.slice(randomValue + 1);
  return final_str;
};

const addRandomCharacter = (str) => {
  if (Number.isInteger(str)) {
    str = str.toString();
  }

  const randomindex = Math.floor(Math.random() * str.length);
  const characters = "abcdefghijklmnopqrstuvwxyz";

  const randomValue = Math.floor(Math.random() * characters.length);
  const randomCharacter = characters.charAt(randomValue);

  let final_str =
    str.slice(0, randomindex) + randomCharacter + str.slice(randomindex);

  return final_str;
};

export const applyErrors = (userData, totalErrors) => {
  if (totalErrors <= 0) {
    return userData;
  }

  let modifiedData = [...userData];

  for (let i = 0; i < totalErrors; i++) {
    const randomUserIndex = Math.floor(Math.random() * modifiedData.length);
    const randomUser = { ...modifiedData[randomUserIndex] };

    const fields = ["randomIdent", "name", "address", "phone"];
    const randomField = fields[Math.floor(Math.random() * 4)];

    const errorType = Math.floor(Math.random() * 3);

    const value = randomUser[randomField];
    switch (errorType) {
      case 0:
        randomUser[randomField] = deleteRandomCharacter(value);
        break;
      case 1:
        randomUser[randomField] = addRandomCharacter(value);
        break;
      case 2:
        randomUser[randomField] = swapRandomCharacter(value);
        break;
      default:
        alert("Sorry..! try again..");
    }

    modifiedData[randomUserIndex] = randomUser;
  }

  return modifiedData;
};

export const ErrorHandle = (country, seed, errorValue, pages) => {
  let newUsers = [];
  for (let p = 1; p <= pages; p++) {
    const generatedUsers = generateUserData(country, seed, p);
    const usersWithErrors = applyErrors(generatedUsers, errorValue);
    newUsers = [...newUsers, ...usersWithErrors];
  }
  return newUsers;
};
