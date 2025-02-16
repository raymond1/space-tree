all:
	cp SpaceTree.js SpaceTree.ts
	tsc --declaration SpaceTree.ts --target ES6
