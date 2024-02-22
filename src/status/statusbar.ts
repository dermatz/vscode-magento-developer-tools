import * as vscode from 'vscode';
const config = vscode.workspace.getConfiguration('magento-developer-tools');
const statusBar = config.get('statusBar');


/**
 * Registers the command to open the Magento Developer Tools extension settings.
 */
vscode.commands.registerCommand('extension.openMagentoDeveloperToolsSettings', () => {
    vscode.commands.executeCommand('workbench.action.openSettings', '@ext:dermatz.magento-developer-tools');
});

/**
 * Creates a status bar item for the Magento Developer Tools extension.
 * @returns The created status bar item.
 */
export function createStatusBarItem() {
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = '🛠️ Magento Developer Tools';
    statusBarItem.tooltip = 'Open Extension Settings in Workspace Settings';
    statusBarItem.command = 'extension.openMagentoDeveloperToolsSettings';
    statusBarItem.show();
    if (!statusBar) {
        statusBarItem.hide();
    } else {
        return statusBarItem;
    }
}

export default createStatusBarItem;
