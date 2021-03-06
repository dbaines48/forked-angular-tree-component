import { OnInit, OnDestroy } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { TreeModel } from '../models/tree.model';
export declare class TreeNodeCollectionComponent implements OnInit, OnDestroy {
    get nodes(): any;
    set nodes(nodes: any);
    treeModel: TreeModel;
    _nodes: any;
    private virtualScroll;
    templates: any;
    viewportNodes: TreeNode[];
    get marginTop(): string;
    _dispose: any[];
    setNodes(nodes: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    trackNode(index: any, node: any): any;
}
