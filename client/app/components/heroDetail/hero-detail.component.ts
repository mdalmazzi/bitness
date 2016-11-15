/**
 * Created by Moiz.Kachwala on 02-06-2016.
 */
import { Router } from '@angular/router';



import { Component, Input, OnInit } from '@angular/core';
import { Hero } from "../../models/hero";
import { ActivatedRoute, Params } from '@angular/router';
import { HeroService } from "../../services/hero.service";

@Component({
    selector: 'my-hero-detail',
    templateUrl: './app/components/heroDetail/hero-detail.component.html'
})

export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;
    newHero = false;
    error: any;
    navigated = false; // true if navigated here
    show: boolean = false;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private router: Router

    ) {
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            if (id === 'new') {
                this.newHero = true;
                this.hero = new Hero();

            } else {
                this.newHero = false;
                this.heroService.getHero(id)
                    .then(hero => this.hero = hero);
            }
        });
    }

    save() {

        this.heroService

            .save(this.hero)
            .then(hero => {
                this.hero = hero; // saved hero, w/ id if new
                this.goBack();
            })
            .catch(error => this.error = error); // TODO: Display error message
    }

    addHero() {
        //this.heroService = null;
        this.router.navigate(['/detail', 'new']);
    }

    newRisposta() {
        //this.heroService = null;
        this.hero.risposte[0] = "";
    }

    goBack() {
        window.history.back();
    }

    clicked() {
        this.show = !this.show;
    }


}