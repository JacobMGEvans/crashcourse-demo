const { JSDOM } = require("jsdom"),
  fs = require("fs"),
  path = require("path");

//Function to setup DOM environment for testing
function setupDOMEnvironment() {
  const html = fs.readFileSync(
    path.resolve(__dirname, "./index.html"),
    "utf-8"
  );
  const dom = new JSDOM(html, { runScripts: "dangerously" });
  const container = dom.window.document.body;

  return { container };
}

// write test function for image load
function checkForDOMChanges(container) {
  const checkExist = setInterval(function () {
    const image = container.querySelector("#pickachu-image");

    if (image) {
      console.dir("IMAGE Exists!");
      return clearInterval(checkExist);
    }
    console.log("No IMAGE element found");
  }, 200);
}

//write test function for button click & image load
async function testButtonClick() {
  const { container } = setupDOMEnvironment();
  //get element by id and click
  const button = container.querySelector("#button");
  button.addEventListener("click", (event) => {
    console.dir({ "Button clicked!!!!!": !!event });
  });

  button.click();

  checkForDOMChanges(container);
}
testButtonClick();
