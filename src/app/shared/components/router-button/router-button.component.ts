import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { TournamentStatusCard } from '@core/enums/status.enum';

@Component({
  selector: 'router-button',
  imports: [NgClass],
  templateUrl: './router-button.component.html',
  styleUrl: './router-button.component.css',
})
export class RouterButtonComponent {
  protected readonly TournamentStatusCard = TournamentStatusCard;
  status = input.required<TournamentStatusCard>();
  pouet() {}
  ngOnInit() {
    console.log(this.status());
  }
}
