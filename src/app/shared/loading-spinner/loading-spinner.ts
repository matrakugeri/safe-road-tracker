import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  imports: [],
  template: ` <span class="loader"></span> `,
  styles: `
    @use 'variables.scss' as *;
    .loader {
      display: inline-block;
      width: 60px;
      height: 60px;
      background: #fff;
      border-radius: 50%;
      position: relative;
      animation: roll 1s ease-in-out infinite alternate;
    }
    .loader:after {
      content: '';
      position: absolute;
      inset: 5px;
      border-radius: 50%;
      border: 5px solid;
      border-color: $color-dark-blue transparent;
    }
    @keyframes roll {
      0% {
        transform: translateX(-150%) rotate(0deg);
      }
      100% {
        transform: translateX(150%) rotate(360deg);
      }
    }
  `,
})
export class LoadingSpinner {}
