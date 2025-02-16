declare class SpaceTree {
    static GetChildTextNodes(s: any): any[];
    static GetAttributeAsArray(s: any, attribute: any): any[];
    static GetChild(s: any, nodeText: any): any;
    static GetFirstSubtreeFromTruncatedSpaceTree(s: any): string;
    static GetNumberOfChildren(s: any): number;
    static GetNumberOfTopLevelNodes(s: any): number;
    static GetChildren(s: any): any[];
    static GetDepth(s: any): number;
    static GetFirstLineWithDepth(depthArray: any, firstNodeDepth: any, startingLine?: number): any;
    static GetTopLevelNodesContent(s: any): any[];
    static GetTopLevelSubtrees(s: any): any[];
    static ReadOneLine(s: any): any;
    static GetText(s: any): any;
    static EncodeDepth(n: any): string;
    static GetAllNodesOfDepth(s: any, n: any): {};
    static ConvertStringToObject(s: any): {
        text: string;
        children: any[];
    };
    static Filter(s: any, filter: any): any[];
    static NormalizeDepth(s: any): string;
}
export default SpaceTree;
