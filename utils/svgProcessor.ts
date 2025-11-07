// A helper function to get the total length of different SVG element types
const getElementLength = (el: SVGElement): number => {
    if (el.tagName === 'path') {
        return (el as SVGPathElement).getTotalLength();
    }
    if (el.tagName === 'rect') {
        const rect = el as SVGRectElement;
        const width = rect.width.baseVal.value;
        const height = rect.height.baseVal.value;
        return 2 * (width + height);
    }
    if (el.tagName === 'circle') {
        const circle = el as SVGCircleElement;
        const r = circle.r.baseVal.value;
        return 2 * Math.PI * r;
    }
    if (el.tagName === 'ellipse') {
        const ellipse = el as SVGEllipseElement;
        const rx = ellipse.rx.baseVal.value;
        const ry = ellipse.ry.baseVal.value;
        // Ramanujan approximation for ellipse perimeter
        return Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
    }
    if (el.tagName === 'line') {
        const line = el as SVGLineElement;
        const x1 = line.x1.baseVal.value;
        const y1 = line.y1.baseVal.value;
        const x2 = line.x2.baseVal.value;
        const y2 = line.y2.baseVal.value;
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    if (el.tagName === 'polyline' || el.tagName === 'polygon') {
        const poly = el as SVGPolylineElement;
        let len = 0;
        const points = poly.points;
        for (let i = 0; i < points.length - 1; i++) {
            const p1 = points.getItem(i);
            const p2 = points.getItem(i + 1);
            len += Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        }
        if (el.tagName === 'polygon' && points.length > 1) {
             const pFirst = points.getItem(0);
             const pLast = points.getItem(points.length - 1);
             len += Math.sqrt(Math.pow(pFirst.x - pLast.x, 2) + Math.pow(pFirst.y - pLast.y, 2));
        }
        return len;
    }
    return 0;
};

export const processDrawAnimation = (svgString: string): string => {
    if (!svgString) return '';

    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgString, "image/svg+xml");
        const svgElement = doc.documentElement;

        if (doc.getElementsByTagName("parsererror").length > 0) {
            console.error("Error parsing SVG content for draw animation.");
            return svgString;
        }

        const drawableElements = Array.from(svgElement.querySelectorAll('path, rect, circle, ellipse, line, polyline, polygon'));
        
        let totalLength = 0;
        const elementData: { el: SVGElement; length: number; originalFill: string; originalStroke: string }[] = [];

        drawableElements.forEach(el => {
            const length = getElementLength(el as SVGElement);
            if (length > 0) {
                const computedStyle = window.getComputedStyle(el as Element);
                const originalFill = computedStyle.getPropertyValue('fill');
                const originalStroke = computedStyle.getPropertyValue('stroke');
                elementData.push({ el: el as SVGElement, length, originalFill, originalStroke });
                totalLength += length;
            }
        });

        const styleElement = doc.createElementNS("http://www.w3.org/2000/svg", "style");
        let css = `
            :root.animation-paused * {
                animation-play-state: paused !important;
            }
        `;

        let accumulatedDelay = 0;
        const totalDrawDuration = 2.5; // seconds
        const fillDelay = totalDrawDuration + 0.1; 
        const fillDuration = 0.5;

        elementData.forEach(({ el, length, originalFill, originalStroke }, index) => {
            const drawDuration = (length / totalLength) * totalDrawDuration;
            
            el.setAttribute('fill', 'transparent');
            el.setAttribute('stroke-dasharray', `${length}`);
            el.setAttribute('stroke-dashoffset', `${length}`);

            const strokeColor = originalStroke && originalStroke !== 'none' ? originalStroke : (originalFill !== 'none' ? originalFill : 'currentColor');
            if (strokeColor) {
                el.setAttribute('stroke', strokeColor);
            }
            if (!el.getAttribute('stroke-width')) {
                el.setAttribute('stroke-width', '1');
            }

            const drawAnimId = `draw-${index}`;
            css += `@keyframes ${drawAnimId} { to { stroke-dashoffset: 0; } } `;
            
            const fillAnimId = `fill-${index}`;
            css += `@keyframes ${fillAnimId} { to { fill: ${originalFill}; stroke: ${originalStroke && originalStroke !== 'none' ? originalStroke : 'transparent'}; } } `;
            
            const drawAnimation = `${drawAnimId} ${drawDuration}s ease-out ${accumulatedDelay}s forwards`;
            const fillAnimation = `${fillAnimId} ${fillDuration}s ease-in ${fillDelay}s forwards`;

            el.style.animation = `${drawAnimation}, ${fillAnimation}`;

            accumulatedDelay += drawDuration;
        });

        styleElement.textContent = css;
        svgElement.prepend(styleElement);

        const serializer = new XMLSerializer();
        return serializer.serializeToString(doc);
    } catch (e) {
        console.error("Failed to process SVG for draw animation:", e);
        return svgString;
    }
};