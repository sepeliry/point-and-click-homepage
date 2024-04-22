import openUrlInNewTab from "../logic/interactions/openUrlInNewTab";

describe("openUrlInNewTab", () => {
  // Mocks and spies
  let createElementSpy, appendChildSpy, removeChildSpy, clickSpy;
  const fakeAnchor = {
    href: "",
    target: "",
    rel: "",
    click: jest.fn(),
  };

  beforeEach(() => {
    // Setup spies and mocks
    createElementSpy = jest
      .spyOn(document, "createElement")
      .mockReturnValue(fakeAnchor);
    appendChildSpy = jest
      .spyOn(document.body, "appendChild")
      .mockImplementation(() => {});
    removeChildSpy = jest
      .spyOn(document.body, "removeChild")
      .mockImplementation(() => {});
    clickSpy = fakeAnchor.click;
  });

  afterEach(() => {
    // Clear all mocks and spies
    jest.restoreAllMocks();
  });

  test("should create an anchor and set the correct attributes", () => {
    const testUrl = "https://example.com";
    openUrlInNewTab(testUrl);

    // Check if the anchor element is created correctly
    expect(createElementSpy).toHaveBeenCalledWith("a");
    expect(fakeAnchor.href).toBe(testUrl);
    expect(fakeAnchor.target).toBe("_blank");
    expect(fakeAnchor.rel).toBe("noopener noreferrer");
  });

  test("should append the anchor to the body, simulate a click, and remove it", () => {
    openUrlInNewTab("https://example.com");

    // Check if the anchor is appended and removed correctly
    expect(appendChildSpy).toHaveBeenCalledWith(fakeAnchor);
    expect(removeChildSpy).toHaveBeenCalledWith(fakeAnchor);

    // Check if a click is simulated
    expect(clickSpy).toHaveBeenCalled();
  });
});
