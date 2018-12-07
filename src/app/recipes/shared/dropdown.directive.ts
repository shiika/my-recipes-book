import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from "@angular/core";

@Directive({
    selector: "[appDropdown]"
})

export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;
    caret = this.elRef.nativeElement.childNodes;

    constructor(private elRef: ElementRef, private elRenderer: Renderer2) {} 
    
    // @HostListener('click') onclick(e: Event) {
    //     this.elRenderer.addClass(this.elRef.nativeElement, "open")
    // }
    @HostListener('click') onclick(e: Event) {
        this.isOpen = !this.isOpen;
        
    }
    
    
}