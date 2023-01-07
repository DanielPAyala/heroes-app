import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
    `
      .flex {
        display: flex;
      }

      .f-column {
        flex-direction: column;
      }
    `,
  ],
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe;
  // heroesFilter: Heroe[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe({
      next: (heroes) => (this.heroes = heroes),
    });
  }

  buscando(termino: string) {
    this.heroesService.getHeroesByQuery(termino).subscribe({
      next: (heroes) => (this.heroes = heroes),
    });

    // const filterValue = termino.toLowerCase();
    // this.heroesFilter = this.heroes.filter((heroe) =>
    //   heroe.superhero.toLowerCase().includes(filterValue)
    // );
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.heroeSeleccionado = event.option.value;
      return;
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroeById(heroe.id!).subscribe({
      next: heroe => this.heroeSeleccionado = heroe
    })
  }
}
