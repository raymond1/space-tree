all:
	cp SpaceTree.js SpaceTree.ts
	tsc --declaration SpaceTree.js --target ES6 --emitDeclarationOnly --allowJs
