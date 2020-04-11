const posthtml = require("posthtml");
const fg = require("fast-glob");
const fs = require("fs");
const pkg = require("./package.json");

const baseUrl = ["/", pkg.name, "/"].join("");

function setBaseUrl() {
  return function plugin(tree) {
    tree.match({ tag: "script", attrs: { src: new RegExp(/\S+/) } }, (node) => {
      if (node.attrs.src.startsWith("/")) {
        node.attrs.src = node.attrs.src.slice(1);
      }

      return node;
    });

    tree.match({ tag: "link", attrs: { href: new RegExp(/\S+/) } }, (node) => {
      if (node.attrs.href.startsWith("/")) {
        node.attrs.href = node.attrs.href.slice(1);
      }

      return node;
    });

    tree.match({ tag: "base" }, (node) => {
      node.attrs.href = baseUrl;
      return node;
    });
  };
}

async function postbuild() {
  const files = await fg(["public/**/index.html"]);

  files.forEach((file) => {
    const source = fs.readFileSync(file).toString();

    posthtml()
      .use(setBaseUrl())
      .process(source)
      .then((result) => {
        fs.writeFileSync(file, result.html);
      });
  });
}

postbuild();
