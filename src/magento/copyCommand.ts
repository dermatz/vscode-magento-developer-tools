import * as vscode from "vscode";
export function copyCommand(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "magento-developer-tools.copyToThemeLocation",
    async () => {
      let magentoThemeLocations: string[] =
        vscode.workspace
          .getConfiguration("magento-developer-tools")
          .get("magentoThemeLocations") || [];
      if (magentoThemeLocations) {
        let location = await vscode.window.showQuickPick(
          magentoThemeLocations,
          {
            placeHolder: "Select a Magento location to copy to",
          },
        );
        if (location) {
          let editor = vscode.window.activeTextEditor;

          /**
           * If the location does not start with a /, add it
           */
          if (location[0].charAt(0) !== "/") {
            location = "/" + location;
          }

          /**
           * Simple copy function
           */

          // TODO: Improve it with auto Rename for Magento Modules by check the parent registration.php file, if this file is inside a magento composer module

          if (editor) {
            let document = editor.document;
            let sourceUri = document.uri;
            let workspaceFolder = vscode.workspace.workspaceFolders
              ? vscode.workspace.workspaceFolders[0].uri.fsPath
              : "";
            let destinationUri = vscode.Uri.file(
              `${workspaceFolder}` +
                location +
                "/" +
                document.fileName.split("/").pop(),
            );
            vscode.window.showInformationMessage(
              `Copying ${document.fileName} to ${location}`,
            );
            vscode.workspace.fs.copy(sourceUri, destinationUri, {
              overwrite: true,
            });
            Promise.resolve(
              vscode.workspace.fs.copy(sourceUri, destinationUri, {
                overwrite: true,
              }),
            )
              .then(() =>
                vscode.window.showInformationMessage(`Copied to ${location}`),
              )
              .catch((err) =>
                vscode.window.showErrorMessage(`Failed to copy: ${err}`),
              );
          }
        }
      }
    },
  );

  context.subscriptions.push(disposable);
}

export default copyCommand;
