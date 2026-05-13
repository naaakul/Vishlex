// src/next/server.ts
function VishlexProvider({ children }) {
  return children;
}
function VishProvider({ children }) {
  return children;
}
function useVishlex() {
  return { trackEvent: () => {
  } };
}
export {
  VishProvider,
  VishlexProvider,
  useVishlex
};
