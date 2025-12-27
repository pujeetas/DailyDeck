import { faker } from "@faker-js/faker";

export function generateData(fields) {
  const context = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
  };

  context.username = faker.internet.displayName({
    firstName: context.firstname,
    lastName: context.lastname,
  });
  context.email = faker.internet.email({
    firstName: context.firstname,
    lastName: context.lastname,
  });
  context.uuid = faker.string.uuid();
  context.url = faker.internet.url();
  context.sentence = faker.lorem.sentence();
  context.paragraph = faker.lorem.paragraph();
  context.gender = faker.person.sex();
  context.randomString = faker.word.words();
  context.randomNumber = faker.number.int();
  context.price = faker.commerce.price();
  context.age = faker.number.int({ min: 1, max: 100 });
  context.quantity = faker.number.int({ min: 1, max: 50 });
  context.rating = faker.number.int({ min: 0, max: 5 });
  context.boolean = faker.datatype.boolean();
  context.date = faker.date.anytime().toISOString().split("T")[0];
  context.dateTime = faker.date.anytime();
  context.address = {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    zip: faker.location.zipCode(),
  };

  const formatMap = {
    firstname: () => context.firstname,
    lastname: () => context.lastname,
    username: () => context.username,
    email: () => context.email,
    uuid: () => context.uuid,
    url: () => context.url,
    sentence: () => context.sentence,
    paragraph: () => context.paragraph,
    gender: () => context.gender,
    randomstring: () => context.randomString,
    randomnumber: () => context.randomNumber,
    price: () => context.price,
    age: () => context.age,
    quantity: () => context.quantity,
    rating: () => context.rating,
    boolean: () => context.boolean,
    date: () => context.date,
    datetime: () => context.dateTime,
    address: () => context.address,
  };

  function processFields(fields) {
    const result = {};

    fields.forEach((element) => {
      const key = element.format.toLowerCase();

      // If field has children, create nested object
      if (element.children && element.children.length > 0) {
        result[element.name] = processFields(element.children);
      }
      // Otherwise generate value
      else if (formatMap[key]) {
        result[element.name] = formatMap[key]();
      } else {
        console.warn(`Unknown format: ${element.format}`);
        result[element.name] = null;
      }
    });

    return result;
  }

  return processFields(fields);
}
