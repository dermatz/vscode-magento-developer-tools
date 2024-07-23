import * as vscode from "vscode";

/**
 * Registers the `magento-developer-tools.detectMagentoRoot` command.
 */
vscode.commands.registerCommand(
  "magento-developer-tools.detectMagentoRoot",
  detectMagento,
);

/**
 * Detects the Magento root directory by searching for the `app/bootstrap.php` file.
 * If the `magentoRoot` configuration is provided, it will search for the file in that directory.
 * If the file is found, it displays an information message and returns `true`.
 * If the file is not found, it displays an error message and returns `false`.
 *
 * @returns A boolean indicating whether the Magento root directory was found or not.
 */
export async function detectMagento() {
  let magentoRoot = vscode.workspace.getConfiguration('magento-developer-tools').get("magentoRoot");
  if (
    magentoRoot &&
    (await vscode.workspace.findFiles(`${magentoRoot}/app/bootstrap.php`))
      .length > 0
  ) {
    vscode.window.showInformationMessage(
      `Magento Developer Tools: Magento root found in ${magentoRoot}`,
    );
    return true;
  } else if (
    !magentoRoot &&
    (await vscode.workspace.findFiles(`app/bootstrap.php`)).length > 0
  ) {
    vscode.window.showInformationMessage(
      "Magento Developer Tools: Magento root found",
    );
    return true;
  } else {
    vscode.window.showErrorMessage(
      "Magento Developer Tools: Magento root not found",
    );
    return false;
  }
}

/**
 * Checks if the current project is a Magento 2 project by searching for the `composer.json` and `app/bootstrap.php` files.
 * If the files are found, it checks the contents of `composer.json` for the string 'magento/'.
 * Displays appropriate messages based on the presence and contents of the files.
 *
 * @returns A boolean indicating whether the project is a Magento 2 project or not.
 */
export async function checkIfMagento2Project() {
  let composerJson = await vscode.workspace.findFiles('composer.json');
  let bootstrap = await vscode.workspace.findFiles('./app/bootstrap.php');

  if (composerJson.length === 0 && bootstrap.length === 0) {
    vscode.window.showErrorMessage('This is not a Magento 2 project');
    return false;
  } else {
    let file = await vscode.workspace.openTextDocument(composerJson[0]);
    let text = file.getText();
    if (text.includes('magento/')) {
      vscode.window.showInformationMessage('This is a Magento 2 project');
      return true;
    } else {
      vscode.window.showErrorMessage('This is not a Magento 2 project');
      return false;
    }
  }
}

export default detectMagento;
