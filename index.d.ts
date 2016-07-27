// Type definitions for Joint JS 0.9.10
// Project: http://www.jointjs.com/
// Definitions by: Federico Caselli <http://github.com/CaselIT>

declare namespace joint {

  export var g: any;
  export var V: any;

  export namespace dia {
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
      disconnectLinks(cell: Cell, options?: any): void;
      removeLinks(cell: Cell, options?: any): void;
      translate(tx: number, ty?: number, options?: TranslateOptions): void;
      cloneCells(cells: Cell[]): { [id: string]: Cell };
      getSubgraph(cells: Cell[], options?: { deep?: boolean }): Cell[];
      cloneSubgraph(cells: Cell[], options?: { deep?: boolean }): { [id: string]: Cell };
      dfs(element: Element, iteratee: (element: Element, distance: number) => boolean, options?: DfsBfsOptions, visited?: Object, distance?: number): void;
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
      getBBox(elements: Element[], options?: any): BBox;
      toGraphLib(): any; // graphlib graph object
      findModelsInArea(rect: BBox, options?: any): BBox|boolean;
      getCellsBBox(cells: Cell[], options?: any): BBox;
      getInboundEdges(node: string): Object;
      getOutboundEdges(node: string): Object;
      hasActiveBatch(name?: string): number|boolean;
      maxZIndex(): number;
      removeCells(cells: Cell[], options?: any): this;
      resize(width: number, height: number, options?: number): this;
      resizeCells(width: number, height: number, cells: Cell[], options?: number): this;
      set(key: Object|string, value: any, options?: any): this;
      startBatch(name: string, data?: Object): any;
      stopBatch(name: string, data?: Object): any;
    }

    class Cell extends Backbone.Model {
      id: string;
      toJSON(): any;
      remove(options?: { disconnectLinks?: boolean }): this;
      toFront(options?: { deep?: boolean }): this;
      toBack(options?: { deep?: boolean }): this;
      getAncestors(): Cell[];
      isEmbeddedIn(element: Element, options?: { deep: boolean }): boolean;
      prop(key: string): any;
      prop(object: any): this;
      prop(key: string, value: any, options?: any): this;
      removeProp(path: string, options?: any): this;
      attr(key: string): any;
      attr(object: SVGAttributes): this;
      attr(key: string, value: any): this;
      clone(): Cell;
      clone(opt: { deep?: boolean }): Cell | Cell[];
      removeAttr(path: string | string[], options?: any): this;
      transition(path: string, value?: any, options?: TransitionOptions, delim?: string): number;
      getTransitions(): string[];
      stopTransitions(path?: string, delim?: string): this;
      addTo(graph: Graph, options?: any): this;
      isLink(): boolean;
      embed(cell: Cell, options?: any): this;
      findView(paper: Paper): CellView;
      getEmbeddedCells(options?: any): Cell[];
      initialize(options?: any): void;
      isElement(): boolean;
      isEmbedded(): boolean;
      processPorts(): void;
      startBatch(name: string, options?: any): this;
      stopBatch(name: string, options?: any): this;
      unembed(cell: Cell, options?: any): this;
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
      fitEmbeds(options?: { deep?: boolean, padding?: Padding }): this;
      getBBox(options?: any): BBox;
      findView(paper: Paper): ElementView;
      isElement(): boolean;
      scale(scaleX: number, scaleY: number, origin?: Point, options?: any): this;
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
      markup: string;
      labelMarkup: string;
      toolMakup: string;
      vertexMarkup: string;
      arrowHeadMarkup: string;

      constructor(attributes?: LinkAttributes, options?: Object);
      disconnect(): this;
      label(index?: number): any;
      label(index: number, value: Label): this;
      reparent(options?: any): Element;
      findView(paper: Paper): LinkView;
      getSourceElement(): Element;
      getTargetElement(): Element;
      hasLoop(options?: { deep?: boolean }): boolean;
      applyToPoints(fn: Function, options?: any): this;
      getRelationshipAncestor(): Element;
      isLink(): boolean;
      isRelationshipEmbeddedIn(element: Element): boolean;
      scale(sx: number, sy: number, origin: Point, optionts?: any): this;
      translate(tx: number, ty: number, options?: any): this;
    }

    interface ManhattanRouterArgs {
      excludeTypes?: string[];
      excludeEnds?: 'source' | 'target';
      startDirections?: ['left' | 'right' | 'top' | 'bottom'];
      endDirections?: ['left' | 'right' | 'top' | 'bottom'];
    }

    interface PaperOptions extends Backbone.ViewOptions<Graph> {
      el?: string|JQuery|HTMLElement;
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
      /** useful undocumented option */
      clickThreshold?: number;
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
      clientToLocalPoint(p: Point): Point;

      rotate(deg: number, ox?: number, oy?: number): Paper;      // @todo not released yet though it's in the source code already

      afterRenderViews(): void;
      asyncRenderViews(cells: Cell[], options?: any): void;
      beforeRenderViews(cells: Cell[]): Cell[];
      cellMouseout(evt: Event): void;
      cellMouseover(evt: Event): void;
      clearGrid(): this;
      contextmenu(evt: Event): void;
      createViewForModel(cell: Cell): CellView;
      drawGrid(options?: any): this;
      fitToContent(gridWidth?: number, gridHeight?: number, padding?: number, options?: any): void;
      getArea(): BBox;
      getDefaultLink(cellView: CellView, magnet: HTMLElement): Link;
      getModelById(id: string): Cell;
      getRestrictedArea(): BBox;
      guard(evt: Event, view: CellView): boolean;
      linkAllowed(linkViewOrModel: LinkView|Link): boolean;
      mouseclick(evt: Event): void;
      mousedblclick(evt: Event): void;
      mousewheel(evt: Event): void;
      onCellAdded(cell: Cell, graph: Graph, options: Object): void;
      onCellHighlight(cellView: CellView, magnetEl: HTMLElement, options?: any): void;
      onCellUnhighlight(cellView: CellView, magnetEl: HTMLElement, options?: any): void;
      onRemove(): void;
      pointerdown(evt: Event): void;
      pointermove(evt: Event): void;
      pointerup(evt: Event): void;
      remove(): this;
      removeView(cell: Cell): CellView;
      removeViews(): void;
      renderView(cell: Cell): CellView;
      resetViews(cellsCollection: Cell[], options: any): void;
      resolveHighlighter(options?: any): boolean|Object;
      setGridSize(gridSize: number): this;
      setInteractivity(value: any): void;
      snapToGrid(p: Point): Point;
      sortViews(): void;
    }


    interface GradientOptions {
      type: 'linearGradient'|'radialGradient';
      stops: Array<{
        offset: string;
        color: string;
        opacity?: number;
      }>;
    }
    class CellViewGeneric<T extends Backbone.Model> extends Backbone.View<T> {
      getBBox(options?: { useModelGeometry?: boolean }): BBox;
      highlight(el?: any, options?: any): this;
      unhighlight(el?: any, options?: any): this;
      applyFilter(selector: string|HTMLElement, filter: Object): void;
      applyGradient(selector: string|HTMLElement, attr: 'fill'|'stroke', gradient: GradientOptions): void;
      can(feature: string): boolean;
      findBySelector(selector: string): JQuery;
      findMagnet(el: any): HTMLElement;
      getSelector(el: HTMLElement, prevSelector: string): string;
      getStrokeBBox(el: any): BBox; // string|HTMLElement|Vectorizer
      mouseout(evt: Event): void;
      mouseover(evt: Event): void;
      mousewheel(evt: Event, x: number, y: number, delta: number): void
      notify(eventName: string): void;
      onChangeAttrs(cell: Cell, attrs: Backbone.ViewOptions<T>, options?: any): this;
      onSetTheme(oldTheme: string, newTheme: string): void;
      pointerclick(evt: Event, x: number, y: number): void;
      pointerdblclick(evt: Event, x: number, y: number): void;
      pointerdown(evt: Event, x: number, y: number): void;
      pointermove(evt: Event, x: number, y: number): void;
      pointerup(evt: Event, x: number, y: number): void;
      remove(): this;
      setInteractivity(value: any): void;
      setTheme(theme: string, options?: any): this;
    }

    class CellView extends CellViewGeneric<Cell> { }

    interface ElementViewAttributes {
      style?: string;
      text?: string;
      html?: string;
      "ref-x"?: string|number;
      "ref-y"?: string|number;
      "ref-dx"?: number;
      "ref-dy"?: number;
      "ref-width"?: string|number;
      "ref-height"?: string|number;
      ref?: string;
      "x-alignment"?: 'middle'|'right'|number;
      "y-alignment"?: 'middle'|'bottom'|number;
      port?: string;
    }
    class ElementView extends CellViewGeneric<Element> {
      scale(sx: number, sy: number): void; // @todo Documented in source but not released
      finalizeEmbedding(options?: any): void;
      getBBox(options?: any): BBox;
      pointerdown(evt: Event, x: number, y: number): void;
      pointermove(evt: Event, x: number, y: number): void;
      pointerup(evt: Event, x: number, y: number): void;
      positionRelative(vel: any, bbox: BBox, attributes: ElementViewAttributes, nodesBySelector?: Object): void; // Vectorizer
      prepareEmbedding(options?: any): void;
      processEmbedding(options?: any): void;
      render(): this;
      renderMarkup(): void;
      resize(): void;
      rotate(): void;
      translate(model: Backbone.Model, changes?: any, options?: any): void;
      update(cell: Cell, renderingOnlyAttrs?: Object): void;
    }

    class LinkView extends CellViewGeneric<Link> {
      options: {
        shortLinkLength?: number,
        doubleLinkTools?: boolean,
        longLinkLength?: number,
        linkToolsOffset?: number,
        doubleLinkToolsOffset?: number,
        sampleInterval: number
      };
      getConnectionLength(): number;
      sendToken(token: SVGElement, duration?: number, callback?: () => void): void;
      addVertex(vertex: Point): number;
      getPointAtLength(length: number): Point; // Marked as public api in source but not in the documents
      createWatcher(endType: {id: string}): Function;
      findRoute(oldVertices: Point[]): Point[];
      getConnectionPoint(end: 'source'|'target', selectorOrPoint: Element|Point, referenceSelectorOrPoint: Element|Point): Point;
      getPathData(vertices: Point[]): any;
      onEndModelChange(endType: 'source'|'target', endModel?: Element, opt?: any): void;
      onLabelsChange(): void;
      onSourceChange(cell: Cell, sourceEnd: {id: string}, options: any): void;
      onTargetChange(cell: Cell, targetEnd: {id: string}, options: any): void;
      onToolsChange(): void;
      onVerticesChange(cell: Cell, changed: any, options: any): void;
      pointerdown(evt: Event, x: number, y: number): void;
      pointermove(evt: Event, x: number, y: number): void;
      pointerup(evt: Event, x: number, y: number): void;
      removeVertex(idx: number): this;
      render(): this;
      renderArrowheadMarkers(): this;
      renderLabels(): this;
      renderTools(): this;
      renderVertexMarkers(): this;
      startArrowheadMove(end: 'source'|'target', options?: any): void;
      startListening(): void;
      update(model: any, attributes: any, options?: any): this;
      updateArrowheadMarkers(): this;
      updateAttributes(): void;
      updateConnection(options?: any): void;
      updateLabelPositions(): this;
      updateToolsPosition(): this;
    }
  }

  export namespace ui { }

  export namespace shapes {
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

  export namespace util {

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
    export function shapePerimeterConnectionPoint(linkView: dia.LinkView, view: dia.ElementView, magnet: SVGElement, ref: dia.Point): dia.Point;
    export function imageToDataUri(url: string, callback: (err: Error, dataUri: string) => void): void;

    // Not documented but used in examples
    export function deepSupplement(objects: any, defaultIndicator?: any): any;

    // Private functions
    export function mixin(objects: any[]): any;
    export function supplement(objects: any[]): any;
    export function deepMixin(objects: any[]): any;
  }

  export namespace layout {

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
}
export = joint;
