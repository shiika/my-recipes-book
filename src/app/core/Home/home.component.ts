import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import * as AppReducers from "../../store/app.reducers";
import * as AuthActions from "../../auth/store/auth.actions";
import * as AuthReducers from "../../auth/store/auth.reducers";
import { map } from 'rxjs/operators';

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})

export class HomeComponent implements OnInit {
    
    constructor(private router: Router, private store: Store<AppReducers.AppState>) {}

    ngOnInit() {
        this.store.select("auth")
            .subscribe(
                (authState: AuthReducers.State) => {
                    if (!authState.authed) {
                        this.router.navigate(["signin"]);
                        this.store.select('auth').pipe(
                            map(
                                (authState) => console.log(authState)
                            )
                        )
                    }

                }
            )
    }
}