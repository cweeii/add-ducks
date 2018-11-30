module.exports = (fileInfo, api) => {
  const j = api.jscodeshift;
  const ast = j(fileInfo.source);

  const addProviderImport = () => {
    const providerImportPaths = ast.find(j.ImportDeclaration, {
      source: {
        value: 'react-redux',
      },
    });
    if (providerImportPaths.length !== 0) {
      return;
    }

    const reactDomImport = ast.find(j.ImportDeclaration, {
      source: {
        value: 'react-dom',
      },
    });
    const providerImport = j.importDeclaration(
      [j.importSpecifier(j.identifier('Provider'))],
      j.literal('react-redux'),
    );

    reactDomImport.insertAfter(providerImport);
  };

  const modifyAppImport = () => {
    const appContainerPaths = ast.find(j.ImportDeclaration, {
      source: {
        value: './AppContainer',
      },
    });
    if (appContainerPaths.length !== 0) {
      return;
    }

    const appImport = ast.find(j.ImportDeclaration, {
      source: {
        value: './App',
      },
    });
    const appContainerImport = j.importDeclaration(
      [j.importDefaultSpecifier(j.identifier('AppContainer'))],
      j.literal('./AppContainer'),
    );

    appImport.insertAfter(appContainerImport);
    appImport.remove();
  };

  const addConfigureStoreImport = () => {
    const configureStorePaths = ast.find(j.ImportDeclaration, {
      source: {
        value: './store',
      },
    });
    if (configureStorePaths.length !== 0) {
      return;
    }

    const imports = ast.find(j.ImportDeclaration);
    const lastImport = j(imports.at(imports.length - 2).get());
    const configureStoreImport = j.importDeclaration(
      [j.importSpecifier(j.identifier('configureStore'))],
      j.literal('./store'),
    );

    lastImport.insertAfter(configureStoreImport);
  };

  const modifyRender = () => {
    const providerPaths = ast.find(j.JSXElement, {
      openingElement: {
        name: {
          name: 'Provider',
        },
      },
    });
    if (providerPaths.length !== 0) {
      return;
    }

    const app = ast.find(j.JSXElement, {
      openingElement: {
        name: {
          name: 'App',
        },
      },
    });

    const appContainerIdentifier = j.jsxIdentifier('AppContainer');
    const appContainerOpeningElement = j.jsxOpeningElement(
      appContainerIdentifier,
    );
    appContainerOpeningElement.selfClosing = true;
    const appContainerElement = j.jsxElement(appContainerOpeningElement);

    const providerIdentifier = j.jsxIdentifier('Provider');
    const providerAttributes = [
      j.jsxAttribute(
        j.jsxIdentifier('store'),
        j.jsxExpressionContainer(
          j.callExpression(j.identifier('configureStore'), []),
        ),
      ),
    ];
    const providerOpeningElement = j.jsxOpeningElement(
      providerIdentifier,
      providerAttributes,
    );
    const providerClosingElement = j.jsxClosingElement(providerIdentifier);
    const providerElement = j.jsxElement(
      providerOpeningElement,
      providerClosingElement,
      [appContainerElement],
    );

    app.insertAfter(providerElement);
    app.remove();
  };

  addProviderImport();
  modifyAppImport();
  addConfigureStoreImport();
  modifyRender();

  return ast.toSource({ quote: 'single', trailingComma: true });
};
