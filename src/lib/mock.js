import { faker } from "@faker-js/faker"; // Import Faker
import { ObjectId } from "mongodb"; // For generating ObjectId

const generateObjectId = () => new ObjectId();

export const generateDummyData = (status = "TRANSFERRING") => {

  const amount = parseFloat(faker.finance.amount({ min: 10, max: 1999999 }));
  const rate = 1;
  const country = faker.address.countryCode("alpha-2");
  const corpId = "DSGRFB";
  const reference = faker.string.alphanumeric(16);
  const gatewayPartner = "DBS";
  const paymentAddress = "BANK_ACCOUNT";
  const paymentStatus = status;
  const product = faker.helpers.arrayElement(["EUREUR", "GBPGBP", "USDUSD"]);
  const transactionType = faker.helpers.arrayElement([
    "SWIFT_OUR",
    "SWIFT_SHA",
    "SWIFT_BEN",
  ]);

  const rateAt = faker.date.recent();

  return {
    _id: generateObjectId(),
    amount: amount,
    approvedDate: faker.date.recent(),
    bankRate: rate,
    bankRateAt: rateAt,
    beneficiaryAccountNumber: faker.finance.accountNumber({ min: 8, max: 16 }),
    beneficiaryBankCountryCode: country,
    beneficiaryCountryCode: country,
    beneficiaryName: faker.name.fullName(),
    businessModel: faker.helpers.arrayElement(["B2B", "B2C", "C2B", "C2C"]),
    corpId: corpId,
    credit: amount,
    createdAt: faker.date.past(),
    externalReference: reference,
    externalReferenceAlphaNum: reference,
    fxRate: rate,
    fxRateAt: rateAt,
    gatewayPartner: gatewayPartner,
    midRate: rate,
    midRateAt: rateAt,
    payinDebit: amount,
    payinPartner: corpId,
    payoutPartner: gatewayPartner,
    paymentAddress: paymentAddress,
    paymentStatus,
    product: product,
    senderName: faker.name.fullName(),
    transactionType: transactionType,
    updatedAt: faker.date.recent(),
  };
};
