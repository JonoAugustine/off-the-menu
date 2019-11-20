const root = $("#root");

const E = tag => $(`<${tag}>`);

const show = component => {
  root.empty();
  root.append(component());
};
