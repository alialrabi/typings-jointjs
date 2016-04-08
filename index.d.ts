// Type definitions for Joint JS 0.9.7
// Project: http://www.jointjs.com/
// Definitions by: Federico Caselli <http://github.com/CaselIT>

export var g: any;
export var V: any;

declare namespace dia {
  interface Size {
    width: number;
    height: number;
  }

  interface Point {
    x: number;
    y: number;
  }

  interface BBox extends Point, Size { }

  interface TranslateOptions {
    restrictedArea?: BBox;
    transition?: TransitionOptions;
  }

  interface TransitionOptions {
    delay?: number;
    duration?: number;
    timingFunction?: (t: number) => number;
    valueFunction?: (a: any, b: any) => (t: number) => any;
  }

  interface DfsBfsOptions {
    inbound?: boolean;
    outbound?: boolean;
    deep?: boolean;
  }

  interface ExploreOptions {
    breadthFirst?: boolean;
    deep?: boolean;
  }

  class Graph extends Backbone.Model {
    constructor(attributes?: any, options?: { cellNamespace: any });
    addCell(cell: Cell | Cell[]): this;
    addCells(cells: Cell[]): this;
    resetCells(cells: Cell[], options?: any): this;
    getCell(id: string): Cell;
    getElements(): Element[];
    getLinks(): Link[];
    getCells(): Cell[];
    getFirstCell(): Cell;
    getLastCell(): Cell;
    getConnectedLinks(element: Cell, options?: { inbound?: boolean, outbound?: boolean, deep?: boolean }): Link[];
    disconnectLinks(cell: Cell): void;
    removeLinks(cell: Cell): void;
    translate(tx: number, ty?: number, options?: TranslateOptions): void
    cloneCells(cells: Cell[]): { [id: string]: Cell };
    getSubgraph(cells: Cell[], options?: { deep?: boolean }): Cell[];
    cloneSubgraph(cells: Cell[], options?: { deep?: boolean }): { [id: string]: Cell };
    dfs(element: Element, iteratee: (element: Element, distance: number) => boolean, options?: DfsBfsOptions): void;
    bfs(element: Element, iteratee: (element: Element, distance: number) => boolean, options?: DfsBfsOptions): void;
    search(element: Element, iteratee: (element: Element, distance: number) => boolean, options?: { breadthFirst?: boolean }): void;
    getSuccessors(element: Element, options?: ExploreOptions): Element[];
    getPredecessors(element: Element, options?: ExploreOptions): Element[];
    isSuccessor(elementA: Element, elementB: Element): boolean;
    isPredecessor(elementA: Element, elementB: Element): boolean;
    isSource(element: Element): boolean;
    isSink(element: Element): boolean;
    getSources(): Element[];
    getSinks(): Element[];
    getNeighbors(element: Element, options?: DfsBfsOptions): Element[];
    isNeighbor(elementA: Element, elementB: Element, options?: { inbound?: boolean, outbound?: boolean; }): boolean;
    getCommonAncestor(...cells: Cell[]): Element;
    toJSON(): any;
    fromJSON(json: any, options?: any): this;
    clear(options?: any): this;
    findModelsFromPoint(rect: BBox): Element[];
    findModelsUnderElement(element: Element, options?: { searchBy?: 'bbox' | 'center' | 'origin' | 'corner' | 'topRight' | 'bottomLeft' }): Element[];
    getBBox(elements: Element[]): BBox;
    toGraphLib(): any; // graphlib graph object
  }

  class Cell extends Backbone.Model {
    id: string;
    toJSON(): any;
    remove(options?: { disconnectLinks?: boolean }): this;
    toFront(options?: { deep?: boolean }): this;
    toBack(options?: { deep?: boolean }): this;
    getAncestors(): Cell[];
    isEmbeddedIn(element: Element, options?: { deep: boolean }): boolean;
    prop(object: any): this;
    prop(key: string): any;
    prop(key: string, value: any): this;
    removeProp(path: string, options?: any): this;
    attr(object: SVGAttributes): this;
    attr(key: string): any;
    attr(key: string, value: any): this;
    clone(): Cell;
    clone(opt: { deep?: boolean }): Cell | Cell[];
    removeAttr(path: string | string[], options?: any): this;
    transition(path: string, value?: any, options?: TransitionOptions): number;
    getTransitions(): string[];
    stopTransitions(path?: string): this;
    addTo(graph: Graph): this;
    isLink(): boolean;
  }

  type Padding = number | {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number
  };

  class Element extends Cell {
    translate(tx: number, ty?: number, options?: TranslateOptions): this;
    position(options?: { parentRelative: boolean }): Point;
    position(x: number, y: number, options?: { parentRelative?: boolean }): this;
    resize(width: number, height: number, options?: { direction?: 'left' | 'right' | 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right' }): this;
    rotate(deg: number, absolute?: boolean, origin?: Point): this;
    embed(cell: Cell): this;
    unembed(cell: Cell): this;
    getEmbeddedCells(options?: ExploreOptions): Cell[];
    fitEmbeds(options?: { deep?: boolean, padding?: Padding });
    getBBox(): BBox;
    findView(paper: Paper): ElementView;

    rotate(angle: number, absolute: boolean, origin: Point): this; // @todo Documented in source but not released 
  }

  interface CSSSelector {
    [key: string]: string | number | Object; // Object added to support special attributes like filter http://jointjs.com/api#SpecialAttributes:filter
  }

  interface SVGAttributes {
    [selector: string]: CSSSelector;
  }

  interface CellAttributes {
    [key: string]: any;
  }

  interface TextAttrs extends SVGAttributes {
    text?: {
      [key: string]: string | number;
      text?: string;
    };
  }

  interface Label {
    position: number;
    attrs?: TextAttrs;
  }
  interface LinkAttributes extends CellAttributes {
    source?: Point | { id: string, selector?: string, port?: string };
    target?: Point | { id: string, selector?: string, port?: string };
    labels?: Label[];
    vertices?: Point[];
    smooth?: boolean;
    attrs?: TextAttrs;
  }

  class Link extends Cell {
    constructor(attributes?: LinkAttributes, options?: Object);
    remove(): this;
    disconnect(): this;
    label(index?: number): any
    label(index: number, value: Label): this;
    reparent(): Element;
    findView(paper: Paper): LinkView;
    getSourceElement(): Element;
    getTargetElement(): Element;
    hasLoop(options?: { deep?: boolean }): boolean;
  }

  interface ManhattanRouterArgs {
    excludeTypes?: string[];
    excludeEnds?: 'source' | 'target';
    startDirections?: ['left' | 'right' | 'top' | 'bottom'];
    endDirections?: ['left' | 'right' | 'top' | 'bottom'];
  }

  interface PaperOptions extends Backbone.ViewOptions<Graph> {
    width?: number;
    height?: number;
    origin?: Point;
    gridSize?: number;
    perpendicularLinks?: boolean;
    elementView?: (element: Element) => ElementView | ElementView;
    linkView?: (link: Link) => LinkView | LinkView;
    defaultLink?: ((cellView: CellView, magnet: SVGElement) => Link) | Link;
    defaultRouter?: ((vertices: Point[], args: Object, linkView: LinkView) => Point[]) | { name: string, args?: ManhattanRouterArgs };
    defaultConnector?: ((sourcePoint: Point, targetPoint: Point, vertices: Point[], args: Object, linkView: LinkView) => string) | { name: string, args?: { radius?: number } };
    interactive?: ((cellView: CellView, event: string) => boolean) | boolean | { vertexAdd?: boolean, vertexMove?: boolean, vertexRemove?: boolean, arrowheadMove?: boolean };
    validateMagnet?: (cellView: CellView, magnet: SVGElement) => boolean;
    validateConnection?: (cellViewS: CellView, magnetS: SVGElement, cellViewT: CellView, magnetT: SVGElement, end: 'source' | 'target', linkView: LinkView) => boolean;
    linkConnectionPoint?: (linkView: LinkView, view: ElementView, magnet: SVGElement, reference: Point) => Point;
    snapLinks?: boolean | { radius: number };
    linkPinning?: boolean;
    markAvailable?: boolean;
    async?: boolean | { batchZise: number };
    embeddingMode?: boolean;
    validateEmbedding?: (childView: ElementView, parentView: ElementView) => boolean;
    restrictTranslate?: ((elementView: ElementView) => BBox) | boolean;
    guard?: (evt: Event, view: CellView) => boolean;
    multiLinks?: boolean;
    cellViewNamespace?: Object;
  }

  interface ScaleContentOptions {
    padding?: number;
    preserveAspectRatio?: boolean;
    minScale?: number;
    minScaleX?: number;
    minScaleY?: number;
    maxScale?: number;
    maxScaleX?: number;
    maxScaleY?: number;
    scaleGrid?: number;
    fittingBBox?: BBox;
  }

  interface FitToContentOptions {
    gridWidth?: number;
    gridHeight?: number;
    padding?: Padding;
    allowNewOrigin?: 'negative' | 'positive' | 'any';
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
  }

  class Paper extends Backbone.View<Graph> {
    constructor(options?: PaperOptions);
    options: PaperOptions;
    svg: SVGElement;
    viewport: SVGGElement;
    defs: SVGDefsElement;
    setDimensions(width: number, height: number): void;
    setOrigin(x: number, y: number): void;
    scale(sx: number, sy?: number, ox?: number, oy?: number): this;
    findView(element: any): CellView;
    findViewByModel(model: Cell | string): CellView;
    findViewsFromPoint(point: Point): ElementView[];
    findViewsInArea(rect: BBox, options?: { strict?: boolean }): CellView[];
    fitToContent(options?: FitToContentOptions): void;
    scaleContentToFit(options?: ScaleContentOptions): void;
    getContentBBox(): BBox;
    clientToLocalPoint(p: Point);

    rotate(deg: number, ox?: number, oy?: number): Paper;      // @todo not released yet though it's in the source code already
  }


  class CellViewGeneric<T extends Backbone.Model> extends Backbone.View<T> {
    getBBox(options?: { useModelGeometry?: boolean }): BBox;
    highlight(el?: any): this;
    unhighlight(el?: any): this;

    // Private methods
    // findMagnet(el: any): void;
    // getSelector(el: any): void;
    // pointerdblclick(evt: any, x: number, y: number): void;
    // pointerclick(evt: any, x: number, y: number): void;
    // pointerdown(evt: any, x: number, y: number): void;
    // pointermove(evt: any, x: number, y: number): void;
    // pointerup(evt: any, x: number, y: number): void;
  }

  class CellView extends CellViewGeneric<Cell> { }

  class ElementView extends CellViewGeneric<Element> {
    scale(sx: number, sy: number): void; // @todo Documented in source but not released 
  }

  class LinkView extends CellViewGeneric<Link> {
    options: {
      shortLinkLength?: number,
      doubleLinkTools?: boolean,
      longLinkLength?: number,
      linkToolsOffset?: number,
      doubleLinkToolsOffset?: number,
    };
    getConnectionLength(): number;
    sendToken(token: SVGElement, duration?: number, callback?: () => void): void;
    addVertex(vertex: Point): number;
    getPointAtLength(length: number): Point; // Marked as public api in soruce but not in the documents
  }

}

declare namespace ui { }

declare namespace shapes {
  interface GenericAttributes<T> extends dia.CellAttributes {
    position?: dia.Point;
    size?: dia.Size;
    angle?: number;
    attrs?: T;
  }
  interface ShapeAttrs extends dia.CSSSelector {
    fill?: string;
    stroke?: string;
    r?: string | number;
    rx?: string | number;
    ry?: string | number;
    cx?: string | number;
    cy?: string | number;
    height?: string | number;
    width?: string | number;
  }
  namespace basic {
    class Generic extends dia.Element {
      constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: Object)
    }
    interface RectAttrs extends dia.TextAttrs {
      rect?: ShapeAttrs;
    }
    class Rect extends Generic {
      constructor(attributes?: GenericAttributes<RectAttrs>, options?: Object)
    }
    class Text extends Generic {
      constructor(attributes?: GenericAttributes<dia.TextAttrs>, options?: Object)
    }
    interface CircleAttrs extends dia.TextAttrs {
      circle?: ShapeAttrs;
    }
    class Circle extends Generic {
      constructor(attributes?: GenericAttributes<CircleAttrs>, options?: Object)
    }
    interface EllipseAttrs extends dia.TextAttrs {
      ellipse?: ShapeAttrs;
    }
    class Ellipse extends Generic {
      constructor(attributes?: GenericAttributes<EllipseAttrs>, options?: Object)
    }
    class Image extends Generic {
    }
    class Path extends Generic {
    }
    class Polygon extends Generic {
    }
    class Polyline extends Generic {
    }
  }
}

declare namespace util {

  namespace format {
    export function number(specifier: string, value: number): string;
  }

  export function uuid(): string;
  export function guid(obj?: Object): string;
  export function nextFrame(callback: () => void, context?: Object): number;
  export function cancelFrame(requestId: number): void;
  export function flattenObject(object: Object, delim: string, stop: (node: any) => boolean): any;
  export function getByPath(object: Object, path: string, delim: string): any;
  export function setByPath(object: Object, path: string, value: Object, delim: string): any;
  export function unsetByPath(object: Object, path: string, delim: string): any;
  export function breakText(text: string, size: dia.Size, attrs?: dia.SVGAttributes, options?: { svgDocument?: SVGElement }): string;
  export function normalizeSides(box: number | { x?: number, y?: number, height?: number, width?: number }): dia.BBox;
  export function getElementBBox(el: Element): dia.BBox;
  export function setAttributesBySelector(el: Element, attrs: dia.SVGAttributes): void;
  export function sortElements(elements: Element[] | string | JQuery, comparator: (a: Element, b: Element) => number): Element[];
  export function shapePerimeterConnectionPoint(linkView: dia.LinkView, ElementView, magnet: SVGElement, ref: dia.Point): dia.Point;
  export function imageToDataUri(url: string, callback: (err: Error, dataUri: string) => void): void;

  // Not documented but used in examples
  export function deepSupplement(objects: any[], defaultIndicator?: any): any;

  // Private functions
  export function mixin(objects: any[]): any;
  export function supplement(objects: any[]): any;
  export function deepMixin(objects: any[]): any;
}

declare namespace layout {

  interface LayoutOptions {
    nodeSep?: number;
    edgeSep?: number;
    rankSep?: number;
    rankDir?: 'TB' | 'BT' | 'LR' | 'RL';
    marginX?: number;
    marginY?: number;
    resizeCluster?: boolean;
    setPosition?: (element: dia.Element, position: dia.BBox) => void;
    setLinkVertices?: (link: dia.Link, vertices: Position[]) => void;
  }

  interface LayoutResult extends dia.Size {
    rankdir: 'TB' | 'BT' | 'LR' | 'RL';
    nodesep: number;
    edgesep: number;
  }

  class DirectedGraph {
    static layout(graph: dia.Graph, options?: LayoutOptions): LayoutResult;
  }
}

