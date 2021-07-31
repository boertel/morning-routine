enum WEEKDAY {
  SU = 0,
  MO = 1,
  TU = 2,
  WED = 3,
  TH = 4,
  FR = 5,
  SA = 6,
}

enum Frequency {
  DAILY = "DAILY",
}

class RRule {
  FREQ: Frequency;
  BYDAY: WEEKDAY[] = [];

  constructor(values: any) {
    for (const key in values) {
      const value = values[key];
      this[key] = value;
    }
  }

  isValid(now: any) {
    now = now || new Date();
    const weekday: WEEKDAY = WEEKDAY[now.getDay() as WEEKDAY];
    return this.BYDAY.includes(weekday);
  }

  toString(): string {
    let str = "RRULE:";
    ["FREQ", "BYDAY"].map((key) => {
      const value = this[key];
      if (value) {
        str += `${key}=${Array.isArray(value) ? value.join(",") : value};`;
      }
    });
    return str;
  }
}

RRule.fromString = function (str) {
  str = str || "";
  if (str.length === 0) {
    return new RRule({});
  }
  if (!str.startsWith("RRULE:")) {
    throw new Error("needs to start with RRULE:");
  }
  str = str.replace("RRULE:", "");
  let parts = {};
  str.split(";").forEach((part) => {
    if (part.length > 0) {
      const [key, value] = part.split("=");
      parts[key] = value.split(",");
    }
  });
  return new RRule(parts);
};

export default RRule;
