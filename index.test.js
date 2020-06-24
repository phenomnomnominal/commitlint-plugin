const assert = require("assert");
const { rules } = require("./index");

[
  {
    input: {},
    expected: { result: false, message: `commit scope should be set` },
  },
  {
    input: { type: "build", scope: "compiler" },
    expected: {
      result: false,
      message: `commit message with type "build" should have scope = (🔨) or scope = (myscope 🔨)`,
    },
  },
  {
    input: { type: "docs", scope: "compiler 🎉" },
    expected: {
      result: false,
      message: `commit message with type "docs" and scope "compiler" should begin docs(compiler 📚)`,
    },
  },
  {
    input: { type: "docs", scope: "compiler  📚" },
    expected: {
      result: false,
      message: `commit message with type "docs" should have scope = (📚) or scope = (myscope 📚)`,
    },
  },
  {
    input: { type: "docs", scope: "two words 📚" },
    expected: {
      result: false,
      message: `commit message with type "docs" should have scope = (📚) or scope = (myscope 📚)`,
    },
  },
  {
    input: { type: "docs", scope: "compiler 📚" },
    expected: {
      result: true,
    },
  },
  {
    input: { type: "chore", scope: "release 📚" },
    expected: {
      result: false,
      message: `commit message with type "chore" and scope "release" should begin chore(release 🔖)`,
    },
  },
  {
    input: { type: "chore", scope: "release 🔖" },
    expected: {
      result: true,
    },
  },
  {
    input: { type: "chore", scope: "dependencies 📦" },
    expected: {
      result: true,
    },
  },
].forEach(({ input, expected }) => {
  const [result, message] = rules["@phenomnomnominal/scopes"](input);
  assert.equal(result, expected.result);
  if (!result) {
    assert.equal(message, expected.message);
  }
});
