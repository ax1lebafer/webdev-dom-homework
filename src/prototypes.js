// Функция для предовращения уязвимостей
export function vulnerabilityPrevention(string) {
  return string
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

String.prototype.understandQuote = function () {
  return this.replaceAll('QUOTE_BEGIN', '<div class="quote">').replaceAll(
    'QUOTE_END',
    '</div>',
  );
};

String.prototype.isEmpty = function () {
  return this.trim().length === 0;
};
