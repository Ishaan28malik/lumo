const getTimezoneOffset = (timezoneOffset: string) => {
  if (!timezoneOffset) return null;
  const regex = /([+-][0-9]{2}:[0-9]{2}|Z)$/;
  const match = timezoneOffset.match(regex);
  return match ? match[0] : null;
};

export { getTimezoneOffset };
