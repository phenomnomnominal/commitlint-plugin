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

const PARSE_EMOJI = /(\p{Emoji_Presentation})$/u;
const PARSE_SCOPE = /^(\w*) (\p{Emoji_Presentation})$/u;

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
      const expectedTypeEmoji = value[type];
      const [, scopeEmoji] = scope.match(PARSE_EMOJI) || [];
      const [, scopeName, emoji] = scope.match(PARSE_SCOPE) || [];
      if (!scopeEmoji || !scopeName || !emoji) {
        return [
          false,
          `commit message with type "${type}" should have scope = (${expectedTypeEmoji}) or scope = (myscope ${expectedTypeEmoji})`,
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
