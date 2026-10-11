(function (root) {
  // Work in cents: no permissive parseFloat prefixes or broad rounding tolerance.
  function currencyCents(raw) {
    let text = String(raw).trim();
    const parentheses = text.startsWith('(') && text.endsWith(')');
    if (parentheses) text = text.slice(1, -1).trim();
    if (parentheses && /[+-]/.test(text)) return null;
    if (!/^-?\$?\s*(?:(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{1,2})?|\.\d{1,2})$/.test(text)) return null;
    const amount = Number(text.replace(/[$,\s]/g, '')) * (parentheses ? -1 : 1);
    const cents = Math.round(amount * 100);
    return Number.isSafeInteger(cents) ? cents : null;
  }
  const api = { currencyCents };
  root.KOAN_ANSWERS = api;
  if (typeof module !== 'undefined') module.exports = api;
})(typeof window === 'undefined' ? globalThis : window);
