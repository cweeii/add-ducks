module.exports = function showErrorNotificationTransformer(fileInfo, api) {
  const j = api.jscodeshift;
  const ast = j(fileInfo.source);

  const imports = ast.find(j.ImportDeclaration);
  const reactImport = j(imports.at(0).get());
  const counterImport = j.importDeclaration(
    [j.importSpecifier(j.identifier('Counter'))],
    j.literal('./components/counter'),
  );
  reactImport.insertAfter(counterImport);

  const anchor = ast.find(j.JSXElement, {
    openingElement: {
      name: {
        name: 'a',
      },
    },
  });
  const jsxIdentifier = j.jsxIdentifier('Counter');
  const openingElement = j.jsxOpeningElement(jsxIdentifier);
  openingElement.selfClosing = true;
  const element = j.jsxElement(openingElement);
  anchor.insertAfter(element);

  return ast.toSource({ quote: 'single', trailingComma: true });
};
