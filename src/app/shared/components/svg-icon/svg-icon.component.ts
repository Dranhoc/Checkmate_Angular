import { HttpClient } from '@angular/common/http';
import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'svg-icon',
  imports: [],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.css',
})
export class SvgIconComponent {
  src = input.required<string>();

  private _http = inject(HttpClient);
  private _sanitizer = inject(DomSanitizer);

  svgContent = toSignal(
    toObservable(this.src).pipe(
      switchMap((src) => this._http.get(src, { responseType: 'text' })),
      map((svg) => this._sanitizer.bypassSecurityTrustHtml(svg)),
    ),
  );
}
