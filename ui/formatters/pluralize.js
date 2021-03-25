function pluralize(count, singular, plural, returnCount) {
  const prefix = returnCount ? count + " " : "";
  if (count === 1) {
    return prefix + singular;
  } else {
    if (plural) {
      return prefix + plural;
    } else {
      const lastCharacter = singular.length - 1;
      if (singular[lastCharacter] === "y") {
        return `${prefix}${singular.substr(0, lastCharacter)}ies`;
      } else {
        return `${prefix}${singular}s`;
      }
    }
  }
}

export default pluralize;
