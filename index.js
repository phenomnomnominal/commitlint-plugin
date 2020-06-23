const DEFAULT_EMOJI_MAP = {
  build: "🔨",
  chore: "🕸",
  ci: "🚧",
  docs: "📚",
  feat: "✨",
  fix: "🐛",
  perf: "🏎",
  refactor: "🔧",
  revert: "💥",
  style: "😎",
  test: "🚨",
};

module.exports = {
  rules: {
    "@phenomnomnominal/scopes": (
      { scope, type },
      _,
      value = DEFAULT_EMOJI_MAP
    ) => {
      if (!scope) {
        return [false, `Commit scope must always be set`];
      }
      const expectedEmoji = value[type];
      if (!expectedEmoji) {
        return [false, `Scope emoji not specified for commit type "${type}"`];
      }
      const validScope = scope.endsWith(expectedEmoji);
      return [
        validScope,
        `Commits with type "${type}" must have a scope ending with "${expectedEmoji}"`,
      ];
    },
  },
};
