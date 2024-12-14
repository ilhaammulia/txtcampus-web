export const load = ({ url }) => {
  return {
    currentActive: url.pathname.replace('/', '')
  };
};
