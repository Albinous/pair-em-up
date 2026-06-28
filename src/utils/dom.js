export function createElement(tag, { className, text, id, attrs = {} } = {}) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (id) element.id = id;
  if (text) element.textContent = text;

  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return element;
}
