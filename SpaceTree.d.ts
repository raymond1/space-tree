export default SpaceTree;
declare class SpaceTree {
    static GetNodesFromLineNumbers(s: any, lineNumbers: any): string[];
    static GetNodeFromLineNumber(s: any, n: any): string;
    static GetChildTextNodes(s: any): any[];
    static GetAttributeAsArray(s: any, attribute: any): any[];
    static GetChild(s: any, nodeText: any): any;
    static GetFirstSubtreeFromTruncatedSpaceTree(s: any): string;
    static GetNumberOfChildren(s: any): number;
    static GetNumberOfTopLevelNodes(s: any): number;
    static GetChildren(s: any): any[];
    static GetDepth(s: any): number;
    static GetFirstLineWithDepth(depthArray: any, firstNodeDepth: any, startingLine?: number): any;
    static GetTopLevelSubtrees(s: any): string[];
    static ReadOneLine(s: any): any;
    static GetText(s: any): any;
    static EncodeDepth(n: any): string;
    static ConvertStringToObject(s: any): {
        text: string;
        children: any[];
    };
    static Filter(s: any, filter: any): string[];
    static NormalizeDepth(s: any): string;
}
