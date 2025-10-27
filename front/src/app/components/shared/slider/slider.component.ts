import { Component, Input, Output, EventEmitter } from '@angular/core';
import Projeto from '../../../classes/Projeto';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  @Input() assets: string[] = [];

  @Input() isOpen: boolean = false;

  @Output() closeSlider = new EventEmitter<void>();

  currentIndex: number = 0;

  close() {
    this.closeSlider.emit();
  }

  nextImage() {
    if (this.assets.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.assets.length;
    }
  }

  prevImage() {
    if (this.assets.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.assets.length) % this.assets.length;
    }
  }

  get currentImage(): string {
    return this.assets[this.currentIndex] || '';
  }

  ngOnChanges() {
    // Resetar o índice quando o slider abrir
    if (this.isOpen) {
      this.currentIndex = 0;
    }
  }

}
