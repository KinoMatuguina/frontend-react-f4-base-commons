let store = null;

export default function (state, inject) {
  if (state) store = inject(state);
  return store;
}
