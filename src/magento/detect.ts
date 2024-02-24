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

export default detectMagento;
