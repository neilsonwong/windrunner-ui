import { Directive, OnInit, ElementRef, Input, Renderer2 } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';


@Directive({
  selector: '[fixLongWords]'
})
export class FixLongWordsDirective implements OnInit {
    @Input('fixLongWords') longDef: [string, number];

    longLen: number;
    className: string;

    constructor(private renderer: Renderer2, private hostElement: ElementRef) { }

    ngOnInit(): void {
        this.className = this.longDef[0];
        this.longLen = this.longDef[1];

        this.waitForText().pipe(
            map((text) => this.calculateWeightedWidth(text)),
            map((width) => this.setClass(width))
        ).subscribe();
    }

    private waitForText(): Observable<string> {
        // necessary since async messes with hostElement
        return interval(100).pipe(
            map(() => (this.hostElement.nativeElement.innerText)),
            filter(e => e),
            take(1)
        );
    }

    private calculateWeightedWidth(text: string): number {
        // lazy atm 10000 or greater = kanji
        let wordWidth = 0;
        for (let i = 0; i < text.length; ++i) {
            // console.log(`${text[i]}: ${text.charCodeAt(i)}`);
            wordWidth += (text.charCodeAt(i) > 10000) ? 1.25 : 1;
        }
        // console.log(`${text}: ${wordWidth}`);
        return wordWidth;
    }

    private setClass(width: number): boolean {

        if (width > this.longLen) {
            this.renderer.addClass(this.hostElement.nativeElement, this.className);
            return true;
        }
        return false;
    }

    alternativeMethodngOnInit(): void {
        this.className = this.longDef[0];
        this.longLen = this.longDef[1];

        this.waitForText().pipe(
            map(() => (this.coolStuff(this.hostElement.nativeElement))),
        ).subscribe();
    }

    private coolStuff(nativeElement: any) {
        const style = window.getComputedStyle(nativeElement);
        const fontSize = this.stripPxToInt(style.getPropertyValue('font-size'));
        const height = this.stripPxToInt(style.getPropertyValue('height'));
        const numLines = Math.floor(height / fontSize);
        // console.log(fontSize)
        // console.log(height)
        // console.log(`${nativeElement.innerText}: ${numLines}`);
        if (numLines > 2) {
            this.setClass(999);
        }
    }

    private stripPxToInt(val: string) {
        const num = val.substring(0, val.length - 2);
        return parseFloat(num);
    }
}