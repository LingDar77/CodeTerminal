// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext)
{
	let disposable = vscode.commands.registerCommand('codeterminal.Commond', () =>
	{
		vscode.window.showInputBox({ title: 'Enter your commond:' }).then((val) =>
		{
			if (val) {
				let terminalId = -1;
				let currTerminalNumber = vscode.window.terminals.length;
				for (let c of val) {
					if (c === val[0]) { terminalId += 1; }
					else { break; }
				}

				let command = val.substring(terminalId);

				if (terminalId >= currTerminalNumber) {
					console.log(vscode.window.createTerminal());
					terminalId = currTerminalNumber;
				}

				let terminal = vscode.window.terminals[terminalId];

				if (command === ' ') {
					terminal.show();
				}
				else {
					terminal.sendText(command);
					if (command.endsWith(' ')) {
						terminal.show();
					}
				}
			}
			else {
				vscode.window.activeTerminal?.hide();
			}
		});



	});



	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
