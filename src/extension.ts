import * as vscode from "vscode";
import { detectMagento } from "./magento/detect";
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

  context.subscriptions.push(disposable);
}

export function deactivate() {}
