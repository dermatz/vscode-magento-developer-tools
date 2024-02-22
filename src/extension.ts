import * as vscode from 'vscode';
import { createStatusBarItem } from './status/statusbar';

export function activate(context: vscode.ExtensionContext) {

    createStatusBarItem();

	let disposable = vscode.commands.registerCommand('magento-developer-tools.start', () => {
		vscode.window.showInformationMessage('Magento Developer Tools!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
