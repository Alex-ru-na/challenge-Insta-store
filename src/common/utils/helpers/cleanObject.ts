/**
 * Elimina de un objeto las propiedades en null
 * @param object 
 * @returns {}
 */
export const cleanObject = (object: any) => {
  return Object.keys(object)
    .filter((k) => object[k] != null)
    .reduce((a, k) => ({ ...a, [k]: object[k] }), {});
};
