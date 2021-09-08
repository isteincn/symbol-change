import * as vscode from 'vscode';
import { Parser } from './parser';

// this method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {

    let activeEditor: vscode.TextEditor;
    let textLast:string;
    let parser: Parser = new Parser();

    // Called to handle events below
    let updateDecorations = function (useHash = false) {
        // * if no active window is open, return
        if (!activeEditor) {return;}
        if(textLast === activeEditor.document.getText()) {return;}
        
        // Finds the single line comments using the language comment delimiter
        textLast = parser.changeSymbol(activeEditor);
        // Apply the styles set in the package.json
        //parser.ApplyDecorations(activeEditor);
    };

    // Get the active editor for the first time and initialise the regex
    if (vscode.window.activeTextEditor) {
        activeEditor = vscode.window.activeTextEditor;


        // Trigger first update of decorators
        triggerUpdateDecorations();
    }

    // * Handle active file changed
    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            activeEditor = editor;

            // Trigger update to set decorations for newly active file
            triggerUpdateDecorations();
        }
    }, null, context.subscriptions);

    // * Handle file contents changed
    vscode.workspace.onDidChangeTextDocument(event => {

        // Trigger updates if the text was changed in the same document
        if (activeEditor && event.document === activeEditor.document) {
            triggerUpdateDecorations();
        }
    }, null, context.subscriptions);

    // * IMPORTANT:
    // To avoid calling update too often,
    // set a timer for 200ms to wait before updating decorations
    var timeout: NodeJS.Timer;
    function triggerUpdateDecorations() {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(updateDecorations, 200);
    }
}

export function deactivate() { }