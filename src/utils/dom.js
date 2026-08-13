export function createElement(tag, { classes = [], text, id, attrs = {} } = {}) {
  const element = document.createElement(tag);
  if (classes.length) element.classList.add(...classes);
  if (id) element.id = id;
  if (text) element.textContent = text;

  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return element;
}
