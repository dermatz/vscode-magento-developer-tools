import * as vscode from 'vscode';

export function copyCommand(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('magento-developer-tools.copyToThemeLocation', async () => {
        let magentoThemeLocations = vscode.workspace.getConfiguration('magento-developer-tools').get('magentoThemeLocations');
        if (magentoThemeLocations) {
            let location = await vscode.window.showQuickPick(magentoThemeLocations, {
                placeHolder: 'Select a theme location to copy to',
            });
            if (location) {

                // TODO: Implement the copy command

            }
        }
    });

    context.subscriptions.push(disposable);
}

export default copyCommand;
