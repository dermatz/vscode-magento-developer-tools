import * as vscode from 'vscode';
import { detectMagento } from "./magento/detect";
import { copyCommand } from "./magento/copyCommand";
import { createStatusBarItem } from "./status/statusbar";

export async function activate(context: vscode.ExtensionContext) {
  if ((await detectMagento()) === true) {
    createStatusBarItem();
    copyCommand(context);
  }

  let disposableStart = vscode.commands.registerCommand(
    "magento-developer-tools.start",
    () => {
      vscode.window.showInformationMessage("Magento Developer Tools!");
    },
  );

  context.subscriptions.push(disposableStart);
}

export function deactivate() {}
