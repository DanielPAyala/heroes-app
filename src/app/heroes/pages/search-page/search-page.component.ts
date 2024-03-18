import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-search-page',
  templateUrl: './search-page.component.html',
  styles: ``,
})
export class SearchPageComponent {
  searchInput = new FormControl('');
  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(private heroesService: HeroesService) {}

  searchHero(): void {
    const value: string = this.searchInput.value || '';

    this.heroesService
      .getSuggestions(value)
      .subscribe((heroes) => (this.heroes = heroes));
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }
}
