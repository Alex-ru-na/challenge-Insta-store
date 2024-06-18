import { ObjectId } from "bson";
import { CustomHelpers } from "joi";

export function isMongoObjectIdValidator(value: any, helpers: CustomHelpers) {
  if (!ObjectId.isValid(value)) {
    return helpers.message({
      custom: "El campo «{{#label}}» debe ser un ObjectID de mongo válido",
    });
  }

  return value;
}
