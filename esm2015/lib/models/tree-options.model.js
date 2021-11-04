import { KEYS } from '../constants/keys';
const ɵ0 = (tree, node, $event) => node && node.toggleActivated(), ɵ1 = (tree, node, $event) => node && node.toggleActivated(true), ɵ2 = (tree, node, $event) => node && node.toggleSelected(), ɵ3 = (tree, node, $event) => node.setIsActive(true), ɵ4 = (tree, node, $event) => node.setIsActive(false), ɵ5 = (tree, node, $event) => node.setIsSelected(true), ɵ6 = (tree, node, $event) => node.setIsSelected(false), ɵ7 = (tree, node, $event) => node.focus(), ɵ8 = (tree, node, $event) => node.hasChildren && node.toggleExpanded(), ɵ9 = (tree, node, $event) => node.expand(), ɵ10 = (tree, node, $event) => node.collapse(), ɵ11 = (tree, node, $event) => tree.focusDrillDown(), ɵ12 = (tree, node, $event) => tree.focusDrillUp(), ɵ13 = (tree, node, $event) => tree.focusNextNode(), ɵ14 = (tree, node, $event) => tree.focusPreviousNode(), ɵ15 = (tree, node, $event, { from, to }) => {
    // default action assumes from = node, to = {parent, index}
    if ($event.ctrlKey) {
        tree.copyNode(from, to);
    }
    else {
        tree.moveNode(from, to);
    }
};
export const TREE_ACTIONS = {
    TOGGLE_ACTIVE: ɵ0,
    TOGGLE_ACTIVE_MULTI: ɵ1,
    TOGGLE_SELECTED: ɵ2,
    ACTIVATE: ɵ3,
    DEACTIVATE: ɵ4,
    SELECT: ɵ5,
    DESELECT: ɵ6,
    FOCUS: ɵ7,
    TOGGLE_EXPANDED: ɵ8,
    EXPAND: ɵ9,
    COLLAPSE: ɵ10,
    DRILL_DOWN: ɵ11,
    DRILL_UP: ɵ12,
    NEXT_NODE: ɵ13,
    PREVIOUS_NODE: ɵ14,
    MOVE_NODE: ɵ15
};
const defaultActionMapping = {
    mouse: {
        click: TREE_ACTIONS.TOGGLE_ACTIVE,
        dblClick: null,
        contextMenu: null,
        expanderClick: TREE_ACTIONS.TOGGLE_EXPANDED,
        checkboxClick: TREE_ACTIONS.TOGGLE_SELECTED,
        drop: TREE_ACTIONS.MOVE_NODE
    },
    keys: {
        [KEYS.RIGHT]: TREE_ACTIONS.DRILL_DOWN,
        [KEYS.LEFT]: TREE_ACTIONS.DRILL_UP,
        [KEYS.DOWN]: TREE_ACTIONS.NEXT_NODE,
        [KEYS.UP]: TREE_ACTIONS.PREVIOUS_NODE,
        [KEYS.SPACE]: TREE_ACTIONS.TOGGLE_ACTIVE,
        [KEYS.ENTER]: TREE_ACTIONS.TOGGLE_ACTIVE
    }
};
export class TreeOptions {
    constructor(options = {}) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35;
        this.options = options;
        this.actionMapping = {
            mouse: {
                click: (_d = (_c = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.actionMapping) === null || _b === void 0 ? void 0 : _b.mouse) === null || _c === void 0 ? void 0 : _c.click) !== null && _d !== void 0 ? _d : defaultActionMapping.mouse.click,
                dblClick: (_h = (_g = (_f = (_e = this.options) === null || _e === void 0 ? void 0 : _e.actionMapping) === null || _f === void 0 ? void 0 : _f.mouse) === null || _g === void 0 ? void 0 : _g.dblClick) !== null && _h !== void 0 ? _h : defaultActionMapping.mouse.dblClick,
                contextMenu: (_m = (_l = (_k = (_j = this.options) === null || _j === void 0 ? void 0 : _j.actionMapping) === null || _k === void 0 ? void 0 : _k.mouse) === null || _l === void 0 ? void 0 : _l.contextMenu) !== null && _m !== void 0 ? _m : defaultActionMapping.mouse.contextMenu,
                expanderClick: (_r = (_q = (_p = (_o = this.options) === null || _o === void 0 ? void 0 : _o.actionMapping) === null || _p === void 0 ? void 0 : _p.mouse) === null || _q === void 0 ? void 0 : _q.expanderClick) !== null && _r !== void 0 ? _r : defaultActionMapping.mouse.expanderClick,
                checkboxClick: (_v = (_u = (_t = (_s = this.options) === null || _s === void 0 ? void 0 : _s.actionMapping) === null || _t === void 0 ? void 0 : _t.mouse) === null || _u === void 0 ? void 0 : _u.checkboxClick) !== null && _v !== void 0 ? _v : defaultActionMapping.mouse.checkboxClick,
                drop: (_z = (_y = (_x = (_w = this.options) === null || _w === void 0 ? void 0 : _w.actionMapping) === null || _x === void 0 ? void 0 : _x.mouse) === null || _y === void 0 ? void 0 : _y.drop) !== null && _z !== void 0 ? _z : defaultActionMapping.mouse.drop,
                dragStart: (_3 = (_2 = (_1 = (_0 = this.options) === null || _0 === void 0 ? void 0 : _0.actionMapping) === null || _1 === void 0 ? void 0 : _1.mouse) === null || _2 === void 0 ? void 0 : _2.dragStart) !== null && _3 !== void 0 ? _3 : undefined,
                drag: (_7 = (_6 = (_5 = (_4 = this.options) === null || _4 === void 0 ? void 0 : _4.actionMapping) === null || _5 === void 0 ? void 0 : _5.mouse) === null || _6 === void 0 ? void 0 : _6.drag) !== null && _7 !== void 0 ? _7 : undefined,
                dragEnd: (_11 = (_10 = (_9 = (_8 = this.options) === null || _8 === void 0 ? void 0 : _8.actionMapping) === null || _9 === void 0 ? void 0 : _9.mouse) === null || _10 === void 0 ? void 0 : _10.dragEnd) !== null && _11 !== void 0 ? _11 : undefined,
                dragOver: (_15 = (_14 = (_13 = (_12 = this.options) === null || _12 === void 0 ? void 0 : _12.actionMapping) === null || _13 === void 0 ? void 0 : _13.mouse) === null || _14 === void 0 ? void 0 : _14.dragOver) !== null && _15 !== void 0 ? _15 : undefined,
                dragLeave: (_19 = (_18 = (_17 = (_16 = this.options) === null || _16 === void 0 ? void 0 : _16.actionMapping) === null || _17 === void 0 ? void 0 : _17.mouse) === null || _18 === void 0 ? void 0 : _18.dragLeave) !== null && _19 !== void 0 ? _19 : undefined,
                dragEnter: (_23 = (_22 = (_21 = (_20 = this.options) === null || _20 === void 0 ? void 0 : _20.actionMapping) === null || _21 === void 0 ? void 0 : _21.mouse) === null || _22 === void 0 ? void 0 : _22.dragEnter) !== null && _23 !== void 0 ? _23 : undefined,
                mouseOver: (_27 = (_26 = (_25 = (_24 = this.options) === null || _24 === void 0 ? void 0 : _24.actionMapping) === null || _25 === void 0 ? void 0 : _25.mouse) === null || _26 === void 0 ? void 0 : _26.mouseOver) !== null && _27 !== void 0 ? _27 : undefined,
                mouseOut: (_31 = (_30 = (_29 = (_28 = this.options) === null || _28 === void 0 ? void 0 : _28.actionMapping) === null || _29 === void 0 ? void 0 : _29.mouse) === null || _30 === void 0 ? void 0 : _30.mouseOut) !== null && _31 !== void 0 ? _31 : undefined,
            },
            keys: {
                [KEYS.RIGHT]: TREE_ACTIONS.DRILL_DOWN,
                [KEYS.LEFT]: TREE_ACTIONS.DRILL_UP,
                [KEYS.DOWN]: TREE_ACTIONS.NEXT_NODE,
                [KEYS.UP]: TREE_ACTIONS.PREVIOUS_NODE,
                [KEYS.SPACE]: TREE_ACTIONS.TOGGLE_ACTIVE,
                [KEYS.ENTER]: TREE_ACTIONS.TOGGLE_ACTIVE
            }
        };
        if ((_33 = (_32 = this.options) === null || _32 === void 0 ? void 0 : _32.actionMapping) === null || _33 === void 0 ? void 0 : _33.keys) {
            this.actionMapping.keys = Object.assign(Object.assign({}, this.actionMapping.keys), this.options.actionMapping.keys);
        }
        if (options.rtl) {
            this.actionMapping.keys[KEYS.RIGHT] = ((_34 = options.actionMapping) === null || _34 === void 0 ? void 0 : _34.keys[KEYS.RIGHT]) || TREE_ACTIONS.DRILL_UP;
            this.actionMapping.keys[KEYS.LEFT] = ((_35 = options.actionMapping) === null || _35 === void 0 ? void 0 : _35.keys[KEYS.LEFT]) || TREE_ACTIONS.DRILL_DOWN;
        }
    }
    get hasChildrenField() { return this.options.hasChildrenField || 'hasChildren'; }
    get childrenField() { return this.options.childrenField || 'children'; }
    get displayField() { return this.options.displayField || 'name'; }
    get idField() { return this.options.idField || 'id'; }
    get isExpandedField() { return this.options.isExpandedField || 'isExpanded'; }
    get getChildren() { return this.options.getChildren; }
    get levelPadding() { return this.options.levelPadding || 0; }
    get useVirtualScroll() { return this.options.useVirtualScroll; }
    get animateExpand() { return this.options.animateExpand; }
    get animateSpeed() { return this.options.animateSpeed || 1; }
    get animateAcceleration() { return this.options.animateAcceleration || 1.2; }
    get scrollOnActivate() { return this.options.scrollOnActivate === undefined ? true : this.options.scrollOnActivate; }
    get rtl() { return !!this.options.rtl; }
    get rootId() { return this.options.rootId; }
    get useCheckbox() { return this.options.useCheckbox; }
    get useTriState() { return this.options.useTriState === undefined ? true : this.options.useTriState; }
    get scrollContainer() { return this.options.scrollContainer; }
    get allowDragoverStyling() { return this.options.allowDragoverStyling === undefined ? true : this.options.allowDragoverStyling; }
    getNodeClone(node) {
        if (this.options.getNodeClone) {
            return this.options.getNodeClone(node);
        }
        // remove id from clone
        // keeping ie11 compatibility
        const nodeClone = Object.assign({}, node.data);
        if (nodeClone.id) {
            delete nodeClone.id;
        }
        return nodeClone;
    }
    allowDrop(element, to, $event) {
        if (this.options.allowDrop instanceof Function) {
            return this.options.allowDrop(element, to, $event);
        }
        else {
            return this.options.allowDrop === undefined ? true : this.options.allowDrop;
        }
    }
    allowDrag(node) {
        if (this.options.allowDrag instanceof Function) {
            return this.options.allowDrag(node);
        }
        else {
            return this.options.allowDrag;
        }
    }
    nodeClass(node) {
        return this.options.nodeClass ? this.options.nodeClass(node) : '';
    }
    nodeHeight(node) {
        if (node.data.virtual) {
            return 0;
        }
        let nodeHeight = this.options.nodeHeight || 22;
        if (typeof nodeHeight === 'function') {
            nodeHeight = nodeHeight(node);
        }
        // account for drop slots:
        return nodeHeight + (node.index === 0 ? 2 : 1) * this.dropSlotHeight;
    }
    get dropSlotHeight() {
        return typeof this.options.dropSlotHeight === 'number' ? this.options.dropSlotHeight : 2;
    }
}
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10, ɵ11, ɵ12, ɵ13, ɵ14, ɵ15 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1vcHRpb25zLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci10cmVlLWNvbXBvbmVudC9zcmMvbGliL21vZGVscy90cmVlLW9wdGlvbnMubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLG1CQUFtQixDQUFDO1dBUXhCLENBQUMsSUFBZSxFQUFFLElBQWMsRUFBRSxNQUFXLEVBQUUsRUFBRSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQzFFLENBQUMsSUFBZSxFQUFFLElBQWMsRUFBRSxNQUFXLEVBQUUsRUFBRSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUN4RixDQUFDLElBQWUsRUFBRSxJQUFjLEVBQUUsTUFBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxPQUN0RixDQUFDLElBQWUsRUFBRSxJQUFjLEVBQUUsTUFBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUN0RSxDQUFDLElBQWUsRUFBRSxJQUFjLEVBQUUsTUFBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUM3RSxDQUFDLElBQWUsRUFBRSxJQUFjLEVBQUUsTUFBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUN4RSxDQUFDLElBQWUsRUFBRSxJQUFjLEVBQUUsTUFBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUM5RSxDQUFDLElBQWUsRUFBRSxJQUFjLEVBQUUsTUFBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQ3BELENBQUMsSUFBZSxFQUFFLElBQWMsRUFB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QUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxDQUFDO1NBQ1Y7UUFFRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7UUFFL0MsSUFBSSxPQUFPLFVBQVUsS0FBSyxVQUFVLEVBQUU7WUFDcEMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvQjtRQUVELDBCQUEwQjtRQUMxQixPQUFPLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDeEUsQ0FBQztJQUVELElBQUksY0FBYztRQUNoQixPQUFPLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNGLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi90cmVlLW5vZGUubW9kZWwnO1xyXG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuL3RyZWUubW9kZWwnO1xyXG5pbXBvcnQgeyBLRVlTIH0gZnJvbSAnLi4vY29uc3RhbnRzL2tleXMnO1xyXG5pbXBvcnQgeyBJVHJlZU9wdGlvbnMgfSBmcm9tICcuLi9kZWZzL2FwaSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBY3Rpb25IYW5kbGVyIHtcclxuICAodHJlZTogVHJlZU1vZGVsLCBub2RlOiBUcmVlTm9kZSwgJGV2ZW50OiBhbnksIC4uLnJlc3QpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgVFJFRV9BQ1RJT05TID0ge1xyXG4gIFRPR0dMRV9BQ1RJVkU6ICh0cmVlOiBUcmVlTW9kZWwsIG5vZGU6IFRyZWVOb2RlLCAkZXZlbnQ6IGFueSkgPT4gbm9kZSAmJiBub2RlLnRvZ2dsZUFjdGl2YXRlZCgpLFxyXG4gIFRPR0dMRV9BQ1RJVkVfTVVMVEk6ICh0cmVlOiBUcmVlTW9kZWwsIG5vZGU6IFRyZWVOb2RlLCAkZXZlbnQ6IGFueSkgPT4gbm9kZSAmJiBub2RlLnRvZ2dsZUFjdGl2YXRlZCh0cnVlKSxcclxuICBUT0dHTEVfU0VMRUNURUQ6ICh0cmVlOiBUcmVlTW9kZWwsIG5vZGU6IFRyZWVOb2RlLCAkZXZlbnQ6IGFueSkgPT4gbm9kZSAmJiBub2RlLnRvZ2dsZVNlbGVjdGVkKCksXHJcbiAgQUNUSVZBVEU6ICh0cmVlOiBUcmVlTW9kZWwsIG5vZGU6IFRyZWVOb2RlLCAkZXZlbnQ6IGFueSkgPT4gbm9kZS5zZXRJc0FjdGl2ZSh0cnVlKSxcclxuICBERUFDVElWQVRFOiAodHJlZTogVHJlZU1vZGVsLCBub2RlOiBUcmVlTm9kZSwgJGV2ZW50OiBhbnkpID0+IG5vZGUuc2V0SXNBY3RpdmUoZmFsc2UpLFxyXG4gIFNFTEVDVDogKHRyZWU6IFRyZWVNb2RlbCwgbm9kZTogVHJlZU5vZGUsICRldmVudDogYW55KSA9PiBub2RlLnNldElzU2VsZWN0ZWQodHJ1ZSksXHJcbiAgREVTRUxFQ1Q6ICh0cmVlOiBUcmVlTW9kZWwsIG5vZGU6IFRyZWVOb2RlLCAkZXZlbnQ6IGFueSkgPT4gbm9kZS5zZXRJc1NlbGVjdGVkKGZhbHNlKSxcclxuICBGT0NVUzogKHRyZWU6IFRyZWVNb2RlbCwgbm9kZTogVHJlZU5vZGUsICRldmVudDogYW55KSA9PiBub2RlLmZvY3VzKCksXHJcbiAgVE9HR0xFX0VYUEFOREVEOiAodHJlZTogVHJlZU1vZGVsLCBub2RlOiBUcmVlTm9kZSwgJGV2ZW50OiBhbnkpID0+IG5vZGUuaGFzQ2hpbGRyZW4gJiYgbm9kZS50b2dnbGVFeHBhbmRlZCgpLFxyXG4gIEVYUEFORDogKHRyZWU6IFRyZWVNb2RlbCwgbm9kZTogVHJlZU5vZGUsICRldmVudDogYW55KSA9PiBub2RlLmV4cGFuZCgpLFxyXG4gIENPTExBUFNFOiAodHJlZTogVHJlZU1vZGVsLCBub2RlOiBUcmVlTm9kZSwgJGV2ZW50OiBhbnkpID0+IG5vZGUuY29sbGFwc2UoKSxcclxuICBEUklMTF9ET1dOOiAodHJlZTogVHJlZU1vZGVsLCBub2RlOiBUcmVlTm9kZSwgJGV2ZW50OiBhbnkpID0+IHRyZWUuZm9jdXNEcmlsbERvd24oKSxcclxuICBEUklMTF9VUDogKHRyZWU6IFRyZWVNb2RlbCwgbm9kZTogVHJlZU5vZGUsICRldmVudDogYW55KSA9PiB0cmVlLmZvY3VzRHJpbGxVcCgpLFxyXG4gIE5FWFRfTk9ERTogKHRyZWU6IFRyZWVNb2RlbCwgbm9kZTogVHJlZU5vZGUsICRldmVudDogYW55KSA9PiAgdHJlZS5mb2N1c05leHROb2RlKCksXHJcbiAgUFJFVklPVVNfTk9ERTogKHRyZWU6IFRyZWVNb2RlbCwgbm9kZTogVHJlZU5vZGUsICRldmVudDogYW55KSA9PiAgdHJlZS5mb2N1c1ByZXZpb3VzTm9kZSgpLFxyXG4gIE1PVkVfTk9ERTogKHRyZWU6IFRyZWVNb2RlbCwgbm9kZTogVHJlZU5vZGUsICRldmVudDogYW55LCB7ZnJvbSAsIHRvfToge2Zyb206IGFueSwgdG86IGFueX0pID0+IHtcclxuICAgIC8vIGRlZmF1bHQgYWN0aW9uIGFzc3VtZXMgZnJvbSA9IG5vZGUsIHRvID0ge3BhcmVudCwgaW5kZXh9XHJcbiAgICBpZiAoJGV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgdHJlZS5jb3B5Tm9kZShmcm9tLCB0byk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0cmVlLm1vdmVOb2RlKGZyb20sIHRvKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0QWN0aW9uTWFwcGluZzogSUFjdGlvbk1hcHBpbmcgPSB7XHJcbiAgbW91c2U6IHtcclxuICAgIGNsaWNrOiBUUkVFX0FDVElPTlMuVE9HR0xFX0FDVElWRSxcclxuICAgIGRibENsaWNrOiBudWxsLFxyXG4gICAgY29udGV4dE1lbnU6IG51bGwsXHJcbiAgICBleHBhbmRlckNsaWNrOiBUUkVFX0FDVElPTlMuVE9HR0xFX0VYUEFOREVELFxyXG4gICAgY2hlY2tib3hDbGljazogVFJFRV9BQ1RJT05TLlRPR0dMRV9TRUxFQ1RFRCxcclxuICAgIGRyb3A6IFRSRUVfQUNUSU9OUy5NT1ZFX05PREVcclxuICB9LFxyXG4gIGtleXM6IHtcclxuICAgIFtLRVlTLlJJR0hUXTogVFJFRV9BQ1RJT05TLkRSSUxMX0RPV04sXHJcbiAgICBbS0VZUy5MRUZUXTogVFJFRV9BQ1RJT05TLkRSSUxMX1VQLFxyXG4gICAgW0tFWVMuRE9XTl06IFRSRUVfQUNUSU9OUy5ORVhUX05PREUsXHJcbiAgICBbS0VZUy5VUF06IFRSRUVfQUNUSU9OUy5QUkVWSU9VU19OT0RFLFxyXG4gICAgW0tFWVMuU1BBQ0VdOiBUUkVFX0FDVElPTlMuVE9HR0xFX0FDVElWRSxcclxuICAgIFtLRVlTLkVOVEVSXTogVFJFRV9BQ1RJT05TLlRPR0dMRV9BQ1RJVkVcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBY3Rpb25NYXBwaW5nIHtcclxuICBtb3VzZT86IHtcclxuICAgIGNsaWNrPzogSUFjdGlvbkhhbmRsZXIsXHJcbiAgICBkYmxDbGljaz86IElBY3Rpb25IYW5kbGVyLFxyXG4gICAgY29udGV4dE1lbnU/OiBJQWN0aW9uSGFuZGxlcixcclxuICAgIGV4cGFuZGVyQ2xpY2s/OiBJQWN0aW9uSGFuZGxlcixcclxuICAgIGNoZWNrYm94Q2xpY2s/OiBJQWN0aW9uSGFuZGxlcixcclxuICAgIGRyYWdTdGFydD86IElBY3Rpb25IYW5kbGVyLFxyXG4gICAgZHJhZz86IElBY3Rpb25IYW5kbGVyLFxyXG4gICAgZHJhZ0VuZD86IElBY3Rpb25IYW5kbGVyLFxyXG4gICAgZHJhZ092ZXI/OiBJQWN0aW9uSGFuZGxlcixcclxuICAgIGRyYWdMZWF2ZT86IElBY3Rpb25IYW5kbGVyLFxyXG4gICAgZHJhZ0VudGVyPzogSUFjdGlvbkhhbmRsZXIsXHJcbiAgICBkcm9wPzogSUFjdGlvbkhhbmRsZXIsXHJcbiAgICBtb3VzZU92ZXI/OiBJQWN0aW9uSGFuZGxlcixcclxuICAgIG1vdXNlT3V0PzogSUFjdGlvbkhhbmRsZXJcclxuICB9O1xyXG4gIGtleXM/OiB7XHJcbiAgICBba2V5OiBudW1iZXJdOiBJQWN0aW9uSGFuZGxlclxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUcmVlT3B0aW9ucyB7XHJcbiAgZ2V0IGhhc0NoaWxkcmVuRmllbGQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5oYXNDaGlsZHJlbkZpZWxkIHx8ICdoYXNDaGlsZHJlbic7IH1cclxuICBnZXQgY2hpbGRyZW5GaWVsZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5vcHRpb25zLmNoaWxkcmVuRmllbGQgfHwgJ2NoaWxkcmVuJzsgfVxyXG4gIGdldCBkaXNwbGF5RmllbGQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5kaXNwbGF5RmllbGQgfHwgJ25hbWUnOyB9XHJcbiAgZ2V0IGlkRmllbGQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5pZEZpZWxkIHx8ICdpZCc7IH1cclxuICBnZXQgaXNFeHBhbmRlZEZpZWxkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLm9wdGlvbnMuaXNFeHBhbmRlZEZpZWxkIHx8ICdpc0V4cGFuZGVkJzsgfVxyXG4gIGdldCBnZXRDaGlsZHJlbigpOiBhbnkgeyByZXR1cm4gdGhpcy5vcHRpb25zLmdldENoaWxkcmVuOyB9XHJcbiAgZ2V0IGxldmVsUGFkZGluZygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5vcHRpb25zLmxldmVsUGFkZGluZyB8fCAwOyB9XHJcbiAgZ2V0IHVzZVZpcnR1YWxTY3JvbGwoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm9wdGlvbnMudXNlVmlydHVhbFNjcm9sbDsgfVxyXG4gIGdldCBhbmltYXRlRXhwYW5kKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5vcHRpb25zLmFuaW1hdGVFeHBhbmQ7IH1cclxuICBnZXQgYW5pbWF0ZVNwZWVkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLm9wdGlvbnMuYW5pbWF0ZVNwZWVkIHx8IDE7IH1cclxuICBnZXQgYW5pbWF0ZUFjY2VsZXJhdGlvbigpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5vcHRpb25zLmFuaW1hdGVBY2NlbGVyYXRpb24gfHwgMS4yOyB9XHJcbiAgZ2V0IHNjcm9sbE9uQWN0aXZhdGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm9wdGlvbnMuc2Nyb2xsT25BY3RpdmF0ZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHRoaXMub3B0aW9ucy5zY3JvbGxPbkFjdGl2YXRlOyB9XHJcbiAgZ2V0IHJ0bCgpOiBib29sZWFuIHsgcmV0dXJuICEhdGhpcy5vcHRpb25zLnJ0bDsgfVxyXG4gIGdldCByb290SWQoKTogYW55IHtyZXR1cm4gdGhpcy5vcHRpb25zLnJvb3RJZDsgfVxyXG4gIGdldCB1c2VDaGVja2JveCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMub3B0aW9ucy51c2VDaGVja2JveDsgfVxyXG4gIGdldCB1c2VUcmlTdGF0ZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMub3B0aW9ucy51c2VUcmlTdGF0ZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHRoaXMub3B0aW9ucy51c2VUcmlTdGF0ZTsgfVxyXG4gIGdldCBzY3JvbGxDb250YWluZXIoKTogSFRNTEVsZW1lbnQgeyByZXR1cm4gdGhpcy5vcHRpb25zLnNjcm9sbENvbnRhaW5lcjsgfVxyXG4gIGdldCBhbGxvd0RyYWdvdmVyU3R5bGluZygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5hbGxvd0RyYWdvdmVyU3R5bGluZyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHRoaXMub3B0aW9ucy5hbGxvd0RyYWdvdmVyU3R5bGluZzsgfVxyXG4gIGFjdGlvbk1hcHBpbmc6IElBY3Rpb25NYXBwaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wdGlvbnM6IElUcmVlT3B0aW9ucyA9IHt9KSB7XHJcbiAgICB0aGlzLmFjdGlvbk1hcHBpbmcgPSB7XHJcbiAgICAgIG1vdXNlOiB7XHJcbiAgICAgICAgY2xpY2s6IHRoaXMub3B0aW9ucz8uYWN0aW9uTWFwcGluZz8ubW91c2U/LmNsaWNrID8/IGRlZmF1bHRBY3Rpb25NYXBwaW5nLm1vdXNlLmNsaWNrLFxyXG4gICAgICAgIGRibENsaWNrOiB0aGlzLm9wdGlvbnM/LmFjdGlvbk1hcHBpbmc/Lm1vdXNlPy5kYmxDbGljayA/PyBkZWZhdWx0QWN0aW9uTWFwcGluZy5tb3VzZS5kYmxDbGljayxcclxuICAgICAgICBjb250ZXh0TWVudTogdGhpcy5vcHRpb25zPy5hY3Rpb25NYXBwaW5nPy5tb3VzZT8uY29udGV4dE1lbnUgPz8gZGVmYXVsdEFjdGlvbk1hcHBpbmcubW91c2UuY29udGV4dE1lbnUsXHJcbiAgICAgICAgZXhwYW5kZXJDbGljazogdGhpcy5vcHRpb25zPy5hY3Rpb25NYXBwaW5nPy5tb3VzZT8uZXhwYW5kZXJDbGljayA/PyBkZWZhdWx0QWN0aW9uTWFwcGluZy5tb3VzZS5leHBhbmRlckNsaWNrLFxyXG4gICAgICAgIGNoZWNrYm94Q2xpY2s6IHRoaXMub3B0aW9ucz8uYWN0aW9uTWFwcGluZz8ubW91c2U/LmNoZWNrYm94Q2xpY2sgPz8gZGVmYXVsdEFjdGlvbk1hcHBpbmcubW91c2UuY2hlY2tib3hDbGljayxcclxuICAgICAgICBkcm9wOiB0aGlzLm9wdGlvbnM/LmFjdGlvbk1hcHBpbmc/Lm1vdXNlPy5kcm9wID8/IGRlZmF1bHRBY3Rpb25NYXBwaW5nLm1vdXNlLmRyb3AsXHJcbiAgICAgICAgZHJhZ1N0YXJ0OiB0aGlzLm9wdGlvbnM/LmFjdGlvbk1hcHBpbmc/Lm1vdXNlPy5kcmFnU3RhcnQgPz8gdW5kZWZpbmVkLFxyXG4gICAgICAgIGRyYWc6IHRoaXMub3B0aW9ucz8uYWN0aW9uTWFwcGluZz8ubW91c2U/LmRyYWcgPz8gdW5kZWZpbmVkLFxyXG4gICAgICAgIGRyYWdFbmQ6IHRoaXMub3B0aW9ucz8uYWN0aW9uTWFwcGluZz8ubW91c2U/LmRyYWdFbmQgPz8gdW5kZWZpbmVkLFxyXG4gICAgICAgIGRyYWdPdmVyOiB0aGlzLm9wdGlvbnM/LmFjdGlvbk1hcHBpbmc/Lm1vdXNlPy5kcmFnT3ZlciA/PyB1bmRlZmluZWQsXHJcbiAgICAgICAgZHJhZ0xlYXZlOiB0aGlzLm9wdGlvbnM/LmFjdGlvbk1hcHBpbmc/Lm1vdXNlPy5kcmFnTGVhdmUgPz8gdW5kZWZpbmVkLFxyXG4gICAgICAgIGRyYWdFbnRlcjogdGhpcy5vcHRpb25zPy5hY3Rpb25NYXBwaW5nPy5tb3VzZT8uZHJhZ0VudGVyID8/IHVuZGVmaW5lZCxcclxuICAgICAgICBtb3VzZU92ZXI6IHRoaXMub3B0aW9ucz8uYWN0aW9uTWFwcGluZz8ubW91c2U/Lm1vdXNlT3ZlciA/PyB1bmRlZmluZWQsXHJcbiAgICAgICAgbW91c2VPdXQ6IHRoaXMub3B0aW9ucz8uYWN0aW9uTWFwcGluZz8ubW91c2U/Lm1vdXNlT3V0ID8/IHVuZGVmaW5lZCxcclxuICAgICAgfSxcclxuICAgICAga2V5czoge1xyXG4gICAgICAgIFtLRVlTLlJJR0hUXTogVFJFRV9BQ1RJT05TLkRSSUxMX0RPV04sXHJcbiAgICAgICAgW0tFWVMuTEVGVF06IFRSRUVfQUNUSU9OUy5EUklMTF9VUCxcclxuICAgICAgICBbS0VZUy5ET1dOXTogVFJFRV9BQ1RJT05TLk5FWFRfTk9ERSxcclxuICAgICAgICBbS0VZUy5VUF06IFRSRUVfQUNUSU9OUy5QUkVWSU9VU19OT0RFLFxyXG4gICAgICAgIFtLRVlTLlNQQUNFXTogVFJFRV9BQ1RJT05TLlRPR0dMRV9BQ1RJVkUsXHJcbiAgICAgICAgW0tFWVMuRU5URVJdOiBUUkVFX0FDVElPTlMuVE9HR0xFX0FDVElWRVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucz8uYWN0aW9uTWFwcGluZz8ua2V5cykge1xyXG4gICAgICB0aGlzLmFjdGlvbk1hcHBpbmcua2V5cyA9IHtcclxuICAgICAgICAuLi50aGlzLmFjdGlvbk1hcHBpbmcua2V5cyxcclxuICAgICAgICAuLi50aGlzLm9wdGlvbnMuYWN0aW9uTWFwcGluZy5rZXlzXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucy5ydGwpIHtcclxuICAgICAgdGhpcy5hY3Rpb25NYXBwaW5nLmtleXNbS0VZUy5SSUdIVF0gPSA8SUFjdGlvbkhhbmRsZXI+b3B0aW9ucy5hY3Rpb25NYXBwaW5nPy5rZXlzW0tFWVMuUklHSFRdIHx8IFRSRUVfQUNUSU9OUy5EUklMTF9VUDtcclxuICAgICAgdGhpcy5hY3Rpb25NYXBwaW5nLmtleXNbS0VZUy5MRUZUXSA9IDxJQWN0aW9uSGFuZGxlcj5vcHRpb25zLmFjdGlvbk1hcHBpbmc/LmtleXNbS0VZUy5MRUZUXSB8fCBUUkVFX0FDVElPTlMuRFJJTExfRE9XTjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldE5vZGVDbG9uZShub2RlOiBUcmVlTm9kZSk6IGFueSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmdldE5vZGVDbG9uZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmdldE5vZGVDbG9uZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZW1vdmUgaWQgZnJvbSBjbG9uZVxyXG4gICAgLy8ga2VlcGluZyBpZTExIGNvbXBhdGliaWxpdHlcclxuICAgIGNvbnN0IG5vZGVDbG9uZSA9IE9iamVjdC5hc3NpZ24oe30sIG5vZGUuZGF0YSk7XHJcbiAgICBpZiAobm9kZUNsb25lLmlkKSB7XHJcbiAgICAgIGRlbGV0ZSBub2RlQ2xvbmUuaWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbm9kZUNsb25lO1xyXG4gIH1cclxuXHJcbiAgYWxsb3dEcm9wKGVsZW1lbnQsIHRvLCAkZXZlbnQ/KTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmFsbG93RHJvcCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYWxsb3dEcm9wKGVsZW1lbnQsIHRvLCAkZXZlbnQpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYWxsb3dEcm9wID09PSB1bmRlZmluZWQgPyB0cnVlIDogdGhpcy5vcHRpb25zLmFsbG93RHJvcDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFsbG93RHJhZyhub2RlOiBUcmVlTm9kZSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbGxvd0RyYWcgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFsbG93RHJhZyhub2RlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYWxsb3dEcmFnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbm9kZUNsYXNzKG5vZGU6IFRyZWVOb2RlKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubm9kZUNsYXNzID8gdGhpcy5vcHRpb25zLm5vZGVDbGFzcyhub2RlKSA6ICcnO1xyXG4gIH1cclxuXHJcbiAgbm9kZUhlaWdodChub2RlOiBUcmVlTm9kZSk6IG51bWJlciB7XHJcbiAgICBpZiAobm9kZS5kYXRhLnZpcnR1YWwpIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG5vZGVIZWlnaHQgPSB0aGlzLm9wdGlvbnMubm9kZUhlaWdodCB8fCAyMjtcclxuXHJcbiAgICBpZiAodHlwZW9mIG5vZGVIZWlnaHQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgbm9kZUhlaWdodCA9IG5vZGVIZWlnaHQobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWNjb3VudCBmb3IgZHJvcCBzbG90czpcclxuICAgIHJldHVybiBub2RlSGVpZ2h0ICsgKG5vZGUuaW5kZXggPT09IDAgPyAgMiA6IDEpICogdGhpcy5kcm9wU2xvdEhlaWdodDtcclxuICB9XHJcblxyXG4gIGdldCBkcm9wU2xvdEhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLm9wdGlvbnMuZHJvcFNsb3RIZWlnaHQgPT09ICdudW1iZXInID8gdGhpcy5vcHRpb25zLmRyb3BTbG90SGVpZ2h0IDogMjtcclxuICB9XHJcbn1cclxuIl19