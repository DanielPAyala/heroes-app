import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;

  constructor(
    private aRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.aRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroeById(id)))
      .subscribe({
        next: (heroe) => (this.heroe = heroe),
      });
    // this.aRoute.params.subscribe({
    //   next: ({ id }) => {
    //     this.heroesService.getHeroeById(id)
    //     .subscribe({
    //       next: (heroe) => this.heroe = heroe
    //     });
    //   },
    // });

    // const id = this.aRoute.snapshot.paramMap.get('id');
    // console.log(id)
  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }
}
