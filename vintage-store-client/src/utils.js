
export function formatPrice(price) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function trueWhileAction(fn, promise) {
  fn(true);
  return promise.finally(() => fn(false));
}

export const makeGetter = fn => ({
  get value() { return fn() }
})