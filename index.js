const DEFAULT_EMOJI_MAP = {
  build: "🔨",
  chore: "🕸",
  ci: "🚧",
  docs: "📚",
  dependencies: "📦",
  feat: "✨",
  fix: "🐛",
  perf: "🏎",
  refactor: "🔧",
  release: "🔖",
  revert: "💥",
  style: "😎",
  test: "🚨",
};

const PARSE_EMOJI = /^(\p{Emoji})$/u;
const PARSE_SCOPE = /^(\w*) (\p{Emoji})$/u;

module.exports = {
  rules: {
    "@phenomnomnominal/scopes": (
      { scope, type },
      _,
      value = DEFAULT_EMOJI_MAP
    ) => {
      if (!scope) {
        return [false, `commit scope should be set`];
      }
      const [, scopeEmoji] = scope.match(PARSE_EMOJI) || [];
      const [, scopeName, emoji] = scope.match(PARSE_SCOPE) || [];
      const expectedTypeEmoji = value[type];
      if (scopeEmoji) {
        return [
          scopeEmoji === expectedTypeEmoji,
          `commit message with type "${type}" should begin ${type}(${expectedTypeEmoji}) or ${type}(myscope ${expectedTypeEmoji})`,
        ];
      }
      if (!scopeName && !emoji) {
        return [
          false,
          `commit message with type "${type}" should begin ${type}(${expectedTypeEmoji}) or ${type}(myscope ${expectedTypeEmoji})`,
        ];
      }
      const expectedScopeEmoji = value[scopeName];
      if (expectedScopeEmoji) {
        return [
          expectedScopeEmoji === emoji,
          `commit message with type "${type}" and scope "${scopeName}" should begin ${type}(${scopeName} ${expectedScopeEmoji})`,
        ];
      }
      return [
        expectedTypeEmoji === emoji,
        `commit message with type "${type}" and scope "${scopeName}" should begin ${type}(${scopeName} ${expectedTypeEmoji})`,
      ];
    },
  },
};
