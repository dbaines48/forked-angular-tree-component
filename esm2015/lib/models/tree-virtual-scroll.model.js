var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { observable, computed, action, autorun, reaction } from 'mobx';
import { TreeModel } from './tree.model';
import { TREE_EVENTS } from '../constants/events';
const Y_OFFSET = 500; // Extra pixels outside the viewport, in each direction, to render nodes in
const Y_EPSILON = 150; // Minimum pixel change required to recalculate the rendered nodes
export class TreeVirtualScroll {
    constructor(treeModel) {
        this.treeModel = treeModel;
        this.yBlocks = 0;
        this.x = 0;
        this.viewportHeight = null;
        this.viewport = null;
        treeModel.virtualScroll = this;
        this._dispose = [autorun(() => this.fixScroll())];
    }
    get y() {
        return this.yBlocks * Y_EPSILON;
    }
    get totalHeight() {
        return this.treeModel.virtualRoot ? this.treeModel.virtualRoot.height : 0;
    }
    fireEvent(event) {
        this.treeModel.fireEvent(event);
    }
    init() {
        const fn = this.recalcPositions.bind(this);
        fn();
        this._dispose = [
            ...this._dispose,
            reaction(() => this.treeModel.roots, fn),
            reaction(() => this.treeModel.expandedNodeIds, fn),
            reaction(() => this.treeModel.hiddenNodeIds, fn)
        ];
        this.treeModel.subscribe(TREE_EVENTS.loadNodeChildren, fn);
    }
    isEnabled() {
        return this.treeModel.options.useVirtualScroll;
    }
    _setYBlocks(value) {
        this.yBlocks = value;
    }
    recalcPositions() {
        this.treeModel.virtualRoot.height = this._getPositionAfter(this.treeModel.getVisibleRoots(), 0);
    }
    _getPositionAfter(nodes, startPos) {
        let position = startPos;
        nodes.forEach(node => {
            node.position = position;
            position = this._getPositionAfterNode(node, position);
        });
        return position;
    }
    _getPositionAfterNode(node, startPos) {
        let position = node.getSelfHeight() + startPos;
        if (node.children && node.isExpanded) {
            // TBD: consider loading component as well
            position = this._getPositionAfter(node.visibleChildren, position);
        }
        node.height = position - startPos;
        return position;
    }
    clear() {
        this._dispose.forEach(d => d());
    }
    setViewport(viewport) {
        this.viewport = viewport;
        this.x = viewport.scrollLeft;
        this.yBlocks = Math.round(viewport.scrollTop / Y_EPSILON);
        this.viewportHeight = viewport.getBoundingClientRect
            ? viewport.getBoundingClientRect().height
            : 0;
    }
    scrollIntoView(node, force, scrollToMiddle = true) {
        if (node.options.scrollContainer) {
            const scrollContainer = node.options.scrollContainer;
            const scrollContainerHeight = scrollContainer.getBoundingClientRect()
                .height;
            const scrollContainerTop = scrollContainer.getBoundingClientRect().top;
            const nodeTop = this.viewport.getBoundingClientRect().top +
                node.position -
                scrollContainerTop;
            if (force || // force scroll to node
                nodeTop < scrollContainer.scrollTop || // node is above scroll container
                nodeTop + node.getSelfHeight() >
                    scrollContainer.scrollTop + scrollContainerHeight) {
                // node is below container
                scrollContainer.scrollTop = scrollToMiddle
                    ? nodeTop - scrollContainerHeight / 2 // scroll to middle
                    : nodeTop; // scroll to start
            }
        }
        else {
            if (force || // force scroll to node
                node.position < this.y || // node is above viewport
                node.position + node.getSelfHeight() > this.y + this.viewportHeight) {
                // node is below viewport
                if (this.viewport) {
                    this.viewport.scrollTop = scrollToMiddle
                        ? node.position - this.viewportHeight / 2 // scroll to middle
                        : node.position; // scroll to start
                    this._setYBlocks(Math.floor(this.viewport.scrollTop / Y_EPSILON));
                }
            }
        }
    }
    getViewportNodes(nodes) {
        if (!nodes)
            return [];
        const visibleNodes = nodes.filter(node => !node.isHidden);
        if (!this.isEnabled())
            return visibleNodes;
        if (!this.viewportHeight || !visibleNodes.length)
            return [];
        // When loading children async this method is called before their height and position is calculated.
        // In that case firstIndex === 0 and lastIndex === visibleNodes.length - 1 (e.g. 1000),
        // which means that it loops through every visibleNodes item and push them into viewportNodes array.
        // We can prevent nodes from being pushed to the array and wait for the appropriate calculations to take place
        const lastVisibleNode = visibleNodes.slice(-1)[0];
        if (!lastVisibleNode.height && lastVisibleNode.position === 0)
            return [];
        // Search for first node in the viewport using binary search
        // Look for first node that starts after the beginning of the viewport (with buffer)
        // Or that ends after the beginning of the viewport
        const firstIndex = binarySearch(visibleNodes, node => {
            return (node.position + Y_OFFSET > this.y ||
                node.position + node.height > this.y);
        });
        // Search for last node in the viewport using binary search
        // Look for first node that starts after the end of the viewport (with buffer)
        const lastIndex = binarySearch(visibleNodes, node => {
            return node.position - Y_OFFSET > this.y + this.viewportHeight;
        }, firstIndex);
        const viewportNodes = [];
        for (let i = firstIndex; i <= lastIndex; i++) {
            viewportNodes.push(visibleNodes[i]);
        }
        return viewportNodes;
    }
    fixScroll() {
        const maxY = Math.max(0, this.totalHeight - this.viewportHeight);
        if (this.y < 0)
            this._setYBlocks(0);
        if (this.y > maxY)
            this._setYBlocks(maxY / Y_EPSILON);
    }
}
TreeVirtualScroll.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TreeVirtualScroll.ctorParameters = () => [
    { type: TreeModel }
];
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeVirtualScroll.prototype, "yBlocks", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeVirtualScroll.prototype, "x", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeVirtualScroll.prototype, "viewportHeight", void 0);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeVirtualScroll.prototype, "y", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeVirtualScroll.prototype, "totalHeight", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeVirtualScroll.prototype, "_setYBlocks", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeVirtualScroll.prototype, "recalcPositions", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeVirtualScroll.prototype, "setViewport", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], TreeVirtualScroll.prototype, "scrollIntoView", null);
function binarySearch(nodes, condition, firstIndex = 0) {
    let index = firstIndex;
    let toIndex = nodes.length - 1;
    while (index !== toIndex) {
        let midIndex = Math.floor((index + toIndex) / 2);
        if (condition(nodes[midIndex])) {
            toIndex = midIndex;
        }
        else {
            if (index === midIndex)
                index = toIndex;
            else
                index = midIndex;
        }
    }
    return index;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItdHJlZS1jb21wb25lbnQvc3JjL2xpYi9tb2RlbHMvdHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWxELE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLDJFQUEyRTtBQUNqRyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxrRUFBa0U7QUFHekYsTUFBTSxPQUFPLGlCQUFpQjtJQWdCNUIsWUFBb0IsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQWI1QixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osTUFBQyxHQUFHLENBQUMsQ0FBQztRQUNOLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFXZCxTQUFTLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQVhTLElBQUksQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7SUFDbEMsQ0FBQztJQUVTLElBQUksV0FBVztRQUN2QixPQUFPLElBQUks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QVM7O0FBVUo7SUFBWCxVQUFVOztrREFBYTtBQUNaO0lBQVgsVUFBVTs7NENBQU87QUFDTjtJQUFYLFVBQVU7O3lEQUF1QjtBQUd4QjtJQUFULFFBQVE7OzswQ0FFUjtBQUVTO0lBQVQsUUFBUTs7O29EQUVSO0FBNEJPO0lBQVAsTUFBTTs7OztvREFFTjtBQUVPO0lBQVAsTUFBTTs7Ozt3REFLTjtBQTJCTztJQUFQLE1BQU07Ozs7b0RBT047QUFFTztJQUFQLE1BQU07Ozs7dURBc0NOO0FBdURILFNBQVMsWUFBWSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxHQUFHLENBQUM7SUFDcEQsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDO0lBQ3ZCLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBRS9CLE9BQU8sS0FBSyxLQUFLLE9BQU8sRUFBRTtRQUN4QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWpELElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFO1lBQzlCLE9BQU8sR0FBRyxRQUFRLENBQUM7U0FDcEI7YUFBTTtZQUNMLElBQUksS0FBSyxLQUFLLFFBQVE7Z0JBQUUsS0FBSyxHQUFHLE9BQU8sQ0FBQzs7Z0JBQ25DLEtBQUssR0FBRyxRQUFRLENBQUM7U0FDdkI7S0FDRjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgb2JzZXJ2YWJsZSwgY29tcHV0ZWQsIGFjdGlvbiwgYXV0b3J1biwgcmVhY3Rpb24gfSBmcm9tICdtb2J4JztcclxuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi90cmVlLm1vZGVsJztcclxuaW1wb3J0IHsgVFJFRV9FVkVOVFMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzJztcclxuXHJcbmNvbnN0IFlfT0ZGU0VUID0gNTAwOyAvLyBFeHRyYSBwaXhlbHMgb3V0c2lkZSB0aGUgdmlld3BvcnQsIGluIGVhY2ggZGlyZWN0aW9uLCB0byByZW5kZXIgbm9kZXMgaW5cclxuY29uc3QgWV9FUFNJTE9OID0gMTUwOyAvLyBNaW5pbXVtIHBpeGVsIGNoYW5nZSByZXF1aXJlZCB0byByZWNhbGN1bGF0ZSB0aGUgcmVuZGVyZWQgbm9kZXNcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRyZWVWaXJ0dWFsU2Nyb2xsIHtcclxuICBwcml2YXRlIF9kaXNwb3NlOiBhbnk7XHJcblxyXG4gIEBvYnNlcnZhYmxlIHlCbG9ja3MgPSAwO1xyXG4gIEBvYnNlcnZhYmxlIHggPSAwO1xyXG4gIEBvYnNlcnZhYmxlIHZpZXdwb3J0SGVpZ2h0ID0gbnVsbDtcclxuICB2aWV3cG9ydCA9IG51bGw7XHJcblxyXG4gIEBjb21wdXRlZCBnZXQgeSgpIHtcclxuICAgIHJldHVybiB0aGlzLnlCbG9ja3MgKiBZX0VQU0lMT047XHJcbiAgfVxyXG5cclxuICBAY29tcHV0ZWQgZ2V0IHRvdGFsSGVpZ2h0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudHJlZU1vZGVsLnZpcnR1YWxSb290ID8gdGhpcy50cmVlTW9kZWwudmlydHVhbFJvb3QuaGVpZ2h0IDogMDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJlZU1vZGVsOiBUcmVlTW9kZWwpIHtcclxuICAgIHRyZWVNb2RlbC52aXJ0dWFsU2Nyb2xsID0gdGhpcztcclxuICAgIHRoaXMuX2Rpc3Bvc2UgPSBbYXV0b3J1bigoKSA9PiB0aGlzLmZpeFNjcm9sbCgpKV07XHJcbiAgfVxyXG5cclxuICBmaXJlRXZlbnQoZXZlbnQpIHtcclxuICAgIHRoaXMudHJlZU1vZGVsLmZpcmVFdmVudChldmVudCk7XHJcbiAgfVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgY29uc3QgZm4gPSB0aGlzLnJlY2FsY1Bvc2l0aW9ucy5iaW5kKHRoaXMpO1xyXG5cclxuICAgIGZuKCk7XHJcbiAgICB0aGlzLl9kaXNwb3NlID0gW1xyXG4gICAgICAuLi50aGlzLl9kaXNwb3NlLFxyXG4gICAgICByZWFjdGlvbigoKSA9PiB0aGlzLnRyZWVNb2RlbC5yb290cywgZm4pLFxyXG4gICAgICByZWFjdGlvbigoKSA9PiB0aGlzLnRyZWVNb2RlbC5leHBhbmRlZE5vZGVJZHMsIGZuKSxcclxuICAgICAgcmVhY3Rpb24oKCkgPT4gdGhpcy50cmVlTW9kZWwuaGlkZGVuTm9kZUlkcywgZm4pXHJcbiAgICBdO1xyXG4gICAgdGhpcy50cmVlTW9kZWwuc3Vic2NyaWJlKFRSRUVfRVZFTlRTLmxvYWROb2RlQ2hpbGRyZW4sIGZuKTtcclxuICB9XHJcblxyXG4gIGlzRW5hYmxlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLnRyZWVNb2RlbC5vcHRpb25zLnVzZVZpcnR1YWxTY3JvbGw7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHByaXZhdGUgX3NldFlCbG9ja3ModmFsdWUpIHtcclxuICAgIHRoaXMueUJsb2NrcyA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgQGFjdGlvbiByZWNhbGNQb3NpdGlvbnMoKSB7XHJcbiAgICB0aGlzLnRyZWVNb2RlbC52aXJ0dWFsUm9vdC5oZWlnaHQgPSB0aGlzLl9nZXRQb3NpdGlvbkFmdGVyKFxyXG4gICAgICB0aGlzLnRyZWVNb2RlbC5nZXRWaXNpYmxlUm9vdHMoKSxcclxuICAgICAgMFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldFBvc2l0aW9uQWZ0ZXIobm9kZXMsIHN0YXJ0UG9zKSB7XHJcbiAgICBsZXQgcG9zaXRpb24gPSBzdGFydFBvcztcclxuXHJcbiAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICBub2RlLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgIHBvc2l0aW9uID0gdGhpcy5fZ2V0UG9zaXRpb25BZnRlck5vZGUobm9kZSwgcG9zaXRpb24pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcG9zaXRpb247XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRQb3NpdGlvbkFmdGVyTm9kZShub2RlLCBzdGFydFBvcykge1xyXG4gICAgbGV0IHBvc2l0aW9uID0gbm9kZS5nZXRTZWxmSGVpZ2h0KCkgKyBzdGFydFBvcztcclxuXHJcbiAgICBpZiAobm9kZS5jaGlsZHJlbiAmJiBub2RlLmlzRXhwYW5kZWQpIHtcclxuICAgICAgLy8gVEJEOiBjb25zaWRlciBsb2FkaW5nIGNvbXBvbmVudCBhcyB3ZWxsXHJcbiAgICAgIHBvc2l0aW9uID0gdGhpcy5fZ2V0UG9zaXRpb25BZnRlcihub2RlLnZpc2libGVDaGlsZHJlbiwgcG9zaXRpb24pO1xyXG4gICAgfVxyXG4gICAgbm9kZS5oZWlnaHQgPSBwb3NpdGlvbiAtIHN0YXJ0UG9zO1xyXG4gICAgcmV0dXJuIHBvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLl9kaXNwb3NlLmZvckVhY2goZCA9PiBkKCkpO1xyXG4gIH1cclxuXHJcbiAgQGFjdGlvbiBzZXRWaWV3cG9ydCh2aWV3cG9ydCkge1xyXG4gICAgdGhpcy52aWV3cG9ydCA9IHZpZXdwb3J0O1xyXG4gICAgdGhpcy54ID0gdmlld3BvcnQuc2Nyb2xsTGVmdDtcclxuICAgIHRoaXMueUJsb2NrcyA9IE1hdGgucm91bmQodmlld3BvcnQuc2Nyb2xsVG9wIC8gWV9FUFNJTE9OKTtcclxuICAgIHRoaXMudmlld3BvcnRIZWlnaHQgPSB2aWV3cG9ydC5nZXRCb3VuZGluZ0NsaWVudFJlY3RcclxuICAgICAgPyB2aWV3cG9ydC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcclxuICAgICAgOiAwO1xyXG4gIH1cclxuXHJcbiAgQGFjdGlvbiBzY3JvbGxJbnRvVmlldyhub2RlLCBmb3JjZSwgc2Nyb2xsVG9NaWRkbGUgPSB0cnVlKSB7XHJcbiAgICBpZiAobm9kZS5vcHRpb25zLnNjcm9sbENvbnRhaW5lcikge1xyXG4gICAgICBjb25zdCBzY3JvbGxDb250YWluZXIgPSBub2RlLm9wdGlvbnMuc2Nyb2xsQ29udGFpbmVyO1xyXG4gICAgICBjb25zdCBzY3JvbGxDb250YWluZXJIZWlnaHQgPSBzY3JvbGxDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgICAuaGVpZ2h0O1xyXG4gICAgICBjb25zdCBzY3JvbGxDb250YWluZXJUb3AgPSBzY3JvbGxDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG4gICAgICBjb25zdCBub2RlVG9wID1cclxuICAgICAgICB0aGlzLnZpZXdwb3J0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArXHJcbiAgICAgICAgbm9kZS5wb3NpdGlvbiAtXHJcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyVG9wO1xyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIGZvcmNlIHx8IC8vIGZvcmNlIHNjcm9sbCB0byBub2RlXHJcbiAgICAgICAgbm9kZVRvcCA8IHNjcm9sbENvbnRhaW5lci5zY3JvbGxUb3AgfHwgLy8gbm9kZSBpcyBhYm92ZSBzY3JvbGwgY29udGFpbmVyXHJcbiAgICAgICAgbm9kZVRvcCArIG5vZGUuZ2V0U2VsZkhlaWdodCgpID5cclxuICAgICAgICAgIHNjcm9sbENvbnRhaW5lci5zY3JvbGxUb3AgKyBzY3JvbGxDb250YWluZXJIZWlnaHRcclxuICAgICAgKSB7XHJcbiAgICAgICAgLy8gbm9kZSBpcyBiZWxvdyBjb250YWluZXJcclxuICAgICAgICBzY3JvbGxDb250YWluZXIuc2Nyb2xsVG9wID0gc2Nyb2xsVG9NaWRkbGVcclxuICAgICAgICAgID8gbm9kZVRvcCAtIHNjcm9sbENvbnRhaW5lckhlaWdodCAvIDIgLy8gc2Nyb2xsIHRvIG1pZGRsZVxyXG4gICAgICAgICAgOiBub2RlVG9wOyAvLyBzY3JvbGwgdG8gc3RhcnRcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGZvcmNlIHx8IC8vIGZvcmNlIHNjcm9sbCB0byBub2RlXHJcbiAgICAgICAgbm9kZS5wb3NpdGlvbiA8IHRoaXMueSB8fCAvLyBub2RlIGlzIGFib3ZlIHZpZXdwb3J0XHJcbiAgICAgICAgbm9kZS5wb3NpdGlvbiArIG5vZGUuZ2V0U2VsZkhlaWdodCgpID4gdGhpcy55ICsgdGhpcy52aWV3cG9ydEhlaWdodFxyXG4gICAgICApIHtcclxuICAgICAgICAvLyBub2RlIGlzIGJlbG93IHZpZXdwb3J0XHJcbiAgICAgICAgaWYgKHRoaXMudmlld3BvcnQpIHtcclxuICAgICAgICAgIHRoaXMudmlld3BvcnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9NaWRkbGVcclxuICAgICAgICAgICAgPyBub2RlLnBvc2l0aW9uIC0gdGhpcy52aWV3cG9ydEhlaWdodCAvIDIgLy8gc2Nyb2xsIHRvIG1pZGRsZVxyXG4gICAgICAgICAgICA6IG5vZGUucG9zaXRpb247IC8vIHNjcm9sbCB0byBzdGFydFxyXG5cclxuICAgICAgICAgIHRoaXMuX3NldFlCbG9ja3MoTWF0aC5mbG9vcih0aGlzLnZpZXdwb3J0LnNjcm9sbFRvcCAvIFlfRVBTSUxPTikpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0Vmlld3BvcnROb2Rlcyhub2Rlcykge1xyXG4gICAgaWYgKCFub2RlcykgcmV0dXJuIFtdO1xyXG5cclxuICAgIGNvbnN0IHZpc2libGVOb2RlcyA9IG5vZGVzLmZpbHRlcihub2RlID0+ICFub2RlLmlzSGlkZGVuKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuaXNFbmFibGVkKCkpIHJldHVybiB2aXNpYmxlTm9kZXM7XHJcblxyXG4gICAgaWYgKCF0aGlzLnZpZXdwb3J0SGVpZ2h0IHx8ICF2aXNpYmxlTm9kZXMubGVuZ3RoKSByZXR1cm4gW107XHJcblxyXG4gICAgLy8gV2hlbiBsb2FkaW5nIGNoaWxkcmVuIGFzeW5jIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCBiZWZvcmUgdGhlaXIgaGVpZ2h0IGFuZCBwb3NpdGlvbiBpcyBjYWxjdWxhdGVkLlxyXG4gICAgLy8gSW4gdGhhdCBjYXNlIGZpcnN0SW5kZXggPT09IDAgYW5kIGxhc3RJbmRleCA9PT0gdmlzaWJsZU5vZGVzLmxlbmd0aCAtIDEgKGUuZy4gMTAwMCksXHJcbiAgICAvLyB3aGljaCBtZWFucyB0aGF0IGl0IGxvb3BzIHRocm91Z2ggZXZlcnkgdmlzaWJsZU5vZGVzIGl0ZW0gYW5kIHB1c2ggdGhlbSBpbnRvIHZpZXdwb3J0Tm9kZXMgYXJyYXkuXHJcbiAgICAvLyBXZSBjYW4gcHJldmVudCBub2RlcyBmcm9tIGJlaW5nIHB1c2hlZCB0byB0aGUgYXJyYXkgYW5kIHdhaXQgZm9yIHRoZSBhcHByb3ByaWF0ZSBjYWxjdWxhdGlvbnMgdG8gdGFrZSBwbGFjZVxyXG4gICAgY29uc3QgbGFzdFZpc2libGVOb2RlID0gdmlzaWJsZU5vZGVzLnNsaWNlKC0xKVswXTtcclxuICAgIGlmICghbGFzdFZpc2libGVOb2RlLmhlaWdodCAmJiBsYXN0VmlzaWJsZU5vZGUucG9zaXRpb24gPT09IDApIHJldHVybiBbXTtcclxuXHJcbiAgICAvLyBTZWFyY2ggZm9yIGZpcnN0IG5vZGUgaW4gdGhlIHZpZXdwb3J0IHVzaW5nIGJpbmFyeSBzZWFyY2hcclxuICAgIC8vIExvb2sgZm9yIGZpcnN0IG5vZGUgdGhhdCBzdGFydHMgYWZ0ZXIgdGhlIGJlZ2lubmluZyBvZiB0aGUgdmlld3BvcnQgKHdpdGggYnVmZmVyKVxyXG4gICAgLy8gT3IgdGhhdCBlbmRzIGFmdGVyIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHZpZXdwb3J0XHJcbiAgICBjb25zdCBmaXJzdEluZGV4ID0gYmluYXJ5U2VhcmNoKHZpc2libGVOb2Rlcywgbm9kZSA9PiB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgbm9kZS5wb3NpdGlvbiArIFlfT0ZGU0VUID4gdGhpcy55IHx8XHJcbiAgICAgICAgbm9kZS5wb3NpdGlvbiArIG5vZGUuaGVpZ2h0ID4gdGhpcy55XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTZWFyY2ggZm9yIGxhc3Qgbm9kZSBpbiB0aGUgdmlld3BvcnQgdXNpbmcgYmluYXJ5IHNlYXJjaFxyXG4gICAgLy8gTG9vayBmb3IgZmlyc3Qgbm9kZSB0aGF0IHN0YXJ0cyBhZnRlciB0aGUgZW5kIG9mIHRoZSB2aWV3cG9ydCAod2l0aCBidWZmZXIpXHJcbiAgICBjb25zdCBsYXN0SW5kZXggPSBiaW5hcnlTZWFyY2goXHJcbiAgICAgIHZpc2libGVOb2RlcyxcclxuICAgICAgbm9kZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG5vZGUucG9zaXRpb24gLSBZX09GRlNFVCA+IHRoaXMueSArIHRoaXMudmlld3BvcnRIZWlnaHQ7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZpcnN0SW5kZXhcclxuICAgICk7XHJcblxyXG4gICAgY29uc3Qgdmlld3BvcnROb2RlcyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSBmaXJzdEluZGV4OyBpIDw9IGxhc3RJbmRleDsgaSsrKSB7XHJcbiAgICAgIHZpZXdwb3J0Tm9kZXMucHVzaCh2aXNpYmxlTm9kZXNbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2aWV3cG9ydE5vZGVzO1xyXG4gIH1cclxuXHJcbiAgZml4U2Nyb2xsKCkge1xyXG4gICAgY29uc3QgbWF4WSA9IE1hdGgubWF4KDAsIHRoaXMudG90YWxIZWlnaHQgLSB0aGlzLnZpZXdwb3J0SGVpZ2h0KTtcclxuXHJcbiAgICBpZiAodGhpcy55IDwgMCkgdGhpcy5fc2V0WUJsb2NrcygwKTtcclxuICAgIGlmICh0aGlzLnkgPiBtYXhZKSB0aGlzLl9zZXRZQmxvY2tzKG1heFkgLyBZX0VQU0lMT04pO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYmluYXJ5U2VhcmNoKG5vZGVzLCBjb25kaXRpb24sIGZpcnN0SW5kZXggPSAwKSB7XHJcbiAgbGV0IGluZGV4ID0gZmlyc3RJbmRleDtcclxuICBsZXQgdG9JbmRleCA9IG5vZGVzLmxlbmd0aCAtIDE7XHJcblxyXG4gIHdoaWxlIChpbmRleCAhPT0gdG9JbmRleCkge1xyXG4gICAgbGV0IG1pZEluZGV4ID0gTWF0aC5mbG9vcigoaW5kZXggKyB0b0luZGV4KSAvIDIpO1xyXG5cclxuICAgIGlmIChjb25kaXRpb24obm9kZXNbbWlkSW5kZXhdKSkge1xyXG4gICAgICB0b0luZGV4ID0gbWlkSW5kZXg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoaW5kZXggPT09IG1pZEluZGV4KSBpbmRleCA9IHRvSW5kZXg7XHJcbiAgICAgIGVsc2UgaW5kZXggPSBtaWRJbmRleDtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGluZGV4O1xyXG59XHJcbiJdfQ==