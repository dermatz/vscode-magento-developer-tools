import * as vscode from "vscode";
import { detectMagento, checkIfMagento2Project } from "./magento/detect";
import { createStatusBarItem } from "./status/statusbar";

export async function activate(context: vscode.ExtensionContext) {
  if ((await detectMagento()) === true) {
    createStatusBarItem();
  }

  let disposable = vscode.commands.registerCommand(
    "magento-developer-tools.start",
    () => {
      vscode.window.showInformationMessage("Magento Developer Tools!");
    },
  );

  let checkMagentoDisposable = vscode.commands.registerCommand(
    "magento-developer-tools.checkIfMagento2Project",
    checkIfMagento2Project,
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(checkMagentoDisposable);
}

export function deactivate() {}
