import { ObjectId } from "mongodb";

export class MongoFunctions {
  static convertIdsToObjectId<T>(obj: T): T {
    if (obj === null || typeof obj !== "object") return obj;

    const newObj: Record<string, any> = {};

    Object.keys(obj).forEach((key) => {
      const value = (obj as Record<string, any>)[key];

      if (typeof value === "string" && ObjectId.isValid(value)) {
        newObj[key] = new ObjectId(value);
      } else if (typeof value === "object" && !(value instanceof ObjectId)) {
        newObj[key] = MongoFunctions.convertIdsToObjectId(value);
      } else {
        newObj[key] = value;
      }
    });

    return newObj as T;
  };
}
