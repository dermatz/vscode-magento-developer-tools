import * as vscode from "vscode";
import config from "../config/config";

/**
 * Registers the command to open the Magento Developer Tools extension settings.
 */
vscode.commands.registerCommand("magento-developer-tools.openSettings", () => {
  vscode.commands.executeCommand(
    "workbench.action.openSettings",
    "@ext:dermatz.magento-developer-tools",
  );
});

/**
 * Creates a status bar item for the Magento Developer Tools extension.
 * @returns The created status bar item.
 */
export function createStatusBarItem() {
  const statusBar = config.get("statusBar");
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100,
  );
  statusBarItem.text = "$(gear) Magento Developer Tools";
  statusBarItem.tooltip = "Open Extension Settings in Workspace Settings";
  statusBarItem.command = "magento-developer-tools.openSettings";
  statusBarItem.show();
  if (!statusBar) {
    statusBarItem.hide();
  } else {
    return statusBarItem;
  }
}

export default createStatusBarItem;
