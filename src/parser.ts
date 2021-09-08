import * as vscode from 'vscode';


export class Parser {


	/**
	 * Finds all single line comments delimited by a given delimiter and matching tags specified in package.json
	 * @param activeEditor The active text editor containing the code document
	 */
	public changeSymbol(activeEditor: vscode.TextEditor): string {

		// If highlight single line comments is off, single line comments are not supported for this language

		let text = activeEditor.document.getText();
		let textLast = text;
		//let text = "; ;: :!! < < > > ? ?\""\"".., ,,,";
		text = text.replace(/，/g, ",");
		text = text.replace(/。/g, ".");
		text = text.replace(/《/g, "<");
		text = text.replace(/》/g, ">");
		text = text.replace(/？/g, "?");
		text = text.replace(/；/g, ";");
		text = text.replace(/：/g, ":");
		text = text.replace(/‘/g, "'");
		text = text.replace(/’/g, "'");
		text = text.replace(/“/g, "\"");
		text = text.replace(/”/g, "\"");
		text = text.replace(/！/g, "!");
		text = text.replace(/（/g, "(");
		text = text.replace(/）/g, ")");
		text = text.replace(/——/g, "_");
		if(text !== textLast)
		{
			activeEditor.edit((editor) => {
				const doc = activeEditor.document;
				const startPos = new vscode.Position(0, 0);
				const lastLine = doc.lineAt(doc.lineCount - 1);
				const endPos = lastLine.range.end;
				const entireRange = new vscode.Range(startPos, endPos);
				editor.replace(entireRange, text);
			  });
		}
		return text;

		//activeEditor.document.setText(text);
	}
}
