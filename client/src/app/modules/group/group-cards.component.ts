import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GroupService, UserService } from '../../shared';

@Component({
    selector: 'group-cards',
    templateUrl: './group-cards.component.html',
    styleUrls: ['./group-cards.component.css']
})
export class GroupCardsComponent {
    user = this.userService.getAuthenticatedUser();
    group = {};
    groupID = 0;
    cards = [];
    cardSplices = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private groupService: GroupService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.groupID = this.route.snapshot.params['id'];

        this.groupService.getGroupById(this.groupID)
            .subscribe(
                data => {
                    this.group = data.group;
                },
                err => {
                    console.log(err);
                }
            );

        this.getCards();
    }

    getCards() {
        this.groupService.getCardsForGroup(this.groupID)
            .subscribe(
                data => {
                    console.log(data);
                    /*this.interjections = data.interjections;

                    for (let i = 0; i < this.interjections.length; i++) {
                        this.interjections[i].Icon = this.interjections[i].Icon.substring(6);
                    }

                    for (let i = 0; i < this.interjections.length; i += 4) {
                        this.interjectionSplices.push(this.interjections.slice(i, i + 4));
                    }*/
                },
                err => {
                    console.log(err);
                }
            )
    }

    deleteCard(id) {
        if (window.confirm("Card deletion cannot be reverted. Proceed with deleting this card?")) {
            this.groupService.deleteCard(id)
                .subscribe(
                    data => {
                        console.log(data);

                        this.getCards();
                    },
                    err => {
                        console.log(err);
                    }
                )
        }
    }
}
