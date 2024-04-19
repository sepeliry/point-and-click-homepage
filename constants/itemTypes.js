const itemTypesHandler = {
  get: function (target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new Error(`ItemType '${property}' does not exist`);
    }
  },
  set: function () {
    throw new Error("Cannot modify ItemType values");
  },
};

const ITEM_TYPES = new Proxy(
  {
    item: "Item",
    book: "Book",
    desktopIcon: "Desktop Icon",
    text: "Text",
    backButton: "Back Button",
  },
  itemTypesHandler
);

export default ITEM_TYPES;
